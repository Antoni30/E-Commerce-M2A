import React from 'react';
import { useCart } from '../CartContext';
import { LuShoppingBasket } from "react-icons/lu";

const CartButton = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex justify-center items-center text-3xl"
    >
      <LuShoppingBasket />
    </button>
  );
};

export default CartButton;
