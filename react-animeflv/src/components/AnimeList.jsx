import React from 'react'
import Anime from './Anime'

const AnimeList = props => (
    <div className="card-deck">
        {
            props.animes.map(anime => (
                <Anime key={anime.id} {...anime} />
            ))
        }
    </div>
)


export default AnimeList