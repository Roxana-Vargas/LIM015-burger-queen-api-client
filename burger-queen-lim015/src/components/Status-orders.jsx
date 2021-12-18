import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalStatusDelivering from './ModalStatusDelivering';
import Navigation from './Navigation';


const StatusOfOrder = () => {

    /* ------------------------------------- GET ALL ORDERS ACCORDING TO STATUS  -----------------------------------------------*/

    const [dataPendingOrders, setDataPendingOrders] = useState([]);
    const [dataDeliveringOrders, setDataDeliveringOrders] = useState([]);

    const getOrders = () => {
        const url = 'https://bq-lim015.herokuapp.com/orders?limit=100';
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        axios.get(url, config).then((response) => {
            const pending = response.data.filter((order) => order.status ==='pending')
            setDataPendingOrders(pending);
            const delivering = response.data.filter((order) => order.status ==='delivering')
            setDataDeliveringOrders(delivering);
        })
    }

    useEffect(() => {
        getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* ------------------------------UPDATE ORDER STATUS FROM PENDING TO DELIVERING -------------------------------------*/
    
    const [idOrder, setIdOrder] = useState('');

    const selectOrder = (order) => {
        setIdOrder(order._id);
    }

    const [isOpenModal, setIsOpenModal] = useState(false)

    const openModal = () => {
        setIsOpenModal(true);
    }

    const closeModal = () => {
        setIsOpenModal(false);
    }

    const updateStatusToDelivering = () => {
        const url = `https://bq-lim015.herokuapp.com/orders/${idOrder}`;
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        const status = {
            status: 'delivering'
        }
        axios.put(url, status, config).then((response) => {
            console.log(response);
            getOrders();
            closeModal();
        }).catch((error) => {
            console.info(error);
        })
    }

    return (
        <><Navigation />
        <div className='textOrders'>
            <p>Status of orders</p>
        </div>
        <div className='containerStatusOrders'>
            <div className='divOrders'>
                <p className='txtPending'>Pending</p>
                <hr />
                {dataPendingOrders.map((order, i) => {
                    return (
                        <div className='cardStatusOrder' key={i}>
                            <p className='nameClient'>{order.client}</p>
                            <table className='tableOrder'>
                                <tbody>
                                    {order.products.map((ele, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='tableContent'>{ele.product.name}</td>
                                                <td className='tableContent'>{ele.qty}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <button onClick={() => { selectOrder(order); openModal(); } } className='btnMove'>Move <FontAwesomeIcon icon={faAngleRight} /></button>
                            {isOpenModal && <ModalStatusDelivering closeModal={closeModal} handleUpdate={updateStatusToDelivering} />}
                        </div>
                    );
                })}
            </div>
            <div className='divOrders'>
                <p className='txtDelivering'>Delivering</p>
                <hr />
                {dataDeliveringOrders.map((order, i) => {
                    return (
                        <div className='cardStatusOrder ' key={i}>
                            <p className='nameClient'>{order.client}</p>
                            <div>
                                <table className='tableOrder'>
                                    <tbody>
                                        {order.products.map((ele, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className='tableContent'>{ele.product.name}</td>
                                                    <td className='tableContent'>{ele.qty}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div></>
    )
}

export default StatusOfOrder;