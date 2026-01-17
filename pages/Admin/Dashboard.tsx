
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, ShoppingCart, Users, Package, TrendingUp, DollarSign, ArrowUpRight, Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { useStore } from '../../store/StoreContext';
import { Product, StockStatus } from '../../types';

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
  const { orders, products, addProduct, updateProduct, deleteProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders'>('analytics');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const stats = [
    { label: 'Total Revenue', value: '৳48,500', icon: <DollarSign />, color: 'bg-emerald-500', trend: '+12.5%' },
    { label: 'Total Orders', value: orders.length.toString(), icon: <ShoppingCart />, color: 'bg-rose-500', trend: '+5.2%' },
    { label: 'New Customers', value: '124', icon: <Users />, color: 'bg-indigo-500', trend: '+18.7%' },
    { label: 'Active Products', value: products.length.toString(), icon: <Package />, color: 'bg-orange-500', trend: '0%' },
  ];

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData: any = {
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get('name'),
      brand: formData.get('brand'),
      price: Number(formData.get('price')),
      salePrice: Number(formData.get('salePrice')) || undefined,
      category: formData.get('category'),
      stockCount: Number(formData.get('stockCount')),
      stockStatus: StockStatus.IN_STOCK,
      images: [formData.get('image') || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be'],
      sku: formData.get('sku'),
      shortDescription: formData.get('shortDescription'),
      description: formData.get('description'),
      variations: [],
      specifications: {},
      rating: 5,
      reviews: [],
      isFeatured: true
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-r border-gray-100 p-6 space-y-8">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4">Menu</p>
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-rose-50 text-rose-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
              <LayoutDashboard className="h-5 w-5" />
              <span>Analytics</span>
            </button>
            <button onClick={() => setActiveTab('products')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-rose-50 text-rose-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
              <Package className="h-5 w-5" />
              <span>Products</span>
            </button>
            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-rose-50 text-rose-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
              <ShoppingCart className="h-5 w-5" />
              <span>Orders</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
                <p className="text-gray-500">Overview of your beauty business performance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                      <h3 className="text-3xl font-bold">{stat.value}</h3>
                      <p className="text-xs text-emerald-500 font-bold flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" /> {stat.trend}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl text-white`}>
                      {React.cloneElement(stat.icon as React.ReactElement<any>, { className: 'h-6 w-6' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
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
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="sales" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-serif font-bold">Product Management</h1>
              <button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center hover:bg-rose-600 transition-colors">
                <Plus className="h-5 w-5 mr-2" /> Add Product
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img src={product.images[0]} className="h-10 w-10 rounded-lg object-cover" alt="" />
                          <div>
                            <p className="font-bold text-sm text-gray-900 line-clamp-1">{product.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category}</td>
                      <td className="px-6 py-4 text-sm font-bold">৳{product.salePrice || product.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${product.stockCount > 10 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                          {product.stockCount} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => { setEditingProduct(product); setIsModalOpen(true); }} className="p-2 text-gray-400 hover:text-indigo-500 transition-colors"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => deleteProduct(product.id)} className="p-2 text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold">Order Management</h1>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">No orders to display yet.</p>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="h-6 w-6" /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                  <input name="name" defaultValue={editingProduct?.name} required className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-rose-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Brand</label>
                  <input name="brand" defaultValue={editingProduct?.brand} required className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-rose-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Regular Price (৳)</label>
                  <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-rose-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Sale Price (Optional)</label>
                  <input name="salePrice" type="number" defaultValue={editingProduct?.salePrice} className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-rose-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                  <select name="category" defaultValue={editingProduct?.category} className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-rose-200">
                    <option value="skincare">Skincare</option>
                    <option value="makeup">Makeup</option>
                    <option value="haircare">Haircare</option>
                    <option value="fragrance">Fragrance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Stock Count</label>
                  <input name="stockCount" type="number" defaultValue={editingProduct?.stockCount} required className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-rose-200" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                <input name="image" defaultValue={editingProduct?.images[0]} className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-rose-200" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Short Description</label>
                <textarea name="shortDescription" defaultValue={editingProduct?.shortDescription} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-rose-200" />
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition-colors">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
