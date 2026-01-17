
import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Grid, List, Search, Star, Heart } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES, BRANDS } from '../constants';
import { useStore } from '../store/StoreContext';

const Shop: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const initialCat = query.get('cat') || 'all';
  
  const [category, setCategory] = useState(initialCat);
  const [brand, setBrand] = useState('all');
  const [priceRange, setPriceRange] = useState(5000);
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const { toggleWishlist, wishlist } = useStore();

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      if (category !== 'all' && p.category !== category) return false;
      if (brand !== 'all' && p.brand !== brand) return false;
      const price = p.salePrice || p.price;
      if (price > priceRange) return false;
      return true;
    }).sort((a, b) => {
      if (sort === 'price-low') return (a.salePrice || a.price) - (b.salePrice || b.price);
      if (sort === 'price-high') return (b.salePrice || b.price) - (a.salePrice || a.price);
      return 0; // newest etc logic
    });
  }, [category, brand, priceRange, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 capitalize">{category === 'all' ? 'All Products' : category}</h1>
          <p className="text-gray-500 mt-2">Showing {filteredProducts.length} premium items</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:w-64 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search brands..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-rose-200" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </button>
          <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 text-sm gap-2">
            <span className="text-gray-400">Sort:</span>
            <select className="border-none focus:ring-0 text-sm font-bold bg-transparent pr-8" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 space-y-10 bg-white lg:bg-transparent p-6 lg:p-0 rounded-3xl lg:rounded-none`}>
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center justify-between">
              Categories
              <ChevronDown className="h-4 w-4" />
            </h3>
            <div className="space-y-2">
              <button onClick={() => setCategory('all')} className={`block w-full text-left text-sm font-medium transition-colors ${category === 'all' ? 'text-rose-500 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>All Collections</button>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setCategory(cat.id)} className={`block w-full text-left text-sm font-medium transition-colors ${category === cat.id ? 'text-rose-500 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>{cat.name}</button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Price Range</h3>
            <input 
              type="range" min="0" max="10000" step="500" 
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500" 
              value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>৳0</span>
              <span>Max: ৳{priceRange}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Brand</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <button onClick={() => setBrand('all')} className={`block w-full text-left text-sm font-medium transition-colors ${brand === 'all' ? 'text-rose-500 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>All Brands</button>
              {BRANDS.map(b => (
                <button key={b} onClick={() => setBrand(b)} className={`block w-full text-left text-sm font-medium transition-colors ${brand === b ? 'text-rose-500 font-bold' : 'text-gray-500 hover:text-gray-900'}`}>{b}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
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
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500">No products found matching your criteria.</p>
              <button onClick={() => { setCategory('all'); setBrand('all'); setPriceRange(5000); }} className="text-rose-500 font-bold mt-2 hover:underline">Clear all filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
