import React from 'react';
import { useCart } from '../CartContext';
import { IoCloseCircleOutline } from "react-icons/io5";

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, getTotal } = useCart();

  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4">
      <button onClick={onClose} className="absolute top-2 right-2 text-red-500">
        <IoCloseCircleOutline size={24} />
      </button>
      <h2 className="text-xl font-bold mb-4">Carrito</h2>
      <ul>
        {cart.map(item => (
          <li key={item.ID_PRODUCTO} className="flex justify-between items-center mb-2">
            <button onClick={() => removeFromCart(item.ID_PRODUCTO)} className="text-red-500">
              <IoCloseCircleOutline />
            </button>
            <span>{item.NOMBRE_PRODUCTO} ({item.quantity})</span>
            <span>${item.PRECIO_VENTA * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-bold">
        Total: ${getTotal()}
      </div>

    </div>
  );
};

export default Cart;
