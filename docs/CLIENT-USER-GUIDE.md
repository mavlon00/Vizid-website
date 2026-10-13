# Vizid — Client User Guide (Admin & Content Management)

Welcome to the **Vizid Admin Control Panel User Guide**. This guide provides staff, creative directors, and store managers with step-by-step instructions for managing products, tracking customer orders, and monitoring inquiries.

---

## 1. Accessing the Admin Control Panel

* **Admin Portal URL**: `https://admin.viziddecors.com`
* **Sign In Requirements**:
  - An email account registered in the Supabase authentication system.
  - The account must have `role: 'admin'` assigned in the database `profiles` table.
* **Security Notice**: Any attempt to sign in with an unauthorized customer account will be automatically rejected and logged out.

---

## 2. Managing Products

The **Products** section allows you to manage the luxury furnishings catalog displayed on the public Shop page (`viziddecors.com/shop`).

### 2.1 Adding a New Product
1. Navigate to **Products** in the left sidebar menu.
2. Click the **+ Add Product** button in the upper right corner.
3. Fill in the product details:
   - **Product Name**: Enter a descriptive, luxury title (e.g., *Sovereign Curved Bouclé Sofa*).
   - **Category**: Select the category (*Living*, *Dining*, *Bedroom*, *Lighting*, *Accents*, or *New*).
   - **Price (NGN)**: Enter the price in Nigerian Naira (e.g., `350000` for ₦350,000).
   - **Product Image**: Enter an image URL or upload an optimized image file.
   - **Description**: Add architectural materials, dimensions, and styling notes.
4. Click **Save Product**. The item will immediately appear in the public Shop.

### 2.2 Editing an Existing Product
1. In the Products table, locate the product you want to modify.
2. Click the **Edit** (Pencil icon) button on the right side of the row.
3. Update the pricing, category, or description.
4. Click **Update Product** to commit your changes.

### 2.3 Deleting a Product
1. Click the **Delete** (Trash icon) button next to the product.
2. A confirmation dialog will appear warning that this action cannot be undone.
3. Click **Confirm Delete**. The product is permanently removed from the catalog.

---

## 3. Managing Customer Orders

The **Orders** section gives you real-time visibility into all transactions made through the public website.

### 3.1 Understanding Order Statuses
* **`pending`**: Customer initiated checkout and opened the Paystack popup, but has not completed payment yet.
* **`paid`**: Payment was verified server-side with Paystack. Funds have settled or are processing.
* **`fulfilled`**: Staff have packaged and shipped the luxury furnishings to the customer.
* **`failed`**: Payment was declined or cancelled.

### 3.2 Inspecting and Fulfilling an Order
1. Click **Orders** in the sidebar.
2. Click any order row or click **View Details**.
3. In the Order Detail modal, review:
   - **Customer Information**: Contact email and phone number.
   - **Delivery Address**: Shipping location in Nigeria or internationally.
   - **Line Items**: Each product, quantity, unit price, and subtotal.
   - **Paystack Reference**: The unique transaction reference code for reconciliation.
4. When delivery has been dispatched or completed, update the **Status** dropdown to **Fulfilled**.

---

## 4. Handling Design Consultation Inquiries

When customers submit the **Work With Us** form on `https://viziddecors.com/work`:
1. The submission generates a structured WhatsApp message directly to the official studio number (`+234 907 409 5400`).
2. The message contains:
   - **Service Request**: Virtual Spatial Design or Full Service Execution.
   - **Location**: City and State.
   - **Home Size**: Square footage.
   - **Project Timeline**: Target start and completion dates.
   - **Inspiration Links**: Pinterest board or project style references.
3. **Response Protocol**: Studio representatives should reply within 24–48 business hours to schedule an initial design discovery call.

---

## 5. Media & Asset Guidelines

To preserve fast page loads and visual excellence:
- **Aspect Ratios**: Use 4:5 or 1:1 ratios for product catalog items.
- **File Format**: Prefer modern `.webp` or compressed `.jpg` / `.png`.
- **File Size**: Keep individual product images below **500 KB** whenever possible.
- **High-Resolution Photography**: Always shoot products in warm, ambient, architectural lighting that reflects the Vizid luxury standard.
