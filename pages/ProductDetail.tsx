
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ShieldCheck, Share2, ChevronLeft, ChevronRight, MessageSquare, AlertCircle } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useStore } from '../store/StoreContext';
import { Product, StockStatus } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedVars, setSelectedVars] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  
  const { addToCart, toggleWishlist, wishlist } = useStore();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found.</h2>
        <Link to="/shop" className="text-rose-500 mt-4 block">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity: qty,
      selectedVariations: selectedVars
    });
    alert('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex text-xs text-gray-400 mb-8 space-x-2">
        <Link to="/" className="hover:text-rose-500">Home</Link>
        <span>/</span>
        <Link to={`/shop?cat=${product.category}`} className="capitalize hover:text-rose-500">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
            <img src={product.images[activeImg]} className="w-full h-full object-contain" alt={product.name} />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors" onClick={() => setActiveImg(prev => (prev > 0 ? prev - 1 : product.images.length - 1))}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors" onClick={() => setActiveImg(prev => (prev < product.images.length - 1 ? prev + 1 : 0))}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button key={idx} onClick={() => setActiveImg(idx)} className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImg === idx ? 'border-rose-500 scale-105' : 'border-transparent'}`}>
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-bold text-rose-500 uppercase tracking-widest">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-gray-500 ml-2 font-medium">{product.rating} (24 reviews)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-500">SKU: {product.sku}</span>
            </div>
          </div>

          <div className="flex items-baseline space-x-4">
            <span className="text-4xl font-bold text-gray-900">৳{product.salePrice || product.price}</span>
            {product.salePrice && <span className="text-xl text-gray-400 line-through">৳{product.price}</span>}
            {product.salePrice && <span className="bg-rose-100 text-rose-600 px-2 py-1 rounded text-xs font-bold">-{Math.round(((product.price - product.salePrice) / product.price) * 100)}%</span>}
          </div>

          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${product.stockStatus === StockStatus.IN_STOCK ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <span className="text-sm font-semibold">{product.stockStatus}</span>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>

          <hr className="border-gray-100" />

          {/* Variations */}
          {product.variations.map(variation => (
            <div key={variation.id} className="space-y-3">
              <label className="text-sm font-bold text-gray-900">{variation.name}</label>
              <div className="flex flex-wrap gap-3">
                {variation.options.map(opt => (
                  <button 
                    key={opt} 
                    onClick={() => setSelectedVars({ ...selectedVars, [variation.name]: opt })}
                    className={`px-4 py-2 rounded-lg text-sm transition-all border ${selectedVars[variation.name] === opt ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-gray-900 px-2 font-bold">-</button>
              <span className="w-12 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="text-gray-400 hover:text-gray-900 px-2 font-bold">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-rose-500 transition-all transform active:scale-95"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`p-4 rounded-xl border transition-all ${wishlist.includes(product.id) ? 'bg-rose-50 text-rose-500 border-rose-200' : 'bg-white text-gray-400 border-gray-200 hover:text-rose-500'}`}
            >
              <Heart className={`h-6 w-6 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>100% Authentic Guarantee</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Share2 className="h-4 w-4 text-rose-500" />
              <span>Share with friends</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100 mb-10">
        <div className="flex space-x-12">
          {(['desc', 'specs', 'reviews'] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : 'Reviews (24)'}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500 rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'desc' && (
          <div className="prose prose-rose max-w-none text-gray-600 leading-relaxed space-y-4">
            <p>{product.description}</p>
            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
              <h3 className="text-rose-800 font-bold mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                How to Use
              </h3>
              <p className="text-sm text-rose-700">Apply a small amount to your face in the AM and PM as part of your skincare regimen, after water-based serums but before heavier treatments. If irritation occurs, cease use and consult a physician.</p>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">{key}</span>
                <span className="text-gray-900 font-bold">{val}</span>
              </div>
            ))}
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500 font-medium">Warranty</span>
              <span className="text-gray-900 font-bold">{product.warranty || 'No Warranty'}</span>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="flex items-center space-x-12">
              <div className="text-center space-y-2">
                <h3 className="text-5xl font-bold">4.8</h3>
                <div className="flex text-yellow-400 justify-center">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-xs text-gray-500">Based on 24 reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="flex items-center space-x-4">
                    <span className="text-xs font-bold w-4">{stars}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: `${stars === 5 ? 80 : stars === 4 ? 15 : 5}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-8">{stars === 5 ? 19 : stars === 4 ? 3 : stars === 3 ? 2 : 0}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Sample Review */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">Sara Rahman</h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">Oct 12, 2023</span>
                </div>
                <p className="text-sm text-gray-600">This has significantly improved my skin texture. Authentic product and fast delivery. Highly recommended!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
