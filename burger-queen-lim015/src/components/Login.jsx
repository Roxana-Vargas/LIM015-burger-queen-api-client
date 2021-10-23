import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jwt-decode';

const Login = () => {
    const [datos, setDatos] = useState({
        email: '',
        password: ''
    })
    
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }
    
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = 'https://bq-lim015.herokuapp.com/auth';
        axios.post(url, datos)
        .then((response) => {
            const token = response.data.token;
            const user = jwt(token);
            const userId = user.id;
            localStorage.setItem('userId', userId)
            if (response.status === 200) {
                localStorage.setItem('token', token)
                history.push('/users')
            }
        }).catch((error) => {
            let errorMessage = '';
            if (error.response.status === 400) {
                errorMessage = 'You must fill all the fields'
            }
            if (error.response.status === 401) {
                errorMessage = 'Password is incorrect'
            }
            if (error.response.status === 404) {
                errorMessage = "User doesn't exist"
            }
            toast.error(`${errorMessage}`, {
                position: 'bottom-center',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } )
        
    }

    return (
        <section className='container-welcome'>
            <div className='welcome'>
                <p>Welcome!</p>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleInputChange} type='text' placeholder='Email Adress'  name='email' className='input-login' autoComplete="username" ></input>
                    <input onChange={handleInputChange} type='password' placeholder='Password' name='password' className='input-login' autoComplete="current-password"></input>
                    <input  type='submit' value='Login' className='btn-login'></input>  
                </form>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Login;