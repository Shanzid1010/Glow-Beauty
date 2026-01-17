
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, LogIn } from 'lucide-react';
import { useStore } from '../store/StoreContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, wishlist, user } = useStore();
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-rose-500 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-rose-600">
              Glow<span className="text-gray-900">Beauty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 text-sm font-medium">
            <Link to="/" className="text-gray-700 hover:text-rose-500 transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-rose-500 transition-colors">Shop All</Link>
            <Link to="/shop?cat=skincare" className="text-gray-700 hover:text-rose-500 transition-colors">Skincare</Link>
            <Link to="/shop?cat=makeup" className="text-gray-700 hover:text-rose-500 transition-colors">Makeup</Link>
            <Link to="/about" className="text-gray-700 hover:text-rose-500 transition-colors">About Us</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="hidden sm:flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none focus:ring-0 text-xs w-24 lg:w-40 ml-2"
              />
            </div>
            
            <Link to="/account/wishlist" className="relative text-gray-600 hover:text-rose-500 transition-colors">
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative text-gray-600 hover:text-rose-500 transition-colors">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <Link to="/account" className="flex items-center space-x-1 text-gray-600 hover:text-rose-500 transition-colors">
                <User className="h-6 w-6" />
                <span className="hidden md:inline text-xs font-semibold">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/auth" className="text-gray-600 hover:text-rose-500 transition-colors">
                <LogIn className="h-6 w-6" />
              </Link>
            )}

            {user?.role === 'admin' && (
              <button 
                onClick={() => navigate('/admin')}
                className="hidden md:block bg-gray-900 text-white px-3 py-1 rounded text-xs hover:bg-rose-600 transition-colors"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-900">Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-900">Shop All</Link>
          <Link to="/shop?cat=skincare" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-900">Skincare</Link>
          <Link to="/shop?cat=makeup" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-900">Makeup</Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-rose-200"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
