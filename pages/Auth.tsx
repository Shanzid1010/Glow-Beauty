
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/StoreContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleDemoLogin = (role: 'user' | 'admin') => {
    const demoUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'admin' ? 'System Administrator' : 'John Doe',
      email: role === 'admin' ? 'admin@glowbeauty.com' : 'user@example.com',
      role: role,
      addresses: [],
      wishlist: []
    };
    setUser(demoUser);
    navigate(role === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-serif font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-gray-500">{isLogin ? 'Login to your beauty account' : 'Join our beauty community today'}</p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-rose-200" />
            </div>
          </div>

          <button className="w-full bg-rose-600 text-white py-4 rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">For Testing Purposes</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => handleDemoLogin('user')} className="flex flex-col items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-xs font-bold">Demo User</span>
            </button>
            <button onClick={() => handleDemoLogin('admin')} className="flex flex-col items-center p-3 bg-gray-900 text-white rounded-xl hover:bg-rose-600 transition-colors">
              <ShieldCheck className="h-4 w-4 mb-1" />
              <span className="text-xs font-bold">Demo Admin</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="ml-1 text-rose-500 font-bold hover:underline">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
