import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const cartStorageKey = (userId) => `food_app_cart_${userId}`;

export const CartProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const [cart, setCart] = useState([]);
  const skipNextPersistRef = useRef(false);

  useEffect(() => {
    if (loading) return;
    if (!user?.id) {
      setCart([]);
      return;
    }
    skipNextPersistRef.current = true;
    const raw = localStorage.getItem(cartStorageKey(user.id));
    setCart(raw ? JSON.parse(raw) : []);
  }, [user?.id, loading]);

  useEffect(() => {
    if (loading || !user?.id) return;
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }
    localStorage.setItem(cartStorageKey(user.id), JSON.stringify(cart));
  }, [cart, user?.id, loading]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const increaseQty = (index) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity: updated[index].quantity + 1 };
      return updated;
    });
  };

  const decreaseQty = (index) => {
    setCart((prev) => {
      const updated = [...prev];
      if (updated[index].quantity > 1) {
        updated[index] = { ...updated[index], quantity: updated[index].quantity - 1 };
      }
      return updated;
    });
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
