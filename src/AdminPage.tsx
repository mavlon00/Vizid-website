import React, { useState, useEffect } from 'react';
import { supabase, Profile } from './supabase';
import { Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface AdminPageProps {
  headingFont: React.CSSProperties;
  setCurrentPage: (page: string) => void;
}

const CATEGORIES = [
  'Living Room',
  'Kitchen',
  'Bedroom',
  'Dining',
  'Bathroom',
  'Office',
  'Entryway',
];

export const AdminPage: React.FC<AdminPageProps> = ({ headingFont, setCurrentPage }) => {
  const [status, setStatus] = useState<'checking' | 'authorized' | 'denied'>('checking');

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

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

  // While checking or if denied, render a blank container
  if (status !== 'authorized') {
    return <div className="min-h-screen bg-[#F9F9F8]" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!name.trim()) {
      setFeedback({ type: 'error', message: 'Product name is required.' });
      return;
    }

    if (!imageFile) {
      setFeedback({ type: 'error', message: 'Product image file is required.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Not authenticated.');
      }

      // 1. Upload image to 'product-images' bucket
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Storage Upload Failed: ${uploadError.message}`);
      }

      // 2. Get Public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // 3. Insert Product row
      const { error: insertError } = await supabase
        .from('products')
        .insert({
          name: name.trim(),
          description: description.trim() || null,
          price: price ? parseFloat(price) : null,
          category,
          image_url: publicUrl,
          created_by: user.id,
        });

      if (insertError) {
        throw new Error(`Database Insert Failed: ${insertError.message}`);
      }

      setFeedback({
        type: 'success',
        message: `Product "${name}" uploaded successfully!`,
      });

      // Reset form
      setName('');
      setPrice('');
      setDescription('');
      setImageFile(null);
      // reset file input element manually
      const fileInput = document.getElementById('product-image-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'An unexpected error occurred during upload.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F9F9F8] min-h-[85vh] py-16 px-4 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-8 sm:p-12 shadow-sm border border-stone-200">
        <div className="mb-8 text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-stone-400 mb-2">Admin Portal</p>
          <h1 style={headingFont} className="text-3xl sm:text-4xl text-[#2C2C2C]">
            Product Catalog Upload
          </h1>
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
            <span className="font-medium">{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] tracking-[0.15em] uppercase font-bold text-stone-600 mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-[#F9F9F8] border border-stone-200 text-sm focus:outline-none focus:border-stone-500 rounded-none text-stone-800"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] tracking-[0.15em] uppercase font-bold text-stone-600 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Velvet Tufted Armchair"
              className="w-full p-3 bg-[#F9F9F8] border border-stone-200 text-sm focus:outline-none focus:border-stone-500 rounded-none text-stone-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase font-bold text-stone-600 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="299.99"
                className="w-full p-3 bg-[#F9F9F8] border border-stone-200 text-sm focus:outline-none focus:border-stone-500 rounded-none text-stone-800"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase font-bold text-stone-600 mb-2">
                Image File *
              </label>
              <input
                id="product-image-input"
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full text-xs text-stone-600 file:mr-4 file:py-2.5 file:px-4 file:border-0 file:text-[10px] file:uppercase file:font-semibold file:bg-stone-800 file:text-white hover:file:bg-stone-900 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] tracking-[0.15em] uppercase font-bold text-stone-600 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe craftsmanship, dimensions, materials..."
              className="w-full p-3 bg-[#F9F9F8] border border-stone-200 text-sm focus:outline-none focus:border-stone-500 rounded-none text-stone-800"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2C2C2C] text-white py-4 text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-stone-900 transition-colors flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading Product...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
