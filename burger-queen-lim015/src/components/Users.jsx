import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faUserEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import logo from '../images/logo-bq.png';
import Navigation from './Navigation';

const Users = () => {

    const [datos, setDatos] = useState([]);
    
    /* ------------------------------------- CREATE A NEW USER -----------------------------------------------*/
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
        axios.post(url, datosForm, config).then(() => {
            toast.success('User created!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch((error) => {
            let errorMessage = '';
            if (error.response.status === 400) {
                errorMessage = 'You must fill all the fields'
            }
            if (error.response.data.message === 'Email format is invalid') {
                errorMessage = 'The email format is invalid'
            }
            if (error.response.data.message === 'user already exists') {
                errorMessage = 'User already exists'
            }
            if (error.response.data.message === 'Password format is invalid') {
                errorMessage = 'The password format is invalid'
            }
            toast.error(`${errorMessage}`, {
                position: 'bottom-center',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } )
    }
    useEffect(() => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    /* --------------------------------------------------- GET ALL USERS ------------------------------------------------- */
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
    
    /*---------------------------------------------------------- UPDATE USER --------------------------------------------------------*/

    const [isOpenModal, setIsOpenModal] = useState(false)

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    const selectUser = (user) => {
        setDatosForm({
        email: user.email,
        password: user.password,
        /*roles: user.roles*/
        })
    }

    const [datosUpdate, setDatosUpdate] = useState({
        email: '',
        password: '',
        roles: ''
    })

    const handleInputChangeUpdate = (event) => {
        setDatosUpdate({
            ...datosUpdate,
            [event.target.name] : event.target.value
        })
        console.log(datosUpdate);
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        const url = `https://bq-lim015.herokuapp.com/users/${datosForm.email}`;
        const token = localStorage.getItem('token')
        console.log(token);
        const config = {
            headers: { token: token }
        };
        axios.put(url, datosUpdate, config).then((response) => {
            closeModal();
            toast.success('User updated!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch((error) => {
            console.log(error);
            let errorMessage = '';
            if (error.response.status === 400) {
                errorMessage = "You didn't enter information to update"
            }
            closeModal();
            toast.error(`${errorMessage}`, {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } )
    }

    /* ------------------------------------------------------------- DELETE USER ---------------------------------------------------- */
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

    const openModalDelete = () => {
        setIsOpenModalDelete(true);
    }

    const closeModalDelete = () => {
        setIsOpenModalDelete(false);
    }
    
    const handleDelete = () => {
        const url = `https://bq-lim015.herokuapp.com/users/${datosForm.email}`;
        const token = localStorage.getItem('token')
        console.log(token);
        const config = {
            headers: { token: token }
        };
        axios.delete(url, config).then((response) => {
            console.log(response);
            closeModalDelete();
            toast.success('User has been deleted!', {
                position: "bottom-center",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch((error) => {
            console.info(error);
        } )
    }

    /* -------------------------------------------------------------- INTERFAZ ---------------------------------------------------- */

    return (
        <><Navigation />
        <section className='container-users'>
            <div className='createNewUser'><p>Create a new user</p></div>
            <div className='createUser'>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleInputChange} type='text' placeholder='Email Adress' name='email' className='input-createUser'></input>
                    <input onChange={handleInputChange} type='password' placeholder='Password' name='password' className='input-createUser' autoComplete="on"></input>
                    <select onChange={handleInputChange} name="roles" className='select-css'>
                        <option>user</option>
                        <option>admin</option>
                    </select>
                    <input type='submit' value='Create' className='btn-createUser'></input>
                </form>
            </div>
            <ToastContainer />

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
                            if (user.roles[0] === '615a8dbbe99308986396e977') {
                                roles = 'admin';
                            } else {
                                roles = 'user';
                            }
                            return (
                                <tr key={i}>
                                    <td>{roles}</td>
                                    <td>{user.email}</td>
                                    <td><button onClick={() => { openModal(); selectUser(user); } } className='btn-update'><FontAwesomeIcon icon={faUserEdit} /></button></td>
                                    <td><button onClick={() => { openModalDelete(); selectUser(user); } } className='btn-delete'><FontAwesomeIcon icon={faTrash} /></button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {isOpenModal &&
                <div className='modal'>
                    <div className='modalContenido'>
                        <img src={logo} className='logoModal' alt='logo' />
                        <p>Update user</p>
                        <form onSubmit={(evt) => handleSubmitUpdate(evt)}>
                            <input onChange={handleInputChangeUpdate} defaultValue={datosForm.email} type='text' placeholder='Email Adress' name='email' className='input-updateUser' autoComplete="username"></input>
                            <input onChange={handleInputChangeUpdate} defaultValue={datosForm.password} type='password' placeholder='Password' name='password' className='input-updateUser' autoComplete="current-password"></input>
                            <select onChange={handleInputChangeUpdate} name="roles" className='select-updateUser'>
                                <option value='615a8dbbe99308986396e976'>user</option>
                                <option value='615a8dbbe99308986396e977'>admin</option>
                            </select>
                            <input type='submit' value='Update' className='btn-updateUser'></input>
                            <button className='btn-updateCancel' onClick={closeModal}>Close</button>
                        </form>
                    </div>
                </div>}
            {isOpenModalDelete &&
                <div className='modalDelete'>
                    <div className='modalContentDelete'>
                        <img src={logo} className='logoModal' alt='logo' />
                        <p>Are you sure you want to delete this user?</p>
                        <div className='btns-delete'>
                            <button onClick={handleDelete} className='btn-deleteUser'>Delete</button>
                            <button className='btn-deleteCancel' onClick={closeModalDelete}>Close</button>
                        </div>
                    </div>
                </div>}
        </section></>
    )
}

export default Users;
