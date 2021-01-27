import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import AuthMenu from './auth/AuthMenu'


export default () => {
    const history = useHistory();
    const [activeItem, setActiveItem] = useState('/');

    console.log('nav menu ');
    useEffect( () => {
            setActiveItem(history.location.pathname)
        }, []
    );

    const handleItemClick = (e, { name }) => {
        const newRoute = name === 'logout' ? '/' : name;
        setActiveItem(name);
        history.replace(newRoute);
    }

    return (
        <Menu pointing secondary>
            <Menu.Item
                name='/'
                active={activeItem === '/'}
                onClick={handleItemClick}
            >
                Home
            </Menu.Item>
            <Menu.Item
                name='/game'
                active={activeItem === '/game'}
                onClick={handleItemClick}
            >
                Game
            </Menu.Item>
            <Menu.Item
                name='/leaderboard'
                active={activeItem === '/leaderboard'}
                onClick={handleItemClick}
            >
                Leaders Board
            </Menu.Item>

            <Menu.Menu position="right">
                <AuthMenu
                    setActiveItem={setActiveItem}
                    activeItem={activeItem}
                /> 
            </Menu.Menu>
        </Menu>
    )
}