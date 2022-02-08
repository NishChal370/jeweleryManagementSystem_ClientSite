import React from 'react'
import { useLocation } from 'react-router-dom';


function TotalCard({data, inputHandler}) {
    const location = useLocation().pathname.replace('/','')

    return (
        (data !== undefined) &&(
            <div className="card bill-totals--card scroll-off">
                <div className="card-body">
                    <span>
                        <p>Final Weight : <span>{data.finalWeight}</span></p>
                        <p>Customer P.Weight : <span> <input type="number" name='customerProductWeight' value={(data.customerProductWeight == null )? 0: data.customerProductWeight} onChange={inputHandler}/></span></p>
                    </span>
                    <hr />
    
                    <span>
                        <h5>Grand Weight : <span>{(isNaN(data.grandTotalWeight))? 0.0 :  data.grandTotalWeight}</span></h5>
                    </span>
                    <hr />
    
                    <span>
                        <p>Final P.Amount : <span>{data.totalAmount}</span></p>
                        <p>Customer P.Amount : <span>{(isNaN(data.customerProductAmount)) ? 0.0 :  data.customerProductAmount}</span></p>
                        
                        {(location.includes('order')) &&(
                            <p>Discount : <span> <input type="number" name='discount' value={(data.discount == null)? 0 : data.discount} onChange={inputHandler}/></span></p>
                        )}
                    </span>
                    <hr />
    
                    <span>
                        <h5>Grand Total Amount : <span>{data.grandTotalAmount}</span></h5>
                    </span>
                    <hr />
    
                    <span>
                        <p>Advance payment : <span> <input type="number" name='advanceAmount' value={data.advanceAmount} onChange={inputHandler}/></span></p>

                        {(location.includes('order'))
                            ? <p>Submittion Date: <input name='submittionDate' style={{width:'fit-content'}} type="date"  value={data.submittionDate} onChange={inputHandler} /></p>
                            :<p>Payment : <span> <input type="number" name='payedAmount' value={(data.payedAmount == null) ?0 :data.payedAmount} onChange={inputHandler}/></span></p>
                        }
                    </span>
                    <hr />

                    {(location.includes('order'))
                        ?(<span>
                            <p style={{marginBottom:'0rem'}}>Remark : <span> <textarea type="text" name='remark' placeholder='any other info....' value={data.remark} onChange={inputHandler} style={{fontSize: '1rem'}}/></span></p>
                        </span>)
                        :(<span>
                            <p>Remaining Amount : <span>{data.remainingAmount}</span></p>
                        </span>)
                    }   
                </div>
            </div>  
        )
        
    )
}


export default TotalCard
