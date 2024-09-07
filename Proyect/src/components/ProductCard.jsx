import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden ">
      <img src={product.IMG} alt={product.NOMBRE_PRODUCTO} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.NOMBRE_PRODUCTO}</h2>
        <p className="text-blue-500 font-bold mt-4">$ {product.PRECIO_VENTA}</p>
        <div className="flex justify-between mt-4">
          {/* Botón de Ver detalles */}
          <Link  to={`/product/${product.ID_PRODUCTO}`}
            className="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 mr-2 flex justify-center items-center">
            Ver detalles
          </Link>

          {/* Botón de Añadir al carrito */}
          <CartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;