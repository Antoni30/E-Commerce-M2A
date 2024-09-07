import { Link } from "react-router-dom";

function Button({text,dir}) {
    return ( <div className="border m-auto hover:bg-red-600 cursor-pointer w-1/3 rounded-md text-white  bg-red-500">
        <Link to={dir} >{text}</Link>   
    </div> );
}

export default Button;