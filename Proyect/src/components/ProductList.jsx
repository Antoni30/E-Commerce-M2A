import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from './ProductCard';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Si hay una categoría seleccionada, agregamos un query param para filtrarla
        const response = await axios.get(
          `http://localhost:80/Oracle/API/productos${selectedCategory ? `?categoria=${selectedCategory}` : ''}`
        );
        setProducts(response.data.data); // Ajusta según la estructura de respuesta de tu API
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Se vuelve a ejecutar cuando cambia selectedCategory

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 absolute w-full top-60 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.ID_PRODUCTO} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
