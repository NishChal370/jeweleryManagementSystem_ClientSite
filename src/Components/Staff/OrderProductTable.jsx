import React from 'react'

function OrderProductTable({selectedOrderProductDetail}) {
    
    return (
        <section className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
            <h5 className="card-title">Order Products' Detail</h5>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Order P. No</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Net Weight</th>
                        <th scope="col">Total Weight</th>
                        <th scope="col">Gems Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Size</th>
                    </tr>
                </thead>

                <tbody>
                    {(selectedOrderProductDetail !== undefined)&&(
                        selectedOrderProductDetail.map(({orderProductId, product, totalWeight, quantity}, index)=>{
                            return(
                            <tr style={{cursor:'pointer'}} key={`OPD${index}`}>
                                <td>{orderProductId}</td>
                                <td>{product.productName}</td>
                                <td>{(product.netWeight === null || product.netWeight==='') ?'-' :product.netWeight}</td>
                                <td>{(totalWeight === null || totalWeight==='') ?'-' :totalWeight}</td>
                                <td>{(product.gemsName === null || product.gemsName==='') ?'-' :product.gemsName}</td>
                                <td>{(quantity === null || quantity==='') ?'-' :quantity}</td>
                                <td>{(product.size === null || product.size==='') ?'-' :product.size}</td>
                            </tr>)
                        })
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default OrderProductTable