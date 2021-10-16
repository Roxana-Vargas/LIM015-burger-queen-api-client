import React, { useState } from 'react';
import ModalCreateProduct from './ModalCreateProduct';

const Products = () => {

    const [isOpenModal, setIsOpenModal] = useState(false)

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    return (
        <section>
            <div className='createNewProduct'>
                <p>Create a new product</p>
            </div>
            <div className='createNewProduct'>
                <button onClick={openModal} className='btnCreate'>Create</button>
            </div>
            <div className='containerTable'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            
            {isOpenModal && <ModalCreateProduct closeModal={closeModal}/>}
            
        </section>
    )
}

export default Products;