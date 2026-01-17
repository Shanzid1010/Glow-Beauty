
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, User, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variations: Record<string, string>) => void;
  updateCartQuantity: (productId: string, variations: Record<string, string>, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  setUser: (user: User | null) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUserState] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.productId === newItem.productId && 
        JSON.stringify(item.selectedVariations) === JSON.stringify(newItem.selectedVariations)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId: string, variations: Record<string, string>) => {
    setCart(prev => prev.filter(item => 
      !(item.productId === productId && JSON.stringify(item.selectedVariations) === JSON.stringify(variations))
    ));
  };

  const updateCartQuantity = (productId: string, variations: Record<string, string>, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.productId === productId && JSON.stringify(item.selectedVariations) === JSON.stringify(variations)) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const setUser = (newUser: User | null) => setUserState(newUser);
  const clearCart = () => setCart([]);
  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

  const addProduct = (p: Product) => setProducts(prev => [p, ...prev]);
  const updateProduct = (p: Product) => setProducts(prev => prev.map(item => item.id === p.id ? p : item));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <StoreContext.Provider value={{ 
      products,
      cart, 
      wishlist, 
      user, 
      orders,
      addToCart, 
      removeFromCart, 
      updateCartQuantity,
      toggleWishlist, 
      setUser,
      clearCart,
      addOrder,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
