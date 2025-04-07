import React, { useContext } from 'react'
import profileIcon from "../assets/profile-icon.png";
import "../styles/header.css"
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Header() {
  const contextUser = useContext(UserContext)
  const { user, setUser, profile, logged } = contextUser
  return (
    <header>
      <div className='navbar'>
        <Link to="/" className="logo-tempo" >
          <img alt="logo-tempo" src={"logo"} />
        </Link>
        <Link to="/novedades">
          <h3>Novedades</h3>
        </Link>
        <Link to="/generos">
          <h3>Géneros</h3>
        </Link>
        <Link to="/topGlobales">
          <h3>Top Globales</h3>
        </Link>
      </div>`
      {!logged ?
        <Link to="/logIn" className='perfil'>
          <img className="foto-perfil" alt="foto-perfil" src={profileIcon} />
          <p>Iniciar sesión</p>
        </Link> :
        <div>
          <Link to="/verPerfil" className='perfil'>
            <img className="foto-perfil" alt="foto-perfil" src={profile && profile.profilePicture ? (profile.profilePicture !== "" ? profile.profilePicture : profileIcon) : profileIcon} />
            <p>Ver Perfil: {profile.name}</p>
          </Link>
        </div>
      }
    </header>
  )
}
