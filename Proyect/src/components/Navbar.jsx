import React from "react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-gray-800 absolute w-full h-14 flex top-36">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logotipo */}
        <a href="/" className="text-white text-2xl font-bold">
          M2A
        </a>

        {/* Links de navegación */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-300 hover:text-white">
            Home
          </a>
          
        </div>

        {/* Botón de Iniciar Sesión */}
        <div className="hidden md:block text-white text-[40px] font-semibold cursor-pointer">
          <Link to={"/login"}>
            <RxAvatar />
          </Link>
        </div>

        {/* Menú móvil */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
