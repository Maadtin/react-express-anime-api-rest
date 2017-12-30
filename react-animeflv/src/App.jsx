import React from 'react'
import axios from 'axios'
import Main from './components/Main'
import { Container } from 'semantic-ui-react'

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            animes: []
        }
    }


    componentDidMount() {
        axios.get('/api/animes')
            .then(res => this.setState({animes: res.data, isLoading: false} ))
    }

    render () {
        return (
                <Container>
                    <Main {...this.state} />
                </Container>
        )
    }

}