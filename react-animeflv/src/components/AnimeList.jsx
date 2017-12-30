import React from 'react'
import Anime from './Anime'
import Loader from './Loader'
import { CardGroup } from 'semantic-ui-react'
import axios from 'axios'

export default class AnimeList extends React.Component  {

   constructor (props) {
      super (props)

      this.state = {
         isLoading: false,
         animes: []
      }

   }

   componentDidMount() {
      axios.get('/api/animes')
          .then(res => this.setState({ animes: res.data }))
   }

   render () {
		const lista = this.state.animes.map(anime => (<Anime key={anime.id} {...anime} />));
		return (
			 <CardGroup textAlign="center">
				 {
					 this.state.isLoading
						  ? <Loader />
						  : lista
				 }
			 </CardGroup>
		)
   }
}
