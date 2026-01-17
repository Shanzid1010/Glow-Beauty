
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { useStore } from '../store/StoreContext';

const Home: React.FC = () => {
  const featured = MOCK_PRODUCTS.filter(p => p.isFeatured);
  const { toggleWishlist, wishlist } = useStore();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Slider Section */}
      <section className="relative h-[400px] md:h-[600px] overflow-hidden group">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1600&h=800&fit=crop" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            alt="Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg space-y-6 text-white animate-fade-in-up">
                <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  Eid Collection 2024
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                  Glow From Within This Season
                </h1>
                <p className="text-lg text-gray-200">
                  Discover premium international cosmetics with authentic guarantee and doorstep delivery across Bangladesh.
                </p>
                <div className="flex space-x-4">
                  <Link to="/shop" className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-rose-500 hover:text-white transition-all transform hover:-translate-y-1">
                    Shop Now
                  </Link>
                  <Link to="/about" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-gray-900 transition-all">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
          {[
            { icon: <ShieldCheck className="h-8 w-8 text-rose-500" />, title: '100% Authentic', desc: 'Sourced from brands' },
            { icon: <Truck className="h-8 w-8 text-rose-500" />, title: 'Fast Delivery', desc: 'Within 2-3 business days' },
            { icon: <RefreshCw className="h-8 w-8 text-rose-500" />, title: 'Easy Returns', desc: '7 days hassle-free return' },
            { icon: <Zap className="h-8 w-8 text-rose-500" />, title: 'Best Prices', desc: 'Direct sourcing advantage' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-2">
              {item.icon}
              <h3 className="font-bold text-sm">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold">Shop by Category</h2>
            <p className="text-gray-500">Curated collections for your specific needs</p>
          </div>
          <Link to="/shop" className="text-rose-500 font-bold flex items-center hover:underline">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/shop?cat=${cat.id}`} className="group relative rounded-2xl overflow-hidden h-64 shadow-md">
              <img src={cat.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={cat.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-bold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold">Our Best Sellers</h2>
          <p className="text-gray-500 mt-2">Highly recommended by our community</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 p-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
                <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${wishlist.includes(product.id) ? 'bg-rose-500 text-white' : 'bg-white text-gray-400 hover:text-rose-500'}`}
                >
                  <Star className="h-4 w-4 fill-current" />
                </button>
                {product.salePrice && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded">SALE</span>
                )}
              </div>
              <Link to={`/product/${product.id}`} className="block">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</p>
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-rose-600 transition-colors">{product.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-[10px] text-gray-500 ml-1">{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-lg font-bold text-gray-900">৳{product.salePrice || product.price}</span>
                  {product.salePrice && <span className="text-xs text-gray-400 line-through">৳{product.price}</span>}
                </div>
              </Link>
              <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg text-xs font-bold hover:bg-rose-500 transition-colors">
                Quick View
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-rose-50 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="flex-1 space-y-6 z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Join Our Newsletter & Get 10% Off</h2>
            <p className="text-gray-600 text-lg">Be the first to know about new arrivals, beauty tips, and exclusive offers.</p>
            <form className="flex max-w-md w-full" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-l-full border-none focus:ring-2 focus:ring-rose-200" />
              <button className="bg-rose-500 text-white px-8 py-4 rounded-r-full font-bold hover:bg-rose-600 transition-colors">Join</button>
            </form>
          </div>
          <div className="flex-1 relative h-64 md:h-96 w-full">
            <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&h=800&fit=crop" className="absolute -right-20 -bottom-20 w-[120%] h-[120%] object-contain opacity-20 md:opacity-100 rotate-12" alt="Promo" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
