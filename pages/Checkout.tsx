
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, CreditCard, Truck, MapPin } from 'lucide-react';
import { useStore } from '../store/StoreContext';
import { MOCK_PRODUCTS, SHIPPING_RATES } from '../constants';
import { OrderStatus, Address } from '../types';

const Checkout: React.FC = () => {
  const { cart, user, clearCart, addOrder } = useStore();
  const navigate = useNavigate();
  const [shippingArea, setShippingArea] = useState<'INSIDE_DHAKA' | 'OUTSIDE_DHAKA'>('INSIDE_DHAKA');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'COD'>('bKash');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: 'Dhaka',
  });

  const cartItems = cart.map(item => ({
    ...item,
    product: MOCK_PRODUCTS.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => (item.product.salePrice || item.product.price) * item.quantity, 0);
  const shippingCharge = SHIPPING_RATES[shippingArea];
  const total = subtotal + shippingCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId: user?.id || 'guest',
      items: cartItems,
      subtotal,
      shippingCharge,
      discount: 0,
      total,
      status: OrderStatus.PENDING,
      paymentMethod,
      shippingAddress: {
        id: 'new',
        label: 'Shipping',
        street: formData.address,
        area: formData.city,
        city: formData.city,
        district: formData.city,
        isDefault: true
      },
      createdAt: new Date().toISOString()
    };

    addOrder(newOrder);
    clearCart();
    navigate('/order-success/' + newOrder.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-500 hover:text-rose-500 mb-8 font-medium">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Cart
      </button>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Shipping Information */}
        <div className="space-y-10">
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center">
              <MapPin className="h-6 w-6 mr-3 text-rose-500" />
              Shipping Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-rose-200" placeholder="e.g. Anika Tasnim" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Mobile Number</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-rose-200" placeholder="01XXXXXXXXX" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Shipping Address</label>
                <textarea required rows={3} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-rose-200" placeholder="House no, Street name, Apartment" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Delivery Area</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-rose-200"
                  value={shippingArea}
                  onChange={(e) => setShippingArea(e.target.value as any)}
                >
                  <option value="INSIDE_DHAKA">Inside Dhaka (৳60)</option>
                  <option value="OUTSIDE_DHAKA">Outside Dhaka (৳120)</option>
                </select>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-bold flex items-center">
              <CreditCard className="h-6 w-6 mr-3 text-rose-500" />
              Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['bKash', 'Nagad', 'COD'] as const).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${paymentMethod === method ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200 bg-white'}`}
                >
                  {method === 'bKash' && <img src="https://www.logo.wine/a/logo/BKash/BKash-Logo.wine.svg" className="h-10 w-20 object-contain mb-2" alt="bKash" />}
                  {method === 'Nagad' && <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Nagad_Logo.svg/1200px-Nagad_Logo.svg.png" className="h-10 w-20 object-contain mb-2" alt="Nagad" />}
                  {method === 'COD' && <div className="h-10 w-10 flex items-center justify-center mb-2"><Truck className="h-8 w-8 text-gray-400" /></div>}
                  <span className="text-xs font-bold">{method === 'COD' ? 'Cash on Delivery' : method}</span>
                </button>
              ))}
            </div>
            {paymentMethod !== 'COD' && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500">
                <p>After clicking "Complete Order", you will be redirected to the secure {paymentMethod} payment gateway.</p>
              </div>
            )}
          </section>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-28 space-y-6">
            <h2 className="text-xl font-serif font-bold">Your Order</h2>
            
            <div className="max-h-60 overflow-y-auto space-y-4 pr-2">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold">৳{(item.product.salePrice || item.product.price) * item.quantity}</span>
                </div>
              ))}
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping ({shippingArea.replace('_', ' ')})</span>
                <span className="font-bold">৳{shippingCharge}</span>
              </div>
              <div className="pt-4 flex justify-between">
                <span className="text-lg font-bold">Total Payable</span>
                <span className="text-3xl font-bold text-rose-500">৳{total}</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-rose-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-rose-700 transition-all shadow-lg shadow-rose-100"
            >
              <CheckCircle2 className="h-6 w-6" />
              <span>Complete Order</span>
            </button>

            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              <Lock className="h-3 w-3" />
              <span>Secure SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
