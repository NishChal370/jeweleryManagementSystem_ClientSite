import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import {  Fetch_Pending_Order_Product_By_Id } from '../../API/UserServer'

function OrderProductsModel({show, handleClose, selectedOrderId, handlerOrderProductSelect}) {
    const [orderProducts, setOrderProducts] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const FetchOrderById=()=>{
        Fetch_Pending_Order_Product_By_Id(selectedOrderId)
            .then(({data}) => {
                console.log("INSODE");
                console.log(data);
                setOrderProducts(data);
            }).catch((error) => {
                setOrderProducts();
                console.log(error.response.data[0])
                setErrorMessage(error.response.data[0]);
            });
    }

    useEffect(()=>{
        FetchOrderById();
    },[selectedOrderId])



    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            fullscreen={'lg-down'}
            size='xl'
            // size="lg"
            // dialogClassName="modal-90w"
            // aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <h2 style={{color:'#012970', fontWeight:'bold'}}>Order Products'</h2>
                {/* <h1 className='fw-bolder' style={{color:'#012970'}}>Register staff</h1> */}
            </Modal.Header>

            <Modal.Body closeButton>
            {/* <section className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}> */}
            <section className="card-body">
                        {/* <h5 className="card-title">Order Products' Detail</h5> */}
                        <table className="table table-hover" style={{textAlign:'center'}}>
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
                                {(orderProducts !== undefined)
                                   ? orderProducts.map((orderProduct, index)=>{
                                    // ? orderProducts.map(({orderProductId, product, totalWeight, quantity}, index)=>{
                                        return(
                                        <tr style={{cursor:'pointer'}} onClick={()=>{ handleClose(); handlerOrderProductSelect([orderProduct])}}>
                                            <td>{orderProduct.orderProductId}</td>
                                            <td>{orderProduct.product.productName}</td>
                                            <td>{(orderProduct.product.netWeight === null || orderProduct.product.netWeight==='') ?'-' :orderProduct.product.netWeight}</td>
                                            <td>{(orderProduct.totalWeight === null || orderProduct.totalWeight==='') ?'-' :orderProduct.totalWeight}</td>
                                            <td>{(orderProduct.product.gemsName === null || orderProduct.product.gemsName==='') ?'-' :orderProduct.product.gemsName}</td>
                                            <td>{(orderProduct.quantity === null || orderProduct.quantity==='') ?'-' :orderProduct.quantity}</td>
                                            <td>{(orderProduct.product.size === null || orderProduct.product.size==='') ?'-' :orderProduct.product.size}</td>
                                        </tr>)
                                    })
                                    : <tr><td colSpan={7}><h5 style={{color:'red'}}>{errorMessage}</h5></td></tr>
                                }
                                {/* <tr>
                                    <td>1</td>
                                    <td>Ring</td>
                                    <td>22</td>
                                    <td>0</td>
                                    <td>Muga</td>
                                    <td>01</td>
                                    <td>-</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Ring</td>
                                    <td>22</td>
                                    <td>0</td>
                                    <td>Muga</td>
                                    <td>01</td>
                                    <td>-</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Ring</td>
                                    <td>22</td>
                                    <td>0</td>
                                    <td>Muga</td>
                                    <td>01</td>
                                    <td>-</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Ring</td>
                                    <td>22</td>
                                    <td>0</td>
                                    <td>Muga</td>
                                    <td>01</td>
                                    <td>-</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Ring</td>
                                    <td>22</td>
                                    <td>0</td>
                                    <td>Muga</td>
                                    <td>01</td>
                                    <td>-</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Ring</td>
                                    <td>22</td>
                                    <td>0</td>
                                    <td>Muga</td>
                                    <td>01</td>
                                    <td>-</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Ring</td>
                                    <td>22</td>
                                    <td>0</td>
                                    <td>Muga</td>
                                    <td>01</td>
                                    <td>-</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>Ring</td>
                                    <td>22</td>
                                    <td>0</td>
                                    <td>Muga</td>
                                    <td>01</td>
                                    <td>-</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </section>
            </Modal.Body>
        </Modal>
    )
}

export default OrderProductsModel