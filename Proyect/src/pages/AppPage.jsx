import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/CarrouselText";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import { BiCloset } from "react-icons/bi";
import { LiaShoePrintsSolid } from "react-icons/lia";
import { PiBaseballCap } from "react-icons/pi";
import { GiDelicatePerfume } from "react-icons/gi";
import { TbShoppingBagSearch } from "react-icons/tb";
import Cart from "../components/Cart";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoria, setCategoria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:2026/API/categorias');
        setCategoria(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las categorías');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Cargando categorías...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const toggleCart = () => {
    setShowCart(prev => !prev);
  };

  return (
    <div className="h-screen">
      <Carousel />
      <Navbar />

      {/* Botones para seleccionar categoría */}
      <div className="flex justify-center space-x-4 mt-4 absolute top-48 left-[35%]">
        <button
          onClick={() => handleCategoryChange(null)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Todas las Categorías
        </button>

        {categoria.length >= 1 && (
          <button
            onClick={() => handleCategoryChange(1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <div className="flex justify-center items-center gap-3">
              <strong>{categoria[0]["NOMBRE_CATEGORIA"]}</strong>
              <BiCloset />
            </div>
          </button>
        )}

        {categoria.length >= 2 && (
          <button
            onClick={() => handleCategoryChange(2)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <div className="flex justify-center items-center gap-3">
              <LiaShoePrintsSolid />
              <strong>{categoria[1]["NOMBRE_CATEGORIA"]}</strong>
            </div>
          </button>
        )}

        {categoria.length >= 3 && (
          <button
            onClick={() => handleCategoryChange(3)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <div className="flex justify-center items-center gap-3">
              <strong>{categoria[2]["NOMBRE_CATEGORIA"]}</strong>
              <PiBaseballCap />
            </div>
          </button>
        )}

        {categoria.length >= 4 && (
          <button
            onClick={() => handleCategoryChange(4)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <div className="flex justify-center items-center gap-3">
              <GiDelicatePerfume />
              <strong>{categoria[3]["NOMBRE_CATEGORIA"]}</strong>
            </div>
          </button>
        )}
      </div>
      {/* Lista de productos filtrada */}
      <ProductList selectedCategory={selectedCategory} />

      <button
        onClick={toggleCart}
        className="fixed bottom-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-950 text-5xl"
      >
        <TbShoppingBagSearch />
      </button>
      {/* Mostrar carrito si showCart es true */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  );
}

export default App;
