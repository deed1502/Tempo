import React from 'react'
import profileIcon from "../assets/profile-icon.png";
import "../styles/header.css"
import { Link } from 'react-router-dom';



export default function Header() {
  return (
    <header>
      <div className='paginas'>
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
      </div>
      <div className='perfil'>
        <img className="foto-perfil" alt="foto-perfil" src={profileIcon} />
        <p>Iniciar sesión</p>
      </div>
    </header>
  )
}
