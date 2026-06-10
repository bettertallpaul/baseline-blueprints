import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  hash: string;
  productId: string;
  name: string;
  image: string;
  size: string;
  sizeId: string;
  material: string;
  materialId: string;
  addons: { id: string; name: string; price: number }[];
  price: number; // Price for a single configured item
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'hash'>) => void;
  removeFromCart: (hash: string) => void;
  updateQuantity: (hash: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const generateCartHash = (productId: string, sizeId: string, materialId: string, addonIds: string[]) => {
  const sortedAddons = [...addonIds].sort().join(',');
  return `${productId}-${sizeId}-${materialId}-[${sortedAddons}]`;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('baseline_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('baseline_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'hash'>) => {
    const addonIds = item.addons.map(a => a.id);
    const hash = generateCartHash(item.productId, item.sizeId, item.materialId, addonIds);

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.hash === hash);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prevItems, { ...item, hash }];
    });
    setIsCartOpen(true); // Open drawer automatically on add
  };

  const removeFromCart = (hash: string) => {
    setCartItems(prev => prev.filter(i => i.hash !== hash));
  };

  const updateQuantity = (hash: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(hash);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.hash === hash ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
