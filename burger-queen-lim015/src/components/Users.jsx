import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faUserEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Users = () => {

    const [datos, setDatos] = useState([]);

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
    
    return (
        <section className='container-users'>
            <div className='createNewUser'><p>Create a new user</p></div>
                <div className='createUser'>
                    <form>
                        <input  type='text' placeholder='Email Adress'  name='emailUser' className='input-createUser'></input>
                        <input  type='password' placeholder='Password' name='passwordUser' className='input-createUser'></input>
                        <select name="Roles" className='select-css'>
                            <option>Roles</option>
                            <option>Waiter</option>
                            <option>Admin</option>
                            <option>Cheff</option>
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
                        {datos.map((user) => {
                            let roles = '';
                            if (user.roles[0] === '615a8dbbe99308986396e977' ) {
                                roles = 'admin';
                            } else {
                                roles = 'user';
                            }
                            return(
                                <tr>
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
