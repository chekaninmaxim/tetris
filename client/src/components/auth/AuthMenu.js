import React, { useState } from 'react'
import { Menu, Popup } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default () => {
    const [activeItem, setActiveItem] = useState('')

    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

    const onAuthButtonClick = (e, { name }) => setActiveItem(name)

    const RegisterButton = (
        <Menu.Item
            name='register'
            active={activeItem == 'register'}
            onClick={onAuthButtonClick}
        >
            Register
        </Menu.Item> 
    );

    const onLogOut = () => console.log('log out');

    const LogInButton = (
        <Menu.Item
            name='login'
            active={activeItem == 'login'}
            onClick={onAuthButtonClick}
        >
            Log in
        </Menu.Item>
    );

    return (
        isAuthenticated ? <Menu.Item
            name='logout'
            onClick={onLogOut}
        /> : <>
            <LoginForm trigger={LogInButton} onClose={() => { console.log("are you happened"); setActiveItem('') }} />
            <RegisterForm trigger={RegisterButton} onClose={() => {console.log("are you happened"); setActiveItem('')}} />
        </>
    )
}