import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'
import Loader from './Loader'

export default class AnimeSingleView extends Component {

    constructor (props) {
        super(props)

        this.state = {
            isLoading: true,
            editMode: false,
            nombre: '',
            poster: '',
            sinopsis: '',
            puntuacion: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/animes/${this.props.match.params.animeName}`)
            .then(res => {
                const { nombre, poster, sinopsis, puntuacion } = res.data
                this.setState({nombre, poster, sinopsis, puntuacion, isLoading: false})
            })
            .catch(err => console.log(err))
    }

    handleOnEdit = () => {
    	this.setState({
         editMode: !this.state.editMode
      })
	 }

	 onSaveChange = () => {
       const sinopsis = this.newSinopsis.value
       this.setState({editMode: false})
       axios.put(`/api/animes/${this.state.nombre}`, { sinopsis })
           .then(res => {
              if (res.data.error) {
                 console.log(res.data.error)
              } else {
                 const { sinopsis } = res.data
                 this.setState({ sinopsis })
              }
           })
    }


   render () {
       const { nombre, poster, sinopsis, puntuacion, isLoading, editMode } = this.state

       const EditModeLayout = (
           <Form>
              <Form.Field>
                 <textarea ref={val => this.newSinopsis = val} placeholder="Sinopsis" defaultValue={sinopsis} />
              </Form.Field>
           </Form>
       )

       const Controls = (
          <Button.Group>
             <Button color={editMode ? 'red' : 'green'} onClick={this.handleOnEdit} >{editMode ? 'Cancelar' : 'Editar'}</Button>
             <Button as={NavLink} primary to="/">Volver a lista</Button>
             { editMode && <Button color="teal" onClick={this.onSaveChange}>Guardar cambios</Button> }
          </Button.Group>
       )

      return (
             isLoading ? <Loader /> :
              <div>
               {Controls}
               <h2>{nombre}</h2>
               { editMode ? EditModeLayout : <p>{sinopsis}</p> }
                <img src={poster} alt=""/>
               <span>{puntuacion}</span>
              </div>
           )
   }
}