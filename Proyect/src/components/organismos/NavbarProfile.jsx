import { Link } from "react-router-dom";
import HeadProfile from "../moleculas/HeadProfile";
import logo from "/logo_white.png";

function NavbarProfile({ userName }) {
  return (
    <div className="flex justify-between bg-zinc-900 text-white p-2 fixed w-full top-0">
      <Link to={"/"} className="text-5xl">
        M2A
      </Link>
      <HeadProfile userName={userName.toUpperCase()} />
    </div>
  );
}

export default NavbarProfile;
