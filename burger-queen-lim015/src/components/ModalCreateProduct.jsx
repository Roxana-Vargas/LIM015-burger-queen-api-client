import React from 'react';
import logo from '../images/logo-bq.png';

const ModalCreateProduct = ({ closeModal }) => {
    return (
        <div className='modalCreateProduct'>
            <div className='modalContentProduct'>
                <img src={logo} className='logoModal' alt='logo'/>
                    <p>Create a product</p>
                    <form>
                            <input type='text' placeholder='Name'  name='name' className='inputCreateProduct' autoComplete='name' ></input>
                            <input type='number' placeholder='Price' name='price' className='inputCreateProduct'></input>
                            <input type='file' name='image' accept='image/png, image/jpeg' className='inputFile'></input>
                            <select name="type" className='selectCreateProduct'>
                                <option>Desayuno</option>
                                <option>Hamburguesa</option>
                                <option>Acompañamiento</option>
                                <option>Bebida</option>
                            </select>
                            <input type='submit' value='Create' className='btnCreateProduct'></input>  
                            <button className='btnCreateCancel' onClick={closeModal}>Close</button>
                    </form>        
            </div>  
        </div>
    )
}

export default ModalCreateProduct;