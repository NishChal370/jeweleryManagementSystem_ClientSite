import React from 'react'

function TotalCard({bill, finalWeight,  grandTotalWeight, inputHandler}) {
    let {customerProductWeight, customerProductAmount, discount, grandTotalAmount, advanceAmount, payedAmount, remainingAmount, totalAmount} = bill;

    return (
        <div className="card bill-totals--card number-textfield-enable-scroll">
            <div className="card-body">
                <span>
                    <p>Final Weight : <span>{finalWeight}</span></p>
                    <p>Customer P.Weight : <span> <input type="number" name='customerProductWeight' value={customerProductWeight} onChange={inputHandler}/></span></p>
                </span>
                <hr />

                <span>
                    <h5>Grand Weight : <span>{(isNaN(grandTotalWeight))? 0.0 :  grandTotalWeight}</span></h5>
                </span>
                <hr />

                <span>
                    <p>Final P.Amount : <span>{totalAmount}</span></p>
                    <p>Customer P.Amount : <span>{(isNaN(customerProductAmount)) ? 0.0 :  customerProductAmount}</span></p>
                    <p>Discount : <span> <input type="number" name='discount' value={discount} onChange={inputHandler}/></span></p>
                </span>
                <hr />

                <span>
                    <h5>Grand Total Amount : <span>{grandTotalAmount}</span></h5>
                </span>
                <hr />

                <span>
                    <p>Advance payment : <span> <input type="number" name='advanceAmount' value={advanceAmount} onChange={inputHandler}/></span></p>
                    <p>Payment : <span> <input type="number" name='payedAmount' value={payedAmount} onChange={inputHandler}/></span></p>
                </span>
                <hr />

                <span>
                    <p>Remaining Amount : <span>{remainingAmount}</span></p>
                </span>

            </div>
        </div>  
    )
}

export default TotalCard
