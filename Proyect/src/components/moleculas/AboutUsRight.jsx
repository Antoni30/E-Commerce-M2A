import AboutUsH1 from "../atomos/AboutUsH1";
import Paragraph from "../atomos/Paragraph";

function AboutUsRight() {
  return (
    <div className="text-center mx-4 md:mx-8 lg:mx-16 xl:mx-20 2xl:mx-32">
      <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4">
        <AboutUsH1 />
      </div>

      <div className="mb-4">
        <Paragraph
          styles="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl italic text-justify"
          texto="En GYM R.A.T, nos enorgullece ser más que un gimnasio; somos una comunidad comprometida con la excelencia en el fitness y el bienestar. Nuestras instalaciones de última generación ofrecen un entorno propicio para el crecimiento personal, respaldado por entrenadores altamente calificados y programas personalizados que se adaptan a tus metas individuales."
        />
      </div>
    </div>
  );
}

export default AboutUsRight;