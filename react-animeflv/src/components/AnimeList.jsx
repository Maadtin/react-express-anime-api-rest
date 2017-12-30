import React from 'react'
import Anime from './Anime'
import Loader from './Loader'
import { CardGroup } from 'semantic-ui-react'

const AnimeList = ({isLoading, animes}) => {
    const lista = animes.map(anime => (<Anime key={anime.id} {...anime} />));
    return (
            <CardGroup textAlign="center">
                {
                    isLoading
                        ? <Loader />
                        : lista
                }
            </CardGroup>
    )
}


export default AnimeList