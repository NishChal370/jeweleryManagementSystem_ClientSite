import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

let initialOrderTableHeading = ['#', 'Product name', 'Net Weight', 'Total Weight', 'Size','Gems Name', 'Action'];
let initialBillTableHeading =['#', 'Product name', 'Net Weight', 'loss Weight', 'Total Weight', 'M. Charge', 'Gems Name', 'Gems Price', 'Total Amount', 'Action'];

/**
 * use in Invoice component  & in generate bill page  & place order page
 * */
function ProductTable({productsList, editAddedProductHandler, deleteAddedProductHandler, calledBy}) {
    const location = useLocation().pathname.replace('/','');
    const [tableHeading, setTableHeading] = useState([...initialBillTableHeading]);

    useEffect(()=>{
        if (calledBy === 'invoice'){
            tableHeading.pop();

            setTableHeading([...tableHeading]);
        }
        if(location.includes('order')){
            setTableHeading([...initialOrderTableHeading]);
        }
    },[])

    return(
        <table>
            <thead>
                <tr>
                {
                    tableHeading.map((title,index)=>{
                        return <th key={`${index}GBTH`}>{title}</th>
                    })
                }
                </tr>
            </thead>

            <tbody>
            {
                productsList.map((billProduct, index)=>{
                    return(
                        <tr  key={`${index}GBTR`}>
                            <th scope="row">{index+1}</th>
                            <td>{billProduct.product.productName}</td>
                            <td>{billProduct.product.netWeight}</td>
                            {(!location.includes('order'))&&(
                                <td>{billProduct.lossWeight}</td>)
                            }
                            
                            <td>{billProduct.totalWeight}</td>
                            {(!location.includes('order'))&&(
                                <td>{billProduct.makingCharge}</td>)
                            }
                            {(location.includes('order'))&&(
                                <td>{billProduct.product.size}</td>)
                            }
                            
                            <td>{billProduct.product.gemsName}</td>
                            {(!location.includes('order'))&&(
                                <td>{billProduct.product.gemsPrice}</td>)
                            }
                            {(!location.includes('order'))&&(
                                <td>{billProduct.totalAmountPerProduct}</td>
                            )}

                            {
                                (calledBy == 'bill' || location.includes('order')) &&(
                                    <td>
                                        <i className="ri-edit-2-fill curser--on-hover text-primary" onClick={()=> editAddedProductHandler(index, billProduct)}></i> &emsp;
                                        <i className="ri-delete-bin-7-fill curser--on-hover text-danger"  onClick={()=>deleteAddedProductHandler(index)}></i>
                                    </td>
                                )
                            }
                            
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
      
}

export default ProductTable;
