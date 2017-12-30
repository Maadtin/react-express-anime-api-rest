import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ErrorPage from "./ErrorPage";
import AnimeSingleView from "./AnimeSingleView";
import AnimeList from './AnimeList'

const Main = props => (
    <Switch>
        <Route exact path="/" component={() => <AnimeList {...props} />} />
        <Route path="/:animeName" component={AnimeSingleView}  />
        <Route component={ErrorPage} />
    </Switch>
)

export default Main