import React, { useEffect, useState } from 'react';
import ModalCreateProduct from './ModalCreateProduct';
import ModalUpdateProduct from './ModalUpdateProduct';
import ModalDeleteProduct from './ModalDeleteProduct';
import axios from 'axios';
import { faPenSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Navigation';


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
        const url = 'https://bq-lim015.herokuapp.com/products?limit=20';
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        axios.get(url, config).then((response) => {
            setDataProducts(response.data)
        })
    }

    useEffect(() => {
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* ------------------------------------- CREATE A NEW PRODUCT -----------------------------------------------*/

    const [dataNewProduct, setDataNewProduct] = useState({
        name: '',
        price: '',
        image: '',
        type: '',
        id: '',
    })

    const handleInputChange = (event) => {
        setDataNewProduct({
            ...dataNewProduct,
            [event.target.name] : event.target.value
        })
    }

    const cleanInputs = () => {
        setDataNewProduct({
            name: '',
            price: '',
            image: '',
            type: '',
            id: ''
        })
    }

    const handleSubmitCreate = (e) => {
        e.preventDefault();
        const url = 'https://bq-lim015.herokuapp.com/products';
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        axios.post(url,dataNewProduct, config).then(() => {
            closeModal();
            getProducts();
            toast.success('Product created!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            cleanInputs();
        })
        .catch((error) => {
            let errorMessage = '';
            if (error.response.status === 400) {
                errorMessage = 'You must fill in all the fields'
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

    /* ------------------------------------- UPDATE A PRODUCT -----------------------------------------------*/
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false)

    const openModalUpdate = () => {
        setIsOpenModalUpdate(true);
    }

    const closeModalUpdate = () => {
        setIsOpenModalUpdate(false);
        cleanInputs();
    }

    const selectProduct = (product) => {
        setDataNewProduct({
            name: product.name,
            price: product.price,
            image: product.image,
            type: product.type,
            id: product._id
        })

    }

    const handleInputChangeUpdate = (event) => {
        setDataNewProduct ({
            ...dataNewProduct,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        const url = `https://bq-lim015.herokuapp.com/products/${dataNewProduct.id}`;
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        axios.put(url, dataNewProduct, config).then(() => {
            closeModalUpdate();
            getProducts();
            cleanInputs();
            toast.success('Product updated!', {
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
                errorMessage = "You didn't enter information to update"
            }
            closeModalUpdate();
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

    /* ------------------------------------- DELETE A PRODUCT -----------------------------------------------*/
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

    const openModalDelete = () => {
        setIsOpenModalDelete(true);
    }

    const closeModalDelete = () => {
        setIsOpenModalDelete(false);
    }
    
    const handleDelete = () => {
        console.log(dataNewProduct.id);
        const url = `https://bq-lim015.herokuapp.com/products/${dataNewProduct.id}`;
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        axios.delete(url, config).then((response) => {
            console.log(response);
            getProducts();
            closeModalDelete();
            toast.success('The product has been deleted!', {
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


    return (
        <><Navigation />
        <section>
            <div className='createNewProduct'>
                <p>Create a new product</p>
            </div>
            <div className='containerBtnCreate'>
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
                        {dataProducts.map((product, i) => {
                            return (
                                <tr key={i}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.type}</td>
                                    <td><button className='btn-update' onClick={() => { openModalUpdate(); selectProduct(product); } }><FontAwesomeIcon icon={faPenSquare} /></button></td>
                                    <td><button className='btn-delete' onClick={() => { openModalDelete(); selectProduct(product); } }><FontAwesomeIcon icon={faTrash} /></button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {isOpenModal && <ModalCreateProduct closeModal={closeModal} handleInputChange={handleInputChange} handleSubmitCreate={handleSubmitCreate} />}
            <ToastContainer />

            {isOpenModalUpdate && <ModalUpdateProduct name={dataNewProduct.name} price={dataNewProduct.price} image={dataNewProduct.image} type={dataNewProduct.type} closeModalUpdate={closeModalUpdate} handleInputChangeUpdate={handleInputChangeUpdate} handleSubmitUpdate={handleSubmitUpdate} />}

            {isOpenModalDelete && <ModalDeleteProduct closeModalDelete={closeModalDelete} handleDelete={handleDelete} />}

        </section></>
    )
}

export default Products;