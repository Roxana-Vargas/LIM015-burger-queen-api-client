import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faAngleRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatusOfOrder = () => {

    /* ------------------------------------- GET ALL ORDERS  -----------------------------------------------*/

    const [dataPendingOrders, setDataPendingOrders] = useState([]);
    const [dataDeliveringOrders, setDataDeliveringOrders] = useState([]);
    const [dataDeliveredOrders, setDataDeliveredOrders] = useState([]);

    const getOrders = () => {
        const url = 'https://bq-lim015.herokuapp.com/orders';
        const token = localStorage.getItem('token')
        const config = {
            headers: { token: token }
        };
        axios.get(url, config).then((response) => {
            const pending = response.data.filter((order) => order.status ==='pending')
            setDataPendingOrders(pending);
            const delivering = response.data.filter((order) => order.status ==='delivering')
            setDataDeliveringOrders(delivering);
            const delivered = response.data.filter((order) => order.status ==='delivered')
            setDataDeliveredOrders(delivered);


            /*setDataOrders(response.data)*/
        })
    }

    useEffect(() => {
        getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* ------------------------------------- GSHOW ORDERS ACCORDING TO STATUS -----------------------------------------------*/
    

    return (
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
                                        )
                                    })}
                                </tbody>
                            </table>
                            <button className='btnMove'>Move <FontAwesomeIcon icon={faAngleRight}/></button>
                        </div>
                    )
                })}
            </div>
            <div className='divOrders'> 
                <p className='txtDelivering'>Delivering</p>
                <hr />
                {dataDeliveringOrders.map((order, i) => {
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
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
            <div className='divOrders'>
                <p className='txtDelivered'>Delivered</p>
                <hr />
                {dataDeliveredOrders.map((order, i) => {
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
                                        )
                                    })}
                                </tbody>
                            </table>
                            <button className='btn-delete hideOrder'><FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default StatusOfOrder;