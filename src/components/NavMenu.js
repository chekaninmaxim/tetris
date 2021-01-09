import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'


export default () => {
    const [activeItem, setActiveItem] = useState('game')

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    return (
        <Menu pointing secondary>
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