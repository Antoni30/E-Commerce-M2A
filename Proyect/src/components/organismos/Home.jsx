import TypeWriter from "../atomos/TypeWriter";
import home from "/home.jpg";

function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center relative overflow-hidden text-white w-full h-screen" id="home">
     <h1  className="text-9xl max-md:text-4xl md:text-5xl lg:text-6xl xl:text-9xl mb-4 font-bold">
        <TypeWriter text={"NO PAIN NO GAIN"} speed={100}/>
      </h1>
      <p className="text-3xl max-md:text-lg md:text-5xl lg:text-6xl xl:text-3xl mb-4 text-center shadow-2xl"> 
        Estamos aquí para ayudarte a alcanzar tus objetivos y mejorar tu calidad
        de vida.
        <br />
        Únete a nosotros y empieza un viaje hacia una versión más fuerte,
        saludable y feliz de ti mismo.
      </p>
      <button className="text-3xl bg-red-700 hover:bg-red-900 text-white rounded-xl p-3">
        Elige tu Plan
      </button>
      <img src={home} className="absolute w-full h-full object-cover -z-10" />
      <div className="w-full h-screen bg-black absolute opacity-60 -z-10"></div>
    </div>
  );
}

export default Home;
