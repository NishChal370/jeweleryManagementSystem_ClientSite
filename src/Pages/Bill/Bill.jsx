import './bill.css'
import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import Invoice from './Invoice';
import SearchBill from './SearchBill';
import GenerateBill from './GenerateBill';
import { VerifyInputs } from '../../Components/Common/validation';


function Bill() {
    
    useEffect(() => {
        VerifyInputs();
    }, []);


    return (
        <div>
            <Switch>   
                <Route path="/bill/invoice">
                    <Invoice/>
                </Route>

                <Route path="/bill/search">
                    <SearchBill/>
                </Route>

                <Route path="/bill">
                    <GenerateBill/>
                </Route>                
            </Switch> 
        </div>
    )
}


export default Bill
