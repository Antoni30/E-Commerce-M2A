import Button from "./Button";

function CardPlanes({ texto, arregloPlan, precio,dir}) {
  return (
    <div className="flex flex-col w-1/3 gap-3 max-md:w-screen">
      <div className="bg-[#dcdcdc] p-1 rounded-md text-center h-11">
        <h2 className="text-black text-base md:text-lg font-bold">{texto}</h2>
      </div>

      <div className="bg-[#dcdcdc] p-1 rounded-md text-center">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">
          <span className="border-b-2 border-black">PLANES</span>
        </h1>

        <div className="border border-red-500 w-36 h-36 flex items-center justify-center rounded-full text-white bg-red-600 m-auto text-6xl">
          ${precio}
        </div>

        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">
          <span className="border-b-2 border-black">BENEFICIOS</span>
        </h1>

        <ul>
          {arregloPlan.map((element, index) => {
            return <li key={index}>{element}</li>;
          })}
        </ul>
        <Button dir={dir} text={"COMPRAR"} />
      </div>
    </div>
  );
}

export default CardPlanes;
