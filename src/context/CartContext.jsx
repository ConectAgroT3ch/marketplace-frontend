import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("marketplace_carrinho")) || [];
    setCartItems(storedCart);
  }, []);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, newItem];
      localStorage.setItem("marketplace_carrinho", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item._id !== itemId);
      localStorage.setItem("marketplace_carrinho", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("marketplace_carrinho");
  };

  const cartQuantity = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);