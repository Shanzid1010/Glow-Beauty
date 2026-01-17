
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Printer } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 animate-bounce">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-bold text-gray-900">Order Successful!</h1>
          <p className="text-gray-500 text-lg">Thank you for shopping with GlowBeauty BD. Your order #{id} has been placed successfully.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-left space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center">
              <Package className="h-5 w-5 mr-2 text-rose-500" />
              Order Details
            </h3>
            <button className="text-rose-500 text-xs font-bold flex items-center hover:underline" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-1" />
              Print Invoice
            </button>
          </div>
          <p className="text-sm text-gray-600">You will receive a confirmation email and SMS shortly with your order summary. Our customer representative will call you within 24 hours to confirm the shipping details.</p>
          <div className="p-4 bg-rose-50 rounded-xl">
            <h4 className="text-xs font-bold text-rose-800 mb-1">What happens next?</h4>
            <p className="text-xs text-rose-700">We are processing your order. Once it's shipped, you can track it in your account dashboard.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/account/orders" className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center justify-center">
            View My Orders
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Link to="/" className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
