import { useState } from "react";
import fondo from "/email.jpg";
import axios from "axios";
import Modal from "../moleculas/Modal";

function Email() {
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);


  const OnChangeEmail = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
  };
  const handleClick = (e) => {
    setOpenModal(true);
    e.preventDefaul;
    axios({
      method: "post",
      url: "http://localhost:2025/api/email",
      data: {
        name: "defualt",
        email,
      },
    }).then((response) => {
      if (response.status == 200) {
        setEmail("");
      } else {
        console.log("Error");
      }
    });
  };

  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center relative overflow-hidden text-white`}
      id="contact"
    >
      <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-4">
        ¿Quieres más información?
      </h1>
      <p className="text-3xl md:text-xl lg:text-2xl xl:text-3xl mb-4 text-center ">{`Ingresa tu email y nuestro equipo se encargará de 
            comunicarse contigo y brindarte más información`}</p>
      <input
        id="inputEmail"
        type="email"
        value={email}
        onChange={OnChangeEmail}
        className="mt-1 block w-1/3 px-3 py-2 text-black bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            mb-2
            "
      />
      <button
        onClick={handleClick}
        className="text-2xl bg-red-700 hover:bg-red-900 text-white rounded-xl p-2"
      >
        Enviar
      </button>
      <Modal open={openModal} text={"Nos pondremos en contacto contigo lo más pronto posible!"} dir={''}/>
      <img src={fondo} className="absolute w-full h-full object-cover -z-10" />
      <div className="absolute w-full h-full object-cover bg-black opacity-70 -z-10"></div>
    </div>
  );
}

export default Email;
