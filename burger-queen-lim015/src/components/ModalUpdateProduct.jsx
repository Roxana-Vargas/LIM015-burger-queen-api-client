import React from 'react';
import logo from '../images/logo-bq.png';

const ModalUpdateProduct = ({ closeModalUpdate, name, price, type, handleInputChangeUpdate, handleSubmitUpdate}) => {
    return (
        <div className='modalCreateProduct'>
            <div className='modalContentProduct'>
                <img src={logo} className='logoModal' alt='logo'/>
                    <p>Update a product</p>
                    <form onSubmit={(evt) => handleSubmitUpdate(evt)}>
                        <input defaultValue={name} onChange={handleInputChangeUpdate} type='text' placeholder='Name'  name='name' className='inputCreateProduct' autoComplete='name' ></input>
                        <input defaultValue={price} onChange={handleInputChangeUpdate}  type='number' placeholder='Price' name='price' className='inputCreateProduct'></input>
                        <input  type='file' onChange={handleInputChangeUpdate} name='image' accept='image/png, image/jpeg' className='inputFile'></input>
                        <select defaultValue={type} onChange={handleInputChangeUpdate} name="type" className='selectCreateProduct'>
                            <option>Desayuno</option>
                            <option>Almuerzo</option>
                        </select>
                        <input type='submit' value='Update' className='btnCreateProduct'></input>  
                        <button className='btnCreateCancel' onClick={closeModalUpdate}>Close</button>
                    </form>        
            </div>
        </div>
    )
}

export default ModalUpdateProduct;