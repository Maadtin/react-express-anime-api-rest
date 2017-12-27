import React from 'react'
import axios from 'axios'
import AnimeList from './components/AnimeList'
import { Route, Switch } from 'react-router-dom'
import AnimeSingleView from './components/AnimeSingleView'
import ErrorPage from './components/ErrorPage'


export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            animes: []
        }
    }


    componentDidMount() {
        axios.get('/api/animes')
            .then(res => this.setState({animes: res.data}))
    }

    render () {
        return (
            <div className="container mt-5">
                <div className="row">
                    <Switch>
                        <Route exact path="/" component={() => <AnimeList animes={this.state.animes} />} />
                        <Route path="/:animeName" component={AnimeSingleView}  />
                        <Route component={ErrorPage} />
                    </Switch>
                </div>
            </div>
        )
    }

}