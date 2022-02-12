import React from 'react';
import './invoice.css';
import { Invoice } from '../../Pages';

const InvoicePdf = React.forwardRef(({customer, bill, billProductList}, ref) => {
    return (
        <div ref={ref}>
            <Invoice customer={customer} bill={bill} billProductList={billProductList}/>
        </div>
    )
});

export default InvoicePdf