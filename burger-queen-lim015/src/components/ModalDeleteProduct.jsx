import React from 'react';
import logo from '../images/logo-bq.png';

const ModalDeleteProduct = ({closeModalDelete, handleDelete}) => {
    return (
        <div className='modalDelete'>
            <div className='modalContentDelete'>
                <img src={logo} className='logoModal' alt='logo'/>
                <p className='textDelete'>Are you sure you want to delete this product?</p> 
                <div className='btns-delete'>
                    <button onClick={handleDelete} className='btn-deleteUser'>Delete</button>  
                    <button onClick={closeModalDelete} className='btn-deleteCancel'>Close</button>
                </div> 
            </div>  
        </div>
    )
}

export default ModalDeleteProduct;