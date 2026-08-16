import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Edit2,
  Trash2,
  X,
  Package,
  Layers,
  ShoppingBag,
  Info,
} from 'lucide-react';

interface AdminPageProps {
  headingFont: React.CSSProperties;
  setCurrentPage: (page: string) => void;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number | null;
  description: string | null;
  image_url: string | null;
  created_at?: string;
}

const CATEGORIES = [
  'New',
  'Furniture',
  'Outdoor',
  'Lighting',
  'Rugs',
  'Decor & Pillows',
  'Wall Decor',
  'Bed & Bath',
  'Kitchen & Dining',
];

interface BatchUploadItem {
  id: string;
  name: string;
  price: string;
  description: string;
  imageFile: File | null;
}

const formatNaira = (amount: number | null) => {
  if (amount === null || isNaN(amount)) return '₦0';
  return '₦' + amount.toLocaleString('en-NG');
};

export const AdminPage: React.FC<AdminPageProps> = ({ headingFont, setCurrentPage }) => {
  const [status, setStatus] = useState<'checking' | 'authorized' | 'denied'>('checking');
  const [activeCategory, setActiveCategory] = useState<string>('Furniture');
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<ProductItem | null>(null);

  // Edit form state (Price & Description ONLY)
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Add / Batch Upload state
  const [uploadMode, setUploadMode] = useState<'single' | 'batch'>('single');
  const [uploadCategory, setUploadCategory] = useState(activeCategory);
  const [batchItems, setBatchItems] = useState<BatchUploadItem[]>([
    { id: '1', name: '', price: '', description: '', imageFile: null },
  ]);

  // Submission / Feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Check role authorization on load
  useEffect(() => {
    let isMounted = true;

    async function checkAdmin() {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          if (isMounted) {
            setStatus('denied');
            setCurrentPage('home');
          }
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError || !profile || profile.role !== 'admin') {
          if (isMounted) {
            setStatus('denied');
            setCurrentPage('home');
          }
          return;
        }

        if (isMounted) {
          setStatus('authorized');
        }
      } catch (err) {
        if (isMounted) {
          setStatus('denied');
          setCurrentPage('home');
        }
      }
    }

    checkAdmin();

    return () => {
      isMounted = false;
    };
  }, [setCurrentPage]);

  // Fetch products
  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProducts(data as ProductItem[]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (status === 'authorized') {
      fetchProducts();
    }
  }, [status]);

  if (status !== 'authorized') {
    return <div className="min-h-screen bg-[#F9F9F8]" />;
  }

  // Filter products by selected sidebar category
  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'New') return true;
    return p.category.toLowerCase().trim() === activeCategory.toLowerCase().trim();
  });

  // Open Add Modal
  const handleOpenAddModal = (cat: string) => {
    setUploadCategory(cat === 'New' ? 'Furniture' : cat);
    setUploadMode('single');
    setBatchItems([{ id: '1', name: '', price: '', description: '', imageFile: null }]);
    setFeedback(null);
    setIsAddModalOpen(true);
  };

  // Batch item helpers
  const handleAddBatchRow = () => {
    if (batchItems.length >= 5) return;
    setBatchItems((prev) => [
      ...prev,
      { id: Date.now().toString(), name: '', price: '', description: '', imageFile: null },
    ]);
  };

  const handleRemoveBatchRow = (index: number) => {
    if (batchItems.length <= 1) return;
    setBatchItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateBatchItem = (index: number, field: keyof BatchUploadItem, value: any) => {
    setBatchItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // Submit Add / Batch Upload
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Validate entries
    for (let i = 0; i < batchItems.length; i++) {
      const item = batchItems[i];
      if (!item.name.trim()) {
        setFeedback({ type: 'error', message: `Item #${i + 1} requires a product name.` });
        return;
      }
      if (!item.imageFile) {
        setFeedback({ type: 'error', message: `Item #${i + 1} ("${item.name}") requires an image file.` });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated.');

      const uploadedProducts = [];

      for (const item of batchItems) {
        const fileExt = item.imageFile!.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

        // 1. Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, item.imageFile!, { cacheControl: '3600', upsert: false });

        if (uploadError) {
          throw new Error(`Storage upload failed for ${item.name}: ${uploadError.message}`);
        }

        // 2. Get Public URL
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        uploadedProducts.push({
          name: item.name.trim(),
          category: uploadCategory,
          price: item.price ? parseFloat(item.price) : null,
          description: item.description.trim() || null,
          image_url: urlData.publicUrl,
          created_by: user.id,
        });
      }

      // 3. Insert rows to products table
      const { error: insertError } = await supabase
        .from('products')
        .insert(uploadedProducts);

      if (insertError) {
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      setFeedback({
        type: 'success',
        message: `Successfully added ${uploadedProducts.length} product(s) to ${uploadCategory}!`,
      });

      await fetchProducts();

      setTimeout(() => {
        setIsAddModalOpen(false);
        setFeedback(null);
      }, 1200);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to upload products.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Edit Modal (Price and Description ONLY)
  const handleOpenEdit = (product: ProductItem) => {
    setEditingProduct(product);
    setEditPrice(product.price !== null ? product.price.toString() : '');
    setEditDescription(product.description || '');
    setFeedback(null);
  };

  // Submit Edit (Price and Description ONLY)
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsUpdating(true);
    setFeedback(null);

    try {
      const { error } = await supabase
        .from('products')
        .update({
          price: editPrice ? parseFloat(editPrice) : null,
          description: editDescription.trim() || null,
        })
        .eq('id', editingProduct.id);

      if (error) {
        throw error;
      }

      setFeedback({ type: 'success', message: 'Product updated successfully!' });
      await fetchProducts();

      setTimeout(() => {
        setEditingProduct(null);
        setFeedback(null);
      }, 1000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Failed to update product.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete product + delete storage image file
  const handleDeleteConfirm = async () => {
    if (!deletingProduct) return;
    setIsSubmitting(true);

    try {
      // 1. Delete image file from storage if image_url exists
      if (deletingProduct.image_url) {
        try {
          const urlObj = new URL(deletingProduct.image_url);
          const pathSegments = urlObj.pathname.split('/');
          const fileName = pathSegments[pathSegments.length - 1];

          if (fileName) {
            await supabase.storage.from('product-images').remove([fileName]);
          }
        } catch (e) {
          console.warn('Storage file cleanup note:', e);
        }
      }

      // 2. Delete product row from DB
      const { error: dbDeleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', deletingProduct.id);

      if (dbDeleteError) {
        throw dbDeleteError;
      }

      await fetchProducts();
      setDeletingProduct(null);
    } catch (err: any) {
      alert(`Failed to delete product: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F9F9F8] min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto">

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-stone-200 gap-4 mb-8">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-stone-500 mb-1">
              Admin Portal
            </p>
            <h1 style={headingFont} className="text-3xl sm:text-4xl text-[#2C2C2C]">
              Product Management Dashboard
            </h1>
          </div>
          <button
            onClick={() => handleOpenAddModal(activeCategory)}
            className="bg-[#2C2C2C] text-white px-6 py-3 text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-stone-900 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} />
            Add Products
          </button>
        </div>

        {/* Main Grid: Sidebar + Product Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Left Sidebar: Categories */}
          <div className="lg:col-span-1 bg-white border border-stone-200 p-6 self-start">
            <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-4 pb-3 border-b border-stone-100 flex items-center gap-2">
              <Layers size={14} /> Categories
            </h2>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                const count = products.filter(
                  (p) => cat === 'New' || p.category.toLowerCase().trim() === cat.toLowerCase().trim()
                ).length;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.1em] font-medium transition-all ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-sm font-semibold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Area: Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 style={headingFont} className="text-2xl text-[#2C2C2C]">
                {activeCategory} Products ({filteredProducts.length})
              </h2>
            </div>

            {isLoadingProducts ? (
              <div className="flex justify-center items-center py-24 bg-white border border-stone-200">
                <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white border border-stone-200 p-12 text-center">
                <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <h3 style={headingFont} className="text-xl text-stone-700 mb-2">
                  No Products in {activeCategory}
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  Get started by adding products to this category.
                </p>
                <button
                  onClick={() => handleOpenAddModal(activeCategory)}
                  className="bg-[#2C2C2C] text-white px-6 py-2.5 text-[10px] uppercase tracking-[0.18em] font-semibold hover:bg-stone-900 transition-colors inline-flex items-center gap-2"
                >
                  <Plus size={14} /> Add Product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-stone-200 flex flex-col group hover:shadow-md transition-shadow"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                      <img
                        src={product.image_url || ''}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-[9px] uppercase tracking-wider font-semibold text-stone-800">
                        {product.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 style={headingFont} className="text-lg text-stone-900 font-normal mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm font-semibold text-stone-800 mb-2">
                        {formatNaira(product.price)}
                      </p>
                      {product.description && (
                        <p className="text-xs text-stone-500 font-light line-clamp-2 leading-relaxed mb-4">
                          {product.description}
                        </p>
                      )}

                      {/* Action buttons */}
                      <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="flex-1 border border-stone-200 text-stone-700 hover:bg-stone-900 hover:text-white py-2 text-[10px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => setDeletingProduct(product)}
                          className="border border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white px-3 py-2 text-[10px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                          title="Delete Product"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── ADD / BATCH UPLOAD MODAL ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-stone-200 w-full max-w-2xl p-6 sm:p-8 my-8 relative shadow-2xl animate-fadeIn">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-800"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1">
                Add Products
              </p>
              <h2 style={headingFont} className="text-2xl text-[#2C2C2C]">
                Upload to {uploadCategory}
              </h2>
            </div>

            {/* Mode Selector */}
            <div className="flex border-b border-stone-200 mb-6">
              <button
                type="button"
                onClick={() => setUploadMode('single')}
                className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 mr-6 ${
                  uploadMode === 'single'
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                Single Product
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('batch')}
                className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 ${
                  uploadMode === 'batch'
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                Batch Upload (Up to 5)
              </button>
            </div>

            {feedback && (
              <div
                className={`mb-6 p-4 rounded text-xs flex items-center gap-3 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-600 mb-1.5">
                  Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full p-3 bg-[#F9F9F8] border border-stone-200 text-xs text-stone-800 font-medium"
                >
                  {CATEGORIES.filter((c) => c !== 'New').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {batchItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4 border border-stone-200 bg-[#FAF9F8] space-y-4 relative"
                >
                  <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-stone-700">
                      Product #{index + 1}
                    </span>
                    {uploadMode === 'batch' && batchItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBatchRow(index)}
                        className="text-rose-600 hover:text-rose-800 text-[10px] uppercase tracking-wider font-bold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={item.name}
                      onChange={(e) => handleUpdateBatchItem(index, 'name', e.target.value)}
                      placeholder="e.g. Minimalist Linen Sofa"
                      className="w-full p-2.5 bg-white border border-stone-200 text-xs text-stone-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
                        Price (₦)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.price}
                        onChange={(e) => handleUpdateBatchItem(index, 'price', e.target.value)}
                        placeholder="150000"
                        className="w-full p-2.5 bg-white border border-stone-200 text-xs text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
                        Image File *
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) =>
                          handleUpdateBatchItem(index, 'imageFile', e.target.files?.[0] || null)
                        }
                        className="w-full text-xs text-stone-600 file:mr-2 file:py-1.5 file:px-3 file:border-0 file:text-[9px] file:uppercase file:font-bold file:bg-stone-800 file:text-white hover:file:bg-stone-900 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-stone-600 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => handleUpdateBatchItem(index, 'description', e.target.value)}
                      placeholder="Product dimensions, fabric, or craftsmanship details..."
                      className="w-full p-2.5 bg-white border border-stone-200 text-xs text-stone-800"
                    />
                  </div>
                </div>
              ))}

              {uploadMode === 'batch' && batchItems.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddBatchRow}
                  className="w-full border border-dashed border-stone-300 py-3 text-xs uppercase tracking-wider font-semibold text-stone-600 hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Add Another Product (Max 5)
                </button>
              )}

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-3 border border-stone-300 text-stone-700 text-[11px] uppercase tracking-wider font-semibold hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#2C2C2C] text-white text-[11px] uppercase tracking-wider font-bold hover:bg-stone-900 transition-colors flex items-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" /> Save & Publish
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL (Price & Description ONLY) ── */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-stone-200 w-full max-w-lg p-6 sm:p-8 relative shadow-2xl animate-fadeIn">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-800"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1">
                Edit Product
              </p>
              <h2 style={headingFont} className="text-2xl text-[#2C2C2C]">
                {editingProduct.name}
              </h2>
            </div>

            {/* Read-only notice */}
            <div className="mb-6 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <span>
                Name, Category, and Image cannot be edited. To change them, delete this product and re-add it fresh.
              </span>
            </div>

            {feedback && (
              <div
                className={`mb-6 p-4 rounded text-xs flex items-center gap-3 ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handleUpdateSubmit} className="space-y-5">
              {/* Read-only Category & Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">
                    Category (Read-Only)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={editingProduct.category}
                    className="w-full p-2.5 bg-stone-100 border border-stone-200 text-xs text-stone-500 cursor-not-allowed font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-1">
                    Product Name (Read-Only)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={editingProduct.name}
                    className="w-full p-2.5 bg-stone-100 border border-stone-200 text-xs text-stone-500 cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              {/* Editable Price (₦) */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Price (₦) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="e.g. 250000"
                  className="w-full p-3 bg-[#F9F9F8] border border-stone-300 text-xs text-stone-900 font-semibold focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Editable Description */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Update product description, fabric specs, dimensions..."
                  className="w-full p-3 bg-[#F9F9F8] border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-6 py-3 border border-stone-300 text-stone-700 text-[11px] uppercase tracking-wider font-semibold hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-8 py-3 bg-[#2C2C2C] text-white text-[11px] uppercase tracking-wider font-bold hover:bg-stone-900 transition-colors flex items-center gap-2 disabled:opacity-60"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 w-full max-w-md p-6 sm:p-8 relative shadow-2xl animate-fadeIn text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h3 style={headingFont} className="text-2xl text-stone-900 mb-2">
              Confirm Delete
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-semibold text-stone-900">"{deletingProduct.name}"</span>?
              This will permanently remove the product from the catalog and delete its image file from storage.
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                disabled={isSubmitting}
                className="px-6 py-2.5 border border-stone-300 text-stone-700 text-[11px] uppercase tracking-wider font-semibold hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-rose-600 text-white text-[11px] uppercase tracking-wider font-bold hover:bg-rose-700 transition-colors flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                  </>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
