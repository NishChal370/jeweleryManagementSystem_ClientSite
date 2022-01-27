import React from 'react';
import { TotalCard } from '..';
import { PancardIcon, PhoneIcon, ShopLogo } from '../../Assets/img';
import { INITIAL_BILL } from '../Bill/Constant';
import './invoice.css';

function Invoice({isHidden}) {

  return (
    <div id='print-me'  className= "card bill-pdf"  hidden={isHidden}>
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
                    <h5>CUSTOMER NAME</h5>
                    <hr />
                    <div className='display--flex'>
                        <header className='font--bold'>
                            <p>A</p>
                            <p>P</p>
                            <p>E</p>
                        </header>

                        <span>
                            <address>:Customer address</address>
                            <p>:97345384</p>
                            <p>:dkgs@temp.com</p> 
                        </span>
                    </div>
                </section>

                <aside>
                    <h5>INVOICE</h5>
                    <span className='display--flex'>
                        <header  className='font--bold'>
                            <p>Bill No</p>
                            <p>Date</p>
                        </header>

                        <span>
                            <p>:234</p>
                            <p>:dsfsgsd</p>
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
                            return <th key={`${index}GBTH`}>{title}</th>
                        })
                    }
                    </tr>
                </thead>

                <tbody>
                {/* {
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
                                <td>
                                    <i className="ri-edit-2-fill curser--on-hover text-primary" onClick={()=> editAddedProductHandler(index, billProduct)}></i> &emsp;
                                    <i className="ri-delete-bin-7-fill curser--on-hover text-danger"  onClick={()=>deleteAddedProductHandler(index)}></i>
                                </td>
                            </tr>
                        )
                    })
                } */}
                </tbody>

            </table>
            </div>

            <div>
                <TotalCard bill={INITIAL_BILL}/>

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
            <section>
                <div>
                    <img src={PhoneIcon} alt="phone-icon" />
                </div>
                <div>
                    <p>01-4537473</p>
                    <p>+977-9857363548</p>
                </div>
            </section>

            <section>
                <div>
                    <img src={PancardIcon} alt="pancard-icon" />
                </div>
                <div>
                    <p>PAN No:<br/> 9347534753845738</p>
                </div>
                
            </section>
        </footer>
        
        <span id='footer-design-2'></span>
        <span id='footer-design'></span>

    </div>
    )
}

export default Invoice;
