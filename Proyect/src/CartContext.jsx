import React, { createContext, useState, useContext } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Crear un hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.ID_PRODUCTO === product.ID_PRODUCTO);
      if (exists) {
        return prevCart.map(item =>
          item.ID_PRODUCTO === product.ID_PRODUCTO
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.ID_PRODUCTO !== productId));
  };

  // Función para obtener el total del carrito
  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.PRECIO_VENTA * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
