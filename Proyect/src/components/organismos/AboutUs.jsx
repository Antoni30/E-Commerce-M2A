import AboutUsLeft from '../moleculas/AboutUsLeft';
import AboutUsRight from '../moleculas/AboutUsRight';

function AboutUs() {
  return (
    <div className="flex justify-between items-center bg-[#bcfcfc] p-3" id='about'>

      <div className="flex-1">
        <AboutUsLeft />
      </div>

      <div className="flex-1">
        <AboutUsRight />
      </div>     
      
    </div>
  );
}

export default AboutUs;
