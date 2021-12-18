import React from 'react';
import { faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardToOrder = (product) => {
    return (
        <div className='tableCart' >
            <p className='titleCreateOrder'>Create a new order</p>
            <input className='inputClient' type="text" name='client' placeholder='Client name'/>
            <table className='tableContent'>
                <thead>
                    <tr>
                        <th className='tableContent'>Product</th>
                        <th className='tableContent'>Price</th>
                        <th className='tableContent'>Quantify</th>
                        <th className='tableContent'></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='tableContent'> a </td>
                        <td className='tableContent'> a </td>
                        <td className='tableContent'> <button className='btnPlus' ><FontAwesomeIcon  icon={faPlus} /></button>0 <button className='btnMinus'><FontAwesomeIcon  icon={faMinus} /></button></td>
                        <td className='tableContent'> <button className='btnX'>x</button> </td>
                    </tr>
                </tbody>
            </table>
            <button className='btnCreateOrder'>Send to Kitchen</button>
        </div>
    )
}

export default CardToOrder;