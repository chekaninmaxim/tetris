import React, {useState} from 'react'
import Game from './game/Game'
import '../App.css'
import NavMenu from './NavMenu'

const App = () => {
    const [visible, setVisible] = useState(false) 
 
    return (
        <>
            <NavMenu/>
            <Game />
        </>
    )
}

export default App