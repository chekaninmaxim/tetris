import React, { useState, useCallback } from 'react';
import { Form, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux'; 
import formInPopup from './formInPopup';
import { signUp } from '../../redux/actions'


const RegisterForm = ({ closePopup }) => {
    const dispatch = useDispatch();
    const loading = useSelector(({ looading }) => looading);
    const isLoggedIn = useSelector(({ isAuthenticated }) => isAuthenticated);
    const error = useSelector(({error}) => error);

    const [data, setData] = useState({
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const handleInput = ({ target }) => {
        setData(state => ({
            ...state,
            [target.name]: target.value
        }));
    }

    const handleSubmit = () => dispatch(signUp({ ...data }));
    
    if (loading) {
        return (
            <Loader size='huge' active />
        )
    } else if (isLoggedIn) {
       return ( <h1 > Wellcome! </h1>);
    } else {
        const {email, password, passwordConfirmation} = data;
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
                <Form.Input
                    placeholder='Confirm Password'
                    name='passwordConfirmation'
                    value={passwordConfirmation}
                    type='password'
                    onChange={handleInput}
                />
                { error }
                <Form.Button type='submit' content='Login' />
            </Form>
        )
    }
}

export default formInPopup(RegisterForm)