import React, { useEffect, useState } from 'react';

let initialTableHeading =['#', 'Product name', 'Net Weight', 'loss Weight', 'Total Weight', 'M. Charge', 'Gems Name', 'Gems Price', 'Total Amount', 'Action'];

function ProductTable({billProductList, editAddedProductHandler, deleteAddedProductHandler, calledBy}) {

    const [tableHeading, setTableHeading] = useState([...initialTableHeading]);

    useEffect(()=>{
        if (calledBy === 'invoice'){
            tableHeading.pop();
            setTableHeading(tableHeading);
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
                billProductList.map((billProduct, index)=>{
                    return(
                        <tr  key={`${index}GBTR`}>
                            <th scope="row">{index+1}</th>
                            <td>{billProduct.product.productName}</td>
                            <td>{billProduct.product.netWeight}</td>
                            <td>{billProduct.lossWeight}</td>
                            <td>{billProduct.totalWeight}</td>
                            <td>{billProduct.makingCharge}</td>
                            <td>{billProduct.product.gemsName}</td>
                            <td>{billProduct.product.gemsPrice}</td>
                            <td>{billProduct.totalAmountPerProduct}</td>
                            {
                                (calledBy == 'bill') &&(
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
