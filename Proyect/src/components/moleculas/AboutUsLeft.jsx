import Image from '../atomos/Image';
import Imagender from '/imgder.png';
import Imagenizq from '/imgizq.png';

function AboutUsLeft() {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center space-y-4 sm:space-x-8 relative">

      <div className="w-full sm:w-1/2 md:w-1/4">
        <Image src={Imagender} alt="img derecha" className="w-full h-auto sm:max-w-xs" />
      </div>

      <div className="w-full sm:w-1/2 md:w-1/4">
        <Image src={Imagenizq} alt="img izquierda" className="w-full h-auto sm:max-w-xs" />
      </div>

    </div>
  );
}

export default AboutUsLeft;
