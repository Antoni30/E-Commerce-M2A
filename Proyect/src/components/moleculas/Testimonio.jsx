import Avatar from "../atomos/Avatar";
import Paragraph from "../atomos/Paragraph";

function Testimonio({ texto, dirImg, altImg, avatarName, plan }) {
  return (
    <div className="justify-center items-center 2xl:w-[1350px] lg:w-[950px]  sm:w-[720px] max-sm:scale-50 max-sm:w-[250px] gap-11 flex flex-col m-3">
      <Paragraph texto={texto} styles={"text-xl italic "} />
      <div className="flex flex-col items-center justify-center ">
        <Avatar dirImg={dirImg} altImg={altImg} avatarName={avatarName} />
        <strong>Plan: {plan}</strong>
      </div>
    </div>
  );
}

export default Testimonio;