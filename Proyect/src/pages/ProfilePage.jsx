import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import NavbarProfile from "../components/organismos/NavbarProfile";

function Profile() {
    const { user } = useAuth();
    // Guardo los datos del perfil del usuario
    const [userProfile, setUserProfile] = useState(null);
    // user nos está devolviendo el username único
    useEffect(() => {
        // Llamo a todos los datos del usuario del perfil
        axios.get(`http://localhost:80/Cassandra/api/profileUsername/${user['username']}`).then((res) => {
            setUserProfile(res.data);
        }).catch(err => {
            console.error("Error fetching user profile:", err);
        });
    }, [user]);
    
    return (
        <>
            <NavbarProfile userName={user.username} />
            <div className="w-full flex justify-center items-center flex-col gap-4 mt-10 mb-5 pt-7">
                <h1 className="text-7xl">Bienvenido 👋</h1>
                <h2 className="text-3xl">
                    {userProfile ? userProfile.username.toUpperCase() : "Cargando..."}
                </h2>
            </div>
        </>
    );
}

export default Profile;