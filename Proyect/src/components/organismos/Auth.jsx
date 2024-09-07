import { useState } from "react";
import LoginP from "../moleculas/Login";
import imgLogin from "/imgLogin.jpg";
import RegisterL from "../moleculas/Register";
function Auth() {
  const [register, setRegister] = useState(false);

  const Register = () => {
    setRegister(!register);
  };
  return (
    <div className="w-[56rem] h-[30rem]  flex rounded-3xl relative overflow-hidden">
      <LoginP registerF={Register} />
      <div
        className={`w-[28rem] h-[30rem] z-30 overflow-hidden relative transition ease-in-out duration-700 ${
          register ? "-translate-x-full" : null
        }`}
      >
        <img
          src={imgLogin}
          className="w-full h-full object-cover"
          alt="login"
        />
        <div className="w-[28rem] h-[30rem] bg-black absolute top-0 opacity-75"></div>
        <div
          className={`absolute top-8 text-white text-8xl text-center font-serif transition ${
            register
              ? "opacity-0 transition duration-1000"
              : " transition duration-1000"
          }`}
        >
          <h2>Eleva tu estilo</h2>
          <h2>compra</h2>
          <h2>ahora!!!!</h2>
        </div>
        <div
          className={`absolute top-14 text-white text-7xl text-center font-serif transition ${
            register ? "opacity-100 transition duration-1000" : "opacity-0 "
          }`}
        >
          <h2>Lo que te Propongas</h2>
          <h2>Consíguelo</h2>
          <h2>No te rindas</h2>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <RegisterL login={Register} />
      </div>
    </div>
  );
}

export default Auth;
