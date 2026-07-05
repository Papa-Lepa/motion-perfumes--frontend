// frontend/src/CartContext.js
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { perfumeId, name, price, image, quantity }

  function addToCart(perfume) {
    setItems((prev) => {
      const existing = prev.find((i) => i.perfumeId === perfume.perfumeId);
      if (existing) {
        return prev.map((i) =>
          i.perfumeId === perfume.perfumeId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...perfume, quantity: 1 }];
    });
  }

  function removeFromCart(perfumeId) {
    setItems((prev) => prev.filter((i) => i.perfumeId !== perfumeId));
  }

  function updateQuantity(perfumeId, quantity) {
    if (quantity < 1) {
      removeFromCart(perfumeId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.perfumeId === perfumeId ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
