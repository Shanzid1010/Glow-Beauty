
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { StoreProvider } from './store/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminDashboard from './pages/Admin/Dashboard';
import Auth from './pages/Auth';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-serif font-bold text-rose-600">Shanzid Beauty BD</Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            Bangladesh's most trusted premium cosmetics destination. We bring you authentic beauty products from across the globe, right to your doorstep.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-rose-500 transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-rose-500 transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-rose-500 transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-rose-500 transition-colors"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li><Link to="/shop" className="hover:text-rose-500 transition-colors">Shop All Products</Link></li>
            <li><Link to="/shop?cat=skincare" className="hover:text-rose-500 transition-colors">Skincare Routine</Link></li>
            <li><Link to="/shop?cat=makeup" className="hover:text-rose-500 transition-colors">Makeup Collection</Link></li>
            <li><Link to="/account/orders" className="hover:text-rose-500 transition-colors">Track Your Order</Link></li>
            <li><Link to="/about" className="hover:text-rose-500 transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold">Customer Support</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li><a href="#" className="hover:text-rose-500 transition-colors">Authenticity Guarantee</a></li>
            <li><a href="#" className="hover:text-rose-500 transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-rose-500 transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-rose-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-rose-500 transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold">Get In Touch</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-rose-500 flex-shrink-0" />
              <span>Centre Point, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-rose-500 flex-shrink-0" />
              <span>+880 1700-000000</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-rose-500 flex-shrink-0" />
              <span>support@shanzidbeautybd.com.bd</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-gray-400">© 2026 Shanzid Beauty BD. All rights reserved. Designed by Md Shanzid Hossain.</p>
        <div className="flex items-center space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all">
          <img src="https://www.logo.wine/a/logo/BKash/BKash-Logo.wine.svg" className="h-8" alt="bKash" />
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Nagad_Logo.svg/1200px-Nagad_Logo.svg.png" className="h-6" alt="Nagad" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Rocket_logo.png" className="h-6" alt="Rocket" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png" className="h-8" alt="Stripe" />
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:id" element={<OrderSuccess />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:bg-rose-500 transition-all z-40 transform hover:scale-110 active:scale-90"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
