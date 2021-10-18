import React from 'react';
import logo from '../images/logo-bq.png';

const ModalCreateProduct = ({ closeModal, handleInputChange, handleSubmitCreate}) => {
    return (
        <div className='modalCreateProduct'>
            <div className='modalContentProduct'>
                <img src={logo} className='logoModal' alt='logo'/>
                    <p>Create a product</p>
                    <form onSubmit={handleSubmitCreate }>
                        <input onChange={handleInputChange} type='text' placeholder='Name'  name='name' className='inputCreateProduct' autoComplete='name' ></input>
                        <input onChange={handleInputChange} type='number' placeholder='Price' name='price' className='inputCreateProduct'></input>
                        <input onChange={handleInputChange} type='file' name='image' accept='image/png, image/jpeg' className='inputFile'></input>
                        <select onChange={handleInputChange} name="type" className='selectCreateProduct'>
                            <option>Desayuno</option>
                            <option>Almuerzo</option>
                        </select>
                        <input type='submit' value='Create' className='btnCreateProduct'></input>  
                        <button className='btnCreateCancel' onClick={closeModal}>Close</button>
                    </form>        
            </div>  
        </div>
    )
}

export default ModalCreateProduct;