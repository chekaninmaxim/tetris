import React from 'react'
import Game from './game/Game'
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import '../App.css'
import NavMenu from './NavMenu'
import Home from './Home'
import LeaderBoard from './LeaderBoard'

const App = () => {
 
    return (
        <Router>
            <NavMenu />
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/game">
                <Game />
            </Route>
            <Route path="/leaderboard">
                <LeaderBoard />
            </Route>
            <Route path="/login">
                Hello world
            </Route>
            <Route path="/register">
                Hello world1
            </Route>
        </Router>
    )
}

export default App