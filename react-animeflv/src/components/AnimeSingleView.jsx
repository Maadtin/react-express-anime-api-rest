import React, {Component, Fragment} from 'react'
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

    triggerEditMode = () => {
    	this.setState({
         editMode: !this.state.editMode
      })
	 }

	 onSubmit = () => {
       // if (sinopsis !== this.state.sinopsis) {
			//  axios.put(`/api/animes/${this.state.nombre}`, { sinopsis })
			// 	  .then(res => {
			// 		  if (res.data.error) {
			// 			  console.log(res.data.error)
			// 		  } else {
			// 			  const { sinopsis } = res.data
			// 			  this.setState({ sinopsis, editMode: false })
			// 		  }
			// 	  })
       // } else {
       //    this.setState({editMode: false})
       // }
    }

    handleOnPosterChange = e => {
       const { poster } = this.state
       console.log(poster)
       e.target.previousElementSibling.src = e.target.value
    }


   render () {
       const { nombre, poster, sinopsis, puntuacion, isLoading, editMode } = this.state

       const EditModeLayout = (
           <Form loading={isLoading} onSubmit={this.onSubmit}>
              <Form.Field>
					  <input type="text" defaultValue={nombre} ref={val => this.nombre = val}/>
              </Form.Field>
              <Form.Field>
                 <textarea ref={val => this.sinopsis = val} placeholder="Sinopsis" defaultValue={sinopsis} />
              </Form.Field>
              <Form.Field>
					  <img src={poster} alt={`Info sobre ${poster}`}/>
					  <input onChange={this.handleOnPosterChange} type="text" defaultValue={poster}/>
              </Form.Field>
              <Form.Field>
					  <input type="number" ref={val => this.puntuacion = val} defaultValue={puntuacion} />
              </Form.Field>
              <Form.Field>
                 <Button color="teal" type="submit">Guardar cambios</Button>
              </Form.Field>
           </Form>
       )

       const NormalModeLayout = (
           <Fragment>
				  <h2>{nombre}</h2>
				  <p>{sinopsis}</p>
				  <img src={poster} alt={`Imagen de ${nombre}`} />
				  <span>{puntuacion}</span>
           </Fragment>
       )

       const Controls = (
          <Button.Group>
             <Button color={editMode ? 'red' : 'green'} onClick={this.triggerEditMode} >{editMode ? 'Cancelar' : 'Editar'}</Button>
             <Button as={NavLink} primary to="/">Volver a lista</Button>
          </Button.Group>
       )

      return (
             isLoading ? <Loader /> :
              <div>
              {Controls}
              { editMode ? EditModeLayout : NormalModeLayout }
              </div>
           )
   }
}