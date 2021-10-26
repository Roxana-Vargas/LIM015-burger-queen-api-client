import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Profile = () => {

  /* ---------------------------------------------------------GET USER BY ID ---------------------------------------------------- */

  const [dataUser, setDataUser] = useState({
    email: '',
    password: '',
    roles: ''
  })

  const getUser = () => {
    const idUser = localStorage.getItem('userId');
    const url = `https://bq-lim015.herokuapp.com/users/${idUser}`;
    const token = localStorage.getItem('token')
    const config = {
      headers: { token: token }
    };
    axios.get(url, config).then((response) => {
      setDataUser(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getUser();
  }, [])

  /* ------------------------------------------------------UPDATE PROFILE ---------------------------------------------------- */

  const [isReadonly, setIsReadonly] = useState(true);

  const [isBtnSave, setIsBtnSave] = useState(false);

  const editUser = () => {
    setIsBtnSave(true)
    setIsReadonly(!isReadonly)
  }

  const saveChanges = () => {
    setIsBtnSave(false)
    setIsReadonly(!isReadonly)
  }

  const [datosUpdate, setDatosUpdate] = useState({
  })

  const handleInputChange = (event) => {
    setDatosUpdate({
        ...datosUpdate,
        [event.target.name] : event.target.value
    })
    
  }

  console.log(datosUpdate);

  const updateUser = () => {
    const idUser = localStorage.getItem('userId');
    const url = `https://bq-lim015.herokuapp.com/users/${idUser}`;
    const token = localStorage.getItem('token')
    const config = {
        headers: { token: token }
    };
    axios.put(url, datosUpdate, config).then(() => {
      toast.success('Your profile has been updated!', {
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
      let errorMessage = '';
      if (error.response.status === 400) {
        errorMessage = "You didn't enter information to update"
      }
      toast.error(`${errorMessage}`, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      })
  }

  return (
    <div>
      <p className='myProfile'>My profile</p>
      <div className='containerProfile'>
        <div className='infoUser'>
          <form>
            <p className='infoProfile'> Email: <span><input onChange={handleInputChange} defaultValue={dataUser.email} className='inputProfile' readOnly={isReadonly} type='text'  name='email'  autoComplete="username" ></input></span></p>
            <p className='infoProfile'>Password: <span><input onChange={handleInputChange} defaultValue={dataUser.password} className='inputProfile' readOnly={isReadonly}type='password'  name='password'  autoComplete="current-password"></input></span></p>
            <p className='infoProfile'>Roles: <span><input value={dataUser.roles[0] === '615a8dbbe99308986396e976' ? 'user' : 'admin'} className='inputProfile' readOnly type="text" /></span></p>
          </form>
          <div className='btnsUpdateUser'>
          {isBtnSave &&  <button onClick={() => {saveChanges(); updateUser()}} className='btnSaveChanges'>Save changes</button>}
          <button onClick={editUser} className='btnEditUser'>Edit</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;