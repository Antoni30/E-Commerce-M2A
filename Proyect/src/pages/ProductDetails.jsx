import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "../components/CarrouselText";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los detalles del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/Oracle/API/producto/${id}`
        );
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los detalles del producto");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Cargar los comentarios del producto
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/PostgreSQL/comments/getAllComments/${id}`
        );
        setComments(response.data);
      } catch (err) {
        console.error("Error al cargar los comentarios:", err);
        setError("Error al cargar los comentarios");
      }
    };

    fetchComments();
  }, [id]);

  if (loading) return <p>Cargando detalles del producto...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        <Carousel />
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto mt-11 p-4 flex flex-col items-center gap-6">
        {product && (
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={product.IMG}
              alt={product.NOMBRE_PRODUCTO}
              className="w-full md:w-1/2 h-auto rounded-lg shadow-md"
            />
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mt-4">
                {product.NOMBRE_PRODUCTO}
              </h2>
              <p className="text-gray-700 mt-2">
                {product.DESCRIPCION_PRODUCTO}
              </p>
              <p className="text-blue-600 font-bold text-xl mt-4">
                $ {product.PRECIO_VENTA}
              </p>
              <p className="text-red-600 font-bold text-xl mt-4">
                STOCK: {product.STOCK}
              </p>
            </div>
          </div>
        )}

        {/* Sección de comentarios */}
        <div className="mt-1/5 w-full">
          {" "}
          {/* Ajusta el margen superior aquí */}
          <h3 className="text-xl font-bold mb-4 text-center">Comentarios</h3>
          <div className="flex flex-col items-center">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id_comentario}
                  className="bg-gray-100 p-4 rounded-lg mb-4 w-full max-w-2xl"
                >
                  <p className="text-gray-800">{comment.comentario}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Fecha:{" "}
                    {new Date(comment.fecha_comentario).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Puntuación: {comment.puntuacion}
                  </p>
                </div>
              ))
            ) : (
              <p>No hay comentarios para este producto.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
