
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ShieldCheck, Share2, ChevronLeft, ChevronRight, MessageSquare, AlertCircle } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { StockStatus } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const product = products.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedVars, setSelectedVars] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found.</h2>
        <Link to="/shop" className="text-rose-500 mt-4 block">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: qty, selectedVariations: selectedVars });
    alert('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex text-xs text-gray-400 mb-8 space-x-2">
        <Link to="/" className="hover:text-rose-500">Home</Link>
        <span>/</span>
        <Link to={`/shop?cat=${product.category}`} className="capitalize hover:text-rose-500">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            <img src={product.images[activeImg]} className="w-full h-full object-contain" alt={product.name} />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button key={idx} onClick={() => setActiveImg(idx)} className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImg === idx ? 'border-rose-500 scale-105' : 'border-transparent'}`}>
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-bold text-rose-500 uppercase tracking-widest">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{product.name}</h1>
          </div>
          <div className="flex items-baseline space-x-4">
            <span className="text-4xl font-bold text-gray-900">৳{product.salePrice || product.price}</span>
            {product.salePrice && <span className="text-xl text-gray-400 line-through">৳{product.price}</span>}
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${product.stockCount > 0 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <span className="text-sm font-semibold">{product.stockCount > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </div>
          <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-gray-900 px-2 font-bold">-</button>
              <span className="w-12 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="text-gray-400 hover:text-gray-900 px-2 font-bold">+</button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-rose-500 transition-all transform active:scale-95">
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            <button onClick={() => toggleWishlist(product.id)} className={`p-4 rounded-xl border transition-all ${wishlist.includes(product.id) ? 'bg-rose-50 text-rose-500 border-rose-200' : 'bg-white text-gray-400 border-gray-200 hover:text-rose-500'}`}>
              <Heart className={`h-6 w-6 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
