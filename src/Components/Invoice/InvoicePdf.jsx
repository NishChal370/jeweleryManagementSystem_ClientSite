import React from 'react';
// import { ProductTable, TotalCard } from '..';
// import { InternetIcon, PancardIcon, PhoneIcon, ShopLogo, SignitureSampleIcon } from '../../Assets/img';
import { Invoice } from '../../Pages';
import './invoice.css';

// const date = new Date();
const InvoicePdf = React.forwardRef(({customer, bill, billProductList}, ref) => {
    return (
        <div ref={ref}>
            <Invoice customer={customer} bill={bill} billProductList={billProductList}/>
        </div>
        
    //     <div id='print-me'  className= "card bill-pdf" ref={ref} >
    //         <h1 className='water-marker'>Gitanjali Jewellers</h1>
    //         <h1 className='water-marker2'>Gitanjali Jewellers</h1>
    //         <span id='top-design'></span>

    //         <header>
    //             <img id='shop-logo' src={ShopLogo} />

    //             <span>
    //                 <h1>Gitanjali Jewellers</h1>
    //                 <address>Bisal Bazar; Kathmandu</address>
    //             </span> 
    //         </header>

    //         <main>
    //             <div className='customer-info'>
    //                 <section>
    //                     <p>BILL TO:</p>
    //                     <h5>{customer.name}</h5>
    //                     <hr />
    //                     <div className='display--flex'>
    //                         <header className='font--bold'>
    //                             <p>A</p>
    //                             <p>P</p>
    //                             <p>E</p>
    //                         </header>

    //                         <span>
    //                             <address>:{customer.address}</address>
    //                             <p>:{customer.phone}</p>
    //                             <p>:{customer.email}</p> 
    //                         </span>
    //                     </div>
    //                 </section>

    //                 <aside>
    //                     <h5>INVOICE</h5>
    //                     <span className='display--flex'>
    //                         <header  className='font--bold'>
    //                             <p>Bill No</p>
    //                             <p>Date</p>
    //                             <p>Type</p>
    //                             <p>Rate</p>
    //                         </header>

    //                         <span>
    //                             <p>:{bill.billId}</p>
    //                             <p>:{`${date.toLocaleDateString()}`}</p>
    //                             <p>:{bill.billType}</p>
    //                             <p>:{bill.rate}</p>
    //                         </span>
    //                     </span>
    //                 </aside>
    //             </div> 

    //             <div className='scroll--table invoice-product-table'>
    //                 <ProductTable 
    //                     calledBy = 'invoice'
    //                     billProductList={billProductList} 
    //                 />
    //             </div>

    //             <div>
    //                 <TotalCard bill={bill}/>

    //                 <aside>
    //                     <section className='condition-section'>
    //                         <header>
    //                             <h5>TEARM &#38; CONDITION/NOTES</h5>
    //                         </header>
    //                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    // molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    // numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    // optio, eaque rerum! Provident similique accusantium nemo autem.</p>
    //                     </section>

    //                     <section className='signiture'>
    //                         <span>
    //                             <img id='signiture-sample' src={SignitureSampleIcon} alt="owner-signiture" />
    //                             <hr />
    //                             <h5>Owner Name</h5>
    //                         </span>
                            
    //                     </section>
    //                 </aside>
    //             </div>
                
    //         </main>
            
    //         <footer>
    //             {
    //                 [{icon:PhoneIcon, item:['01-4537473', '+977-9857363548']}, {icon:InternetIcon, item:['facebook.com', 'website.com']}, {icon:PancardIcon, item:['PAN No:', '9347534753845738']}]
    //                 .map((value, index)=>{
    //                     return(
    //                         <section key={`footerlink${index}`}>
    //                             <div>
    //                                 <img src={value.icon} alt={(value.icon).toString()} />
    //                             </div>
    //                             <div>
    //                                 {value.item.map((data,index)=>{
    //                                     return  <p>{data}</p>
    //                                 })}
    //                             </div>
    //                         </section>
    //                     )
    //                 })
    //             }
    //         </footer>
            
    //         <span id='footer-design-2'></span>
    //         <span id='footer-design'></span>

    //     </div>
    )
});

export default InvoicePdf