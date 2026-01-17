
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { LayoutDashboard, ShoppingCart, Users, Package, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../store/StoreContext';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 6390 },
  { name: 'Sun', sales: 7490 },
];

const AdminDashboard: React.FC = () => {
  const { orders } = useStore();

  const stats = [
    { label: 'Total Revenue', value: '৳48,500', icon: <DollarSign />, color: 'bg-emerald-500', trend: '+12.5%' },
    { label: 'Total Orders', value: orders.length.toString(), icon: <ShoppingCart />, color: 'bg-rose-500', trend: '+5.2%' },
    { label: 'New Customers', value: '124', icon: <Users />, color: 'bg-indigo-500', trend: '+18.7%' },
    { label: 'Active Products', value: '86', icon: <Package />, color: 'bg-orange-500', trend: '0%' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <button className="bg-gray-900 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className="relative z-10 flex justify-between">
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <div className="flex items-center text-xs font-bold text-emerald-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.trend}
                </div>
              </div>
              <div className={`${stat.color} text-white p-4 rounded-2xl`}>
                {/* Fix: Cast icon to ReactElement with any props to allow className assignment */}
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: 'h-6 w-6' })}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-gray-50 rounded-full group-hover:scale-150 transition-transform" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-serif font-bold mb-8">Weekly Sales Analytics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#f43f5e', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-serif font-bold">Recent Orders</h3>
          <div className="space-y-6">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex justify-between items-center group cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 font-bold text-xs">
                    #{order.id.slice(-2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">৳{order.total}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{order.shippingAddress.city}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                  {order.status}
                </span>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-10">No orders yet.</p>
            )}
          </div>
          <button className="w-full text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors pt-4 border-t border-gray-50">View All Orders</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
