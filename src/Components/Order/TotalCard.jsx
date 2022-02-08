import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';


function TotalCard({order, inputHandler}) {
    const location = useLocation().pathname.replace('/','')
    console.log(location);
    let {customerProductWeight, customerProductAmount, finalWeight, grandTotalWeight, grandTotalAmount, advanceAmount, totalAmount, submittionDate, remark} = order;

    return (
        <div className="card bill-totals--card scroll-off">
            <div className="card-body">
                <span>
                    <p>Final Weight : <span>{finalWeight}</span></p>
                    <p>Customer P.Weight : <span> <input type="number" name='customerProductWeight' value={(customerProductWeight == null )? 0: customerProductWeight} onChange={inputHandler}/></span></p>
                </span>
                <hr />

                <span>
                    <h5>Grand Weight : <span>{(isNaN(grandTotalWeight))? 0.0 :  grandTotalWeight}</span></h5>
                </span>
                <hr />

                <span>
                    <p>Final P.Amount : <span>{totalAmount}</span></p>
                    <p>Customer P.Amount : <span>{(isNaN(customerProductAmount)) ? 0.0 :  customerProductAmount}</span></p>
                </span>
                <hr />

                <span>
                    <h5>Grand Total Amount : <span>{grandTotalAmount}</span></h5>
                </span>
                <hr />

                <span>
                    <p>Advance payment : <span> <input name='advanceAmount' type="number"  value={advanceAmount} onChange={inputHandler} /></span></p>
                    <p>Submittion Date: <input name='submittionDate' style={{width:'fit-content'}} type="date"  value={submittionDate} onChange={inputHandler} /></p>
                </span>
                <hr />

                <span>
                    <p style={{marginBottom:'0rem'}}>Remark : <span> <textarea type="text" name='remark' placeholder='any other info....' value={remark} onChange={inputHandler} style={{fontSize: '1rem'}}/></span></p>
                </span>
            </div>
        </div>  
    )
}

//backgroundColor: (isSubmittionDateExist)? 'red':''
export default TotalCard
