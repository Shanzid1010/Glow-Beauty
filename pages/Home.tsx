
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { useStore } from '../store/StoreContext';

const Home: React.FC = () => {
  const { products, toggleWishlist, wishlist } = useStore();
  const featured = products.filter(p => p.isFeatured);

  return (
    <div className="space-y-16 pb-16">
      <section className="relative h-[400px] md:h-[600px] overflow-hidden group">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1600&h=800&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg space-y-6 text-white animate-fade-in-up">
                <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Eid Collection 2024</span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">Glow From Within This Season</h1>
                <p className="text-lg text-gray-200">Discover premium international cosmetics with authentic guarantee and doorstep delivery across Bangladesh.</p>
                <div className="flex space-x-4">
                  <Link to="/shop" className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-rose-500 hover:text-white transition-all transform hover:-translate-y-1">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 p-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                <button onClick={() => toggleWishlist(product.id)} className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${wishlist.includes(product.id) ? 'bg-rose-500 text-white' : 'bg-white text-gray-400 hover:text-rose-500'}`}><Star className="h-4 w-4 fill-current" /></button>
              </div>
              <Link to={`/product/${product.id}`} className="block">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</p>
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-rose-600 transition-colors">{product.name}</h3>
                <div className="flex items-center space-x-2 mt-2"><span className="text-lg font-bold text-gray-900">৳{product.salePrice || product.price}</span></div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
