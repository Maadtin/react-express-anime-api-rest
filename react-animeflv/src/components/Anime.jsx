import React from 'react'
import { NavLink } from 'react-router-dom'


const Anime = ({nombre, nombre_norm, poster, puntuacion, sinopsis}) => (
    <li>
        <NavLink to={`/${nombre_norm}`}>{nombre}</NavLink>
    </li>
)


export default Anime