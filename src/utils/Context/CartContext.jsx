import React, { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if it exists
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handling item quantity
  const addToCart = (item) => {
    // Check if item already exists
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Item already exists, updates its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCart(updatedCart);
    } else {
      // Item doesn't exist in the cart
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
