import React from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../credentials';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export default function VerPerfil() {
    const contextUser = useContext(UserContext);
    const { user, setUser, profile, logged } = contextUser;
    const auth = getAuth(app);

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div className='verPerfil-container'>
            <h1>Ver Perfil</h1>
            <div className='verPerfil-info'>
                <img className="foto-perfil" alt="foto-perfil" src={"profile.profilePicture"} />
                <p>Nombre: {profile.name}</p>
                <p>Apellido: {profile.lastName}</p>
                <p>Email: {profile.email}</p>
                <p>Nombre de usuario: {profile.username}</p>
            </div>
            <Link to="/">
                <button className="cerrar-sesion" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </Link>

        </div>
    )
}
