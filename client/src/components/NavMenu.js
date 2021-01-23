import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


export default () => {
    const history = useHistory()
    const [activeItem, setActiveItem] = useState('/')

    useEffect(() => setActiveItem(history.location.pathname), []);

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
        history.replace(name)
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
                name='game'
                active={activeItem === 'game'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='leaderboard'
                active={activeItem === 'leaderboard'}
                onClick={handleItemClick}
            >
                Leaders Board
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={handleItemClick}
                />
            </Menu.Menu>
        </Menu>
    )
}