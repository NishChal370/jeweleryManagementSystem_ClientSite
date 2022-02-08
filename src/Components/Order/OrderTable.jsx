import React, { useEffect, useState } from 'react';

let initialTableHeading = ['#', 'Product name', 'Net Weight', 'Total Weight', 'Size','Gems Name', 'Design', 'Action'];

/**
 * use in place order but not in use now
 * */
function OrderTable({orderProductList, editAddedProductHandler, deleteAddedProductHandler}) {

    const [tableHeading, setTableHeading] = useState([...initialTableHeading]);

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
                orderProductList.map((billProduct, index)=>{
                    return(
                        <tr  key={`${index}GBTR`}>
                            <th scope="row">{index+1}</th>
                            <td>{billProduct.product.productName}</td>
                            <td>{billProduct.product.netWeight}</td>
                            <td>{billProduct.totalWeight}</td>
                            <td>{billProduct.product.size}</td>
                            <td>{billProduct.product.gemsName}</td>
                            {/* <td>{billProduct.product.gemsPrice}</td> */}
                            <td>
                                <a href="#">
                                    <img 
                                    style={{width :'4.5rem', borderRadius:'1rem', height:'2.5rem'}}
                                    src="data:image/jpeg;base64,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"
                                    alt="img"/>
                                </a>
                            </td>
                            {
                                <td>
                                    <i className="ri-edit-2-fill curser--on-hover text-primary" onClick={()=> editAddedProductHandler(index, billProduct)}></i> &emsp;
                                    <i className="ri-delete-bin-7-fill curser--on-hover text-danger"  onClick={()=>deleteAddedProductHandler(index)}></i>
                                </td>
                            }
                            
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
      
}

export default OrderTable;
