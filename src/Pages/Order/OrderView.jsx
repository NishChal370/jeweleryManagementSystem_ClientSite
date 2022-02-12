import './order.css'
import React from 'react'
import { useLocation } from 'react-router-dom'


function OrderView() {
    const orderData = useLocation().state;


    return (
    <div id='order-view'  className= "card ">
        <main>
            <div className='customer-info'>
                <section>
                    <p>Order OF:</p>
                    <h4 className='fw-bolder'>{orderData.name}</h4>
                    <hr />
                    <div className='display--flex'>
                        <header className='font--bold'>
                            <p>A</p>
                            <p>P</p>
                            <p>E</p>
                        </header>

                        <span>
                            <address>: {orderData.address}</address>
                            <p>: {orderData.phone}</p>
                            <p>: {orderData.email}</p> 
                        </span>
                    </div>
                </section>

                <aside>
                    <h3>ORDER</h3>
                    <span className='d-flex'>
                        <header  className='font--bold'>
                            <p>Order No</p>
                            <p>Type</p>
                            <p>Rate</p>
                            <p>Date</p>
                            <p>Submittion Date</p>
                            <p>Submitted Date</p>
                        </header>

                        <span>
                            <p>&emsp;: {orderData.orders.orderId}</p>
                            <p>&emsp;: {orderData.orders.type}</p>
                            <p>&emsp;: {orderData.orders.rate}</p>
                            <p>&emsp;: {orderData.orders.date}</p>
                            <p>&emsp;: {orderData.orders.submittionDate}</p>
                            <p>&emsp;: {orderData.orders.submittedDate}</p>
                        </span>
                    </span>
                </aside>
            </div> 

            <div className='scroll--table bill-product-table mt-5'>
                <table>
                    <thead>
                        <tr>
                        {
                            ['#', 'Product name', 'Net Weight', 'Total Weight', 'Size','Gems Name', 'Design'].map((title,index)=>{
                                return <th key={`${index}GBTH`}>{title}</th>
                            })
                        }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orderData.orders.orderProducts.map((orderProduct, index)=>{
                            return(
                                <tr  key={`${index}GBTR`}>
                                    <th scope="row">{index+1}</th>
                                    <td>{orderProduct.product.productName}</td>
                                    <td>{orderProduct.product.netWeight}</td>
                                    <td>{orderProduct.totalWeight}</td>
                                    <td>{orderProduct.product.size}</td>
                                    <td>{orderProduct.product.gemsName}</td>
                                    <td>
                                        <a href="#">
                                            <img 
                                            style={{width :'4.5rem', borderRadius:'1rem', height:'2.5rem'}}
                                            src='https://media.istockphoto.com/photos/fancy-designer-antique-golden-bracelets-for-woman-fashion-picture-id1277517088?b=1&k=20&m=1277517088&s=170667a&w=0&h=PXTQvh19pESR7mIekh3mJQHWcw2FDRrYcHdxsv9XY-Q='
                                            alt="img"/>
                                        </a>
                                    </td>
                                </tr>
                            )
                        }) 
                    }
                    </tbody>
                </table>
            </div>

            <div className={`card bill-totals--card scroll-off margin--top` } style={{width: '30%'}}>
                <div className="card-body">
                    <p>Customer P.Weight : <span> <input type="number" value={orderData.orders.customerProductweight} name='customerProductWeight' disabled style={{width:'6rem'}}/></span></p>
                    <hr />
                    <p>Advance payment : <span> <input type="number" value={orderData.orders.advancePayment} name='customerProductWeight' disabled style={{width:'6rem'}}/></span></p>
                    <hr />
                    <p>Remark: <span> <input type="text" name='customerProductWeight' disabled style={{width:'6rem'}}/></span></p>
                </div>
            </div>
        </main>
                    
    </div>
  )
}

export default OrderView