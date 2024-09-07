import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";


function HeadProfile({ userName }) {
  const { logout } = useAuth();
  const closeSession = () => {
    logout();
  };
  return (
    <div className="flex gap-5 m-2 items-center">
      <h1>{userName}</h1>
      <button
        onClick={closeSession}
        className="bg-red-700 text-white w-16 h-10 rounded-md"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
    </div>
  );
}

export default HeadProfile;
