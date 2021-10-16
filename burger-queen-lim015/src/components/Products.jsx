import React, { useEffect, useState } from 'react';
import ModalCreateProduct from './ModalCreateProduct';
import axios from 'axios';
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Products = () => {
    /* ------------------------------------- MODAL FOR CREATE A PRODUCT -----------------------------------------------*/
    const [isOpenModal, setIsOpenModal] = useState(false)

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }
    
    /* ------------------------------------- GET ALL PRODUCTS -----------------------------------------------*/
    const [dataProducts, setDataProducts] = useState([]);

    const getProducts = () => {
        const url = 'https://bq-lim015.herokuapp.com/products';
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        axios.get(url, config).then((response) => {
            setDataProducts(response.data)
        })
        console.log(dataProducts);
    }
    
    useEffect(() => {
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                        {dataProducts.map((product) => {
                            return (
                                <tr>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.type}</td>
                                <td><button className='btn-update'><FontAwesomeIcon icon={faPenSquare} /></button></td>
                                <td><button className='btn-delete'><FontAwesomeIcon icon={faTrash} /></button></td>
                                </tr>  
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
            {isOpenModal && <ModalCreateProduct closeModal={closeModal}/>}
            
        </section>
    )
}

export default Products;