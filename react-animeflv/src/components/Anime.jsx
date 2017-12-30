import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'


const Anime = ({nombre, nombre_norm, poster, puntuacion, sinopsis}) => (
    <Card as={NavLink} to={`/${nombre_norm}`} color="violet">
        <Image src={poster} />
        <Card.Content>
            <Card.Header>
                {nombre}
            </Card.Header>
            <Card.Description>
                {sinopsis}
            </Card.Description>
        </Card.Content>
    </Card>
)


export default Anime