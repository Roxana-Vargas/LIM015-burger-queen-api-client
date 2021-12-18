import React, { useEffect, useState } from 'react';
import axios from 'axios';
/*import CardToOrder from './CardToOrder';*/
import {faAngleLeft, faTrash, faCheck, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalStatusDelivered from './ModalStatusDelivered';
import ModalStatusCanceled from './ModalStatusCanceled';
import Navigation from './Navigation';


const Orders = () => {
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

    /* ------------------------------------- SHOW PRODUCTS BY TYPE -----------------------------------------------*/

    const [dataTypeProducts, setDataTypeProducts] = useState([]);
    
    const showBreakfasts = () => { 
        const breakfast = dataProducts.filter((product) => product.type ==='Desayuno');
        setDataTypeProducts(breakfast);
    }

    const showLunches = () => { 
        const lunches = dataProducts.filter((product) => product.type ==='Almuerzo')
        setDataTypeProducts(lunches);
    }


    /* ------------------------- ADD PRODUCTS TO CART ----------------------------------------------*/

    const [productsCart, setProductsCart] = useState([]);
    
    const showProductsCart = (product) => {
        setProductsCart([
            ...productsCart,
            product
        ])
    }

   /* ---------------------------- SAVE PRODUCTS AND QUANTIFY IN AN ARRAY -------------------------------------------*/

    const [productsToOrder, setProductsToOrder] = useState([
    ]);

    const orderProducts = (product) => {
        setProductsToOrder ([
            ...productsToOrder,
            {
                qty: 1,
                product: product._id,
            }
        ])
    }
    
    /* ---------------------------- SAVE CLIENT'S NAME -------------------------------------------*/

    const [client, setClient] = useState('');

    const handleInputChange = (event) => {
        setClient({
            [event.target.name] : event.target.value
        })
    }

    /* ---------------------------- TOTAL PRICE -------------------------------------------*/
    const [total, setTotal] = useState(0);

    const calculateTotalPrice = (price) => {
        setTotal(total + price)
    }

    /* ---------------------------- REMOVE AN ELEMENT -------------------------------------------*/
    const handleRemove = (_id) => {

        const newProductsToCart = productsCart.filter((product) => product._id !== _id);
        const newProductsToOrder = productsToOrder.filter((product) => product.product !== _id)
        const removedProduct = productsCart.filter((product) => product._id === _id);

        setProductsCart(newProductsToCart);
        setProductsToOrder(newProductsToOrder)
        setTotal(total - removedProduct[0].price)
    
    }

    /* ---------------------------- CREATE AND ORDER -------------------------------------------*/
    
    const handleCreateOrder = () => {
        if (client === '') {
            toast.error("You must enter the client's name", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (productsToOrder.length === 0) {
            toast.error("You must enter products to order", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const url = 'https://bq-lim015.herokuapp.com/orders';
            const token = localStorage.getItem('token')
            const config = {
                headers: { token: token }
            };
            const order = {
                userId: localStorage.getItem('userId'),
                client: client.client,
                status: 'pending',
                products: productsToOrder
            };
            axios.post(url, order, config).then(() => {
                document.querySelector('.inputClient').value = '';
                setProductsToOrder([]);
                setProductsCart([]);
                setTotal(0)
                setShow(false)
                getOrders();
                toast.success('The order was created!', {
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
                console.info(error);
            })
        }   
    }

    /* ---------------------------- SHOW AND HIDE  -------------------------------------------*/

    const [show, setShow] = useState(true);

    /* ---------------------------- GET ALL ORDERS -------------------------------------------*/

    const [dataOrders, setDataOrders] = useState([]);

    const getOrders = () => {
        const url = 'https://bq-lim015.herokuapp.com/orders?limit=100';
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        axios.get(url, config).then((response) => {
            const filterOrders = response.data.filter((order) => order.status ==='pending'|| order.status ==='delivering')
            setDataOrders(filterOrders)
        })
    }

    useEffect(() => {
        getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* ---------------------------- MARK ORDER AS DELIVERED -------------------------------------------*/

    const [isOpenModal, setIsOpenModal] = useState(false)

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    const [idOrder, setIdOrder] = useState('');

    const selectOrder = (order) => {
        setIdOrder(order._id);
        console.log('click');
    }

    const updateStatusToDelivered = () => {
        
        const url = `https://bq-lim015.herokuapp.com/orders/${idOrder}`;
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        const status = {
            status: 'delivered'
        }
        axios.put(url, status, config).then((response) => {
            console.log(response);
            getOrders();
            closeModal();
        }).catch((error) => {
            console.info(error);
        })
    }

    /* ---------------------------- MARK ORDER AS CANCELED -------------------------------------------*/

    const [isOpenModalCanceled, setIsOpenModalCanceled] = useState(false)

    const openModalCanceled = () => {
        setIsOpenModalCanceled(true);
    }

    const closeModalCanceled = () => {
        setIsOpenModalCanceled(false);
    }

    const updateStatusToCanceled = () => {
        
        const url = `https://bq-lim015.herokuapp.com/orders/${idOrder}`;
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        const status = {
            status: 'canceled'
        }
        axios.put(url, status, config).then((response) => {
            console.log(response);
            getOrders();
            closeModalCanceled();
        }).catch((error) => {
            console.info(error);
        })
    }
    return (
        <><Navigation />
        <section className='sectionOrders'>
            <div className='divProducts' style={{ display: show ? "block" : "none" }}>
                <div className='divBtnsOrder'>
                    <button className='showBreakfasts' onClick={showBreakfasts}>Breakfast</button>
                    <button className='showLunches' onClick={showLunches}>Lunches</button>
                </div>
                {dataTypeProducts.map((product, i) => {
                    return (
                        <div className='containerCard' key={i}>
                            <div className='card'>
                                <div className='containerImage'>
                                    <img src={product.image} alt='product' className='imageProduct' />
                                </div>
                                <div className='container-info-product'>
                                    <p className='product'>Product: <span className='infoProduct'> {product.name} </span> </p>
                                    <p className='product'>Price: <span className='infoProduct'> S/.{product.price} </span> </p>
                                </div>
                                <button className='btnAddOrder' onClick={() => { showProductsCart(product); orderProducts(product); calculateTotalPrice(product.price); } }> <FontAwesomeIcon icon={faPlusCircle} /> </button>
                            </div>
                        </div>
                    );
                })}
                <hr className='line' />
            </div>
            
            <div className='divOrderCart' style={{ display: show ? "block" : "none" }}>
                <div className='tableCart'>
                    <p className='titleCreateOrder'>Create a new order</p>
                    <input onChange={handleInputChange} className='inputClient' type="text" name='client' placeholder='Client name' />
                    <table className='tableContent'>
                        <thead>
                            <tr>
                                <th className='tableContent'>Product</th>
                                <th className='tableContent'>Price</th>
                                <th className='tableContent'>Quantify</th>
                                <th className='tableContent'></th>
                            </tr>
                        </thead>
                        {productsCart.map((product, i) => {
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td className='tableContent'> {product.name} </td>
                                        <td className='tableContent'>  S/.{product.price} </td>
                                        <td className='tableContent'>1</td>
                                        <td className='tableContent'> <button onClick={() => handleRemove(product._id)} className='btnX'>x</button> </td>
                                    </tr>
                                </tbody>
                            );
                        })}

                    </table>
                    <p className='totalPriceCart'>Total:  S/.{total} </p>
                    <button className='btnCreateOrder' onClick={handleCreateOrder}>Send to Kitchen</button>
                </div>
                <div>
                    <button className='viewAllOrders' onClick={() => setShow((s) => !s)}>View All Orders</button>
                </div>
            </div>
            <ToastContainer />
            <div className='containerOrders' style={{ display: show ? "none" : "block" }}>
                <button className='btnBack' onClick={() => setShow((s) => !s)}> <FontAwesomeIcon icon={faAngleLeft} /> Back</button>
                {
                dataOrders.map((order, i) => {
                    return (
                        <div className='containerCardsOrders' key={i}>
                            <div style = {order.status === 'delivering' ? {  border: 'solid #F3C13F'} : {  border: 'solid white'}} className='cardOrders'>
                                <p className='nameClient'> {order.client} </p>
                                <div className='containerTableOrder'>
                                    <table className='tableOrder'>
                                        <tbody>
                                            {order.products.map((ele, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className='tableContent'>{ele.product.name}</td>
                                                        <td className='tableContent'>{ele.qty}</td>
                                                        <td className='tableContent'>S/{ele.product.price}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                
                                <p className='status'> Status: <span className='spanStatus'>{order.status}</span>  </p>
                                <div className='btnsOrder'>
                                    <button className='btn' onClick={() => { selectOrder(order); openModalCanceled(); } } ><span className='icon-order btn-delete'><FontAwesomeIcon icon={faTrash}/></span></button>
                                    <button className='btn' onClick={() => { selectOrder(order); openModal(); } }><span className='icon-order btn-check'><FontAwesomeIcon icon={faCheck} /></span></button>
                                    {isOpenModal && <ModalStatusDelivered closeModal={closeModal} handleUpdate={updateStatusToDelivered} />}
                                    {isOpenModalCanceled && <ModalStatusCanceled closeModal={closeModalCanceled} handleUpdate={updateStatusToCanceled} />}
                                    
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section></>
    )
}

export default Orders;