
export enum StockStatus {
  IN_STOCK = 'In Stock',
  OUT_OF_STOCK = 'Out of Stock',
  PRE_ORDER = 'Pre-order'
}

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  ON_HOLD = 'On Hold',
  SHIPPED = 'Shipped',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  REFUNDED = 'Refunded'
}

export interface ProductVariation {
  id: string;
  name: string; // e.g., 'Size', 'Color'
  options: string[]; // e.g., ['S', 'M', 'L'] or ['Red', 'Blue']
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
  sku: string;
  price: number;
  salePrice?: number;
  stockCount: number;
  stockStatus: StockStatus;
  images: string[];
  variations: ProductVariation[];
  specifications: Record<string, string>;
  rating: number;
  reviews: Review[];
  warranty?: string;
  isFeatured: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariations: Record<string, string>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[]; // product IDs
  role: 'user' | 'admin';
}

export interface Address {
  id: string;
  label: string; // e.g., 'Home', 'Office'
  street: string;
  area: string;
  city: string;
  district: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: (CartItem & { product: Product })[];
  subtotal: number;
  shippingCharge: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  shippingAddress: Address;
  transactionId?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subCategories: string[];
}
