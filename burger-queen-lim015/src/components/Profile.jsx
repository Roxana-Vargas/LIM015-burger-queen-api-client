import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  console.log(dataUser.roles);

  /* ------------------------------------------------------UPDATE PROFILE ---------------------------------------------------- */

  return (
    <div>
      <p className='myProfile'>My profile</p>
      <div className='containerProfile'>
        <div className='infoUser'>
          <form action="">
            <p className='infoProfile'> Email: <span><input defaultValue={dataUser.email} className='inputProfile' readOnly type='text'  name='email'  autoComplete="username" ></input></span></p>
            <p className='infoProfile'>Password: <span><input defaultValue={dataUser.password} className='inputProfile' readOnly type='password'  name='password'  autoComplete="current-password"></input></span></p>
            <p className='infoProfile'>Roles: <span><input value={dataUser.roles[0] === '615a8dbbe99308986396e976' ? 'user' : 'admin'} className='inputProfile' readOnly type="text" /></span></p>
            {console.log(dataUser.roles[0])}
          </form>
          <button className='btnUpdateUser'>Update</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;