import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    
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

    const [dataTypeProducts, setDataTypeProducts] = useState([]);
    

    const showBreakfasts = () => { 
        const breakfast = dataProducts.filter((product) => product.type ==='Desayuno');
        setDataTypeProducts(breakfast);
    }

    const showLunches = () => { 
        const lunches = dataProducts.filter((product) => product.type ==='Almuerzo')
        setDataTypeProducts(lunches);
    }

    return (
        <section className='sectionOrders'>
            <div className='divProducts'>
                <div className='divBtnsOrder'> 
                    <button className='showBreakfasts' onClick={showBreakfasts}>Breakfast</button>
                    <button className='showLunches' onClick={showLunches}>Lunches</button>
                </div>
                {dataTypeProducts.map((product) => {
                    return (
                        <div className='containerCard'>
                            <div className='card'>
                                <img src={product.image} alt='product' className='imageProduct'/>
                                <p className='product'>Product: <span className='infoProduct'> {product.name} </span> </p>
                                <p className='product'>Price <span className='infoProduct'> {product.price} </span> </p>
                                <button className='btnAddOrder'>Add to order</button>
                            </div>
                        </div>
                    )
                 })}
            </div>
            <div className='divOrderCart'>
                <p>soy el carrito</p>
            </div>
        </section>
    )
}

export default Orders;