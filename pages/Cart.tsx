
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { MOCK_PRODUCTS } from '../constants';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity } = useStore();
  const navigate = useNavigate();

  const cartItems = cart.map(item => ({
    ...item,
    product: MOCK_PRODUCTS.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + (price * item.quantity);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="bg-rose-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="h-12 w-12 text-rose-500" />
        </div>
        <h2 className="text-3xl font-serif font-bold">Your cart is empty</h2>
        <p className="text-gray-500 max-w-xs mx-auto">Looks like you haven't added any beauty goodies to your cart yet.</p>
        <Link to="/shop" className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-500 transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-serif font-bold mb-10">Shopping Cart ({cart.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-6">
              <div className="w-24 h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                <img src={item.product.images[0]} className="w-full h-full object-contain" alt={item.product.name} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.product.name}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.product.brand}</p>
                    <div className="flex gap-2 mt-1">
                      {Object.entries(item.selectedVariations).map(([k, v]) => (
                        <span key={k} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-bold text-gray-600">{k}: {v}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.productId, item.selectedVariations)} className="text-gray-300 hover:text-rose-500 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center border border-gray-100 rounded-lg p-1">
                    <button onClick={() => updateCartQuantity(item.productId, item.selectedVariations, -1)} className="p-1 hover:text-rose-500"><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.productId, item.selectedVariations, 1)} className="p-1 hover:text-rose-500"><Plus className="h-4 w-4" /></button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">৳{(item.product.salePrice || item.product.price) * item.quantity}</p>
                    <p className="text-xs text-gray-400">৳{item.product.salePrice || item.product.price} / item</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-28 space-y-6">
            <h2 className="text-xl font-serif font-bold">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-400 italic">Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between">
                <span className="font-bold">Estimated Total</span>
                <span className="text-2xl font-bold text-rose-500">৳{subtotal}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-rose-500 transition-all"
            >
              <span>Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
              <p className="text-xs font-bold text-gray-500 mb-2">HAVE A COUPON?</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Promo code" className="flex-1 px-3 py-2 rounded-lg border-gray-200 text-sm" />
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
