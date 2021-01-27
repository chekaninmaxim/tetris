import React, {useState} from 'react';
import {Form} from 'semantic-ui-react';
import formInPopup from './formInPopup';


const LoginForm = ({closePopup}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlers = {
        email: setEmail,
        password: setPassword
    }
    const handleInput = ({target}) => {
        handlers[target.name](target.value)
    }

    const handleSubmit = () => setTimeout(() => {
        closePopup();
    }, 2000);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Input
                placeholder='Email'
                name='email'
                value={email}
                type={'email'}
                onChange={handleInput}
            />
            <Form.Input
                placeholder='Password'
                name='password'
                value={password}
                type='password'
                onChange={handleInput}
            />
            <Form.Button type='submit' content='Log In' />
        </Form>
    )
}

export default formInPopup(LoginForm)