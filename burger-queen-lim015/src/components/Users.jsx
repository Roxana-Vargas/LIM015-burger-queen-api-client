import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faUserEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Users = () => {

    const [datos, setDatos] = useState([]);
    
    /*Create a new user*/
    const [datosForm, setDatosForm] = useState({
        email: '',
        password: '',
        roles: ''
    })

    const handleInputChange = (event) => {
        setDatosForm({
            ...datosForm,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = 'https://bq-lim015.herokuapp.com/users';
        const token = localStorage.getItem('token')
        console.log(token);
        const config = {
            headers: { token: token }
        };
        axios.post(url, datosForm, config).then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        } )
    }
    useEffect(() => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    /* Get all users */
    const getUsers = () => {
        const url = 'https://bq-lim015.herokuapp.com/users';
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        axios.get(url, config).then((response) => {
            setDatos(response.data)
        })
    }
    useEffect(() => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    /*interfaz*/
    return (
        <section className='container-users'>
            <div className='createNewUser'><p>Create a new user</p></div>
                <div className='createUser'>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleInputChange}  type='text' placeholder='Email Adress'  name='email' className='input-createUser'></input>
                        <input onChange={handleInputChange}  type='password' placeholder='Password' name='password' className='input-createUser' autoComplete="on"></input>
                        <select onChange={handleInputChange} name="roles" className='select-css'>
                            <option>user</option>
                            <option>admin</option>
                        </select>
                        <input  type='submit' value='Create' className='btn-createUser'></input>
                    </form>
                </div>
                <div className='containerTable'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Roles</th>
                                <th>User Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {datos.map((user, i) => {
                            let roles = '';
                            if (user.roles[0] === '615a8dbbe99308986396e977' ) {
                                roles = 'admin';
                            } else {
                                roles = 'user';
                            }
                            return(
                                <tr key={i}>
                                <td>{roles}</td>
                                <td>{user.email}</td>
                                <td><button className='btn-update'><FontAwesomeIcon icon={faUserEdit} /></button></td>
                                <td><button className='btn-delete'><FontAwesomeIcon icon={faTrash} /></button></td>
                                </tr>
                            )
                        })}
                            
                            </tbody>
                    </table>
                </div>
        </section>
    )
}

export default Users;
