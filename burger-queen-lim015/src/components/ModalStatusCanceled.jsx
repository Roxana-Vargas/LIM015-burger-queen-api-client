import React from 'react';
import logo from '../images/logo-bq.png';

const ModalStatusCanceled = ({ closeModal, handleUpdate}) => {
    return (
        <div className='modalUpdateStatus'>
            <div className='modalContentDelete'>
                <img src={logo} className='logoModal' alt='logo'/>
                <p className='txtUpdateStatus'>Are you sure you want update this order as canceled?</p> 
                <div className='btns-delete'>
                    <button onClick={handleUpdate} className='btn-deleteUser'>Update</button>  
                    <button onClick={closeModal} className='btn-deleteCancel'>Close</button>
                </div> 
            </div>  
        </div>
    )
}

export default ModalStatusCanceled;