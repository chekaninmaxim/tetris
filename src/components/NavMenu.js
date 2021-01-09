import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


export default () => {
    const [activeItem, setActiveItem] = useState('home')
    const history = useHistory()

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
        history.replace(name === 'home' ? '/' : name)
    }

    return (
        <Menu pointing secondary>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
            />
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