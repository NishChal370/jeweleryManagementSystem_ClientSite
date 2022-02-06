import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './../../Components/Invoice/invoice.css';
import { Fetch_Bill_By_Id } from '../../API/UserServer';
import { ProductTable, TotalCard } from '../../Components';
import { InternetIcon, PancardIcon, PhoneIcon, ShopLogo, SignitureSampleIcon } from '../../Assets/img';
import { useHistory } from 'react-router-dom';


const date = new Date();

function Invoice(props) {
    const history = useHistory();
    const billId = useLocation().state;
    const [billDetail, setBillDetail] = useState();


    const fetchBillById =()=>{
        Fetch_Bill_By_Id(billId)
            .then(function (response) {
                // handle success
                let bill = response.data;
                const customer = bill.customer;
                const billProductList = bill.billProduct;

                delete bill.customer;
                delete bill.billProduct;

                setBillDetail({customer, bill,billProductList});             
            })
            .catch(function (error) {
                // handle error
                console.log("error");
            });
    }


    useEffect(()=>{
        (billId === undefined || history.location.pathname === '/bill')
            ? setBillDetail(props)
            : fetchBillById()
    },[props])
   

    return (
        <div id='print-me'  className= "card bill-pdf">
        {(billDetail !== undefined) &&(
            <>
            <h1 className='water-marker'>Gitanjali Jewellers</h1>
            <h1 className='water-marker2'>Gitanjali Jewellers</h1>
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
                        <h5>{billDetail.customer.name}</h5>
                        <hr />
                        <div className='display--flex'>
                            <header className='font--bold'>
                                <p>A</p>
                                <p>P</p>
                                <p>E</p>
                            </header>

                            <span>
                                <address>:{billDetail.customer.address}</address>
                                <p>:{billDetail.customer.phone}</p>
                                <p>:{billDetail.customer.email}</p> 
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
                                <p>Rate</p>
                            </header>

                            <span>
                                <p>:{billDetail.bill.billId}</p>
                                {/* <p>:{`${date.toLocaleDateString()}`}</p> */}
                                <p>{billDetail.bill.date}</p>
                                <p>:{billDetail.bill.billType}</p>
                                <p>:{billDetail.bill.rate}</p>
                            </span>
                        </span>
                    </aside>
                </div> 

                <div className='scroll--table invoice-product-table'>
                    <ProductTable 
                        calledBy = 'invoice'
                        billProductList={billDetail.billProductList} 
                    />
                </div>

                <div>
                    <TotalCard bill={billDetail.bill} inputHandler={()=>{}}/>

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
                                <img id='signiture-sample' src={SignitureSampleIcon} alt="owner-signiture" />
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
                                        return  <p key={`${index}CDTL`}>{data}</p>
                                    })}
                                </div>
                            </section>
                        )
                    })
                }
            </footer>
            
            <span id='footer-design-2'></span>
            <span id='footer-design'></span>
            </>
        )}
        </div>
    )
}

export default Invoice;
