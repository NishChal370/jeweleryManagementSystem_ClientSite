import React from 'react';
import { TotalCard } from '..';
import { InternetIcon, PancardIcon, PhoneIcon, ShopLogo } from '../../Assets/img';
import './invoice.css';

const Invoice = React.forwardRef(({customer, bill, billProductList, billType}, ref) => {

  return (
    <div id='print-me'  className= "card bill-pdf" ref={ref}>
        <span id='top-design'></span>

        <header>
            <img id='shop-logo' src={ShopLogo} />

            <span>
                <h1>Gitanjali Jewellers</h1>
                <address>Bisal Bazar; Kathmandu</address>
            </span> 
        </header>

        <main>
            <div className='customer-info'>
                <section>
                    <p>BILL TO:</p>
                    <h5>{customer.name}</h5>
                    <hr />
                    <div className='display--flex'>
                        <header className='font--bold'>
                            <p>A</p>
                            <p>P</p>
                            <p>E</p>
                        </header>

                        <span>
                            <address>:{customer.address}</address>
                            <p>:{customer.phone}</p>
                            <p>:{customer.email}</p> 
                        </span>
                    </div>
                </section>

                <aside>
                    <h5>INVOICE</h5>
                    <span className='display--flex'>
                        <header  className='font--bold'>
                            <p>Bill No</p>
                            <p>Date</p>
                            <p>Type</p>
                        </header>

                        <span>
                            <p>:{bill.billId}</p>
                            <p>:dsfsgsd</p>
                            <p>:{billType}</p>
                        </span>
                    </span>
                </aside>
            </div> 

            <div className='scroll--table invoice-product-table'>
            <table>
                <thead>
                    <tr>
                    {
                        ['#', 'Product name', 'Net Weight', 'loss Weight', 'Total Weight', 'M. Charge', 'Gems Name', 'Gems Price', 'Total Amount'].map((title,index)=>{
                            return <th key={`${index}IVTBL`}>{title}</th>
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
                            </tr>
                        )
                    })
                }
                </tbody>

            </table>
            </div>

            <div>
                <TotalCard bill={bill}/>

                <aside>
                    <section className='condition-section'>
                        <header>
                            <h5>TEARM &#38; CONDITION/NOTES</h5>
                        </header>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem.</p>
                    </section>

                    <section className='signiture'>
                        <span>
                            <hr />
                            <h5>Owner Name</h5>
                        </span>
                        
                    </section>
                </aside>
            </div>
            
        </main>
        
        <footer>
            {
                [{icon:PhoneIcon, item:['01-4537473', '+977-9857363548']}, {icon:InternetIcon, item:['facebook.com', 'website.com']}, {icon:PancardIcon, item:['PAN No:', '9347534753845738']}]
                .map((value, index)=>{
                    return(
                        <section key={`footerlink${index}`}>
                            <div>
                                <img src={value.icon} alt={(value.icon).toString()} />
                            </div>
                            <div>
                                {value.item.map((data,index)=>{
                                    return  <p>{data}</p>
                                })}
                            </div>
                        </section>
                    )
                })
            }
        </footer>
        
        <span id='footer-design-2'></span>
        <span id='footer-design'></span>

    </div>
    )
});

export default Invoice