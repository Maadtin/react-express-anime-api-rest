import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default class AnimeSingleView extends Component {


    componentDidMount() {
        axios.get(`/api/animes/${this.props.match.params.animeName}`)
            .then(res => {
                const { nombre, poster, sinopsis, puntuacion } = res.data
                this.setState({nombre, poster, sinopsis, puntuacion})
            })
            .catch(err => console.log(err))
    }

    constructor (props) {
        super(props)

        this.state = {
            nombre: '',
            poster: '',
            sinopsis: '',
            puntuacion: ''
        }
    }

    render () {
        const { nombre, poster, sinopsis, puntuacion } = this.state
        return (
            <div>
                <NavLink className="btn btn-primary btn-sm" to="/">Volver a lista</NavLink>
                <h2>{nombre}</h2>
                <p>{sinopsis}</p>
                <img src={poster}/>
                <span>{puntuacion}</span>
            </div>
        )
    }
}