import './bill.css'
import React, { useEffect } from 'react'
import { NavLink, Route, Switch, useHistory } from 'react-router-dom';
import Invoice from './Invoice';
import SearchBill from './SearchBill';
import GenerateBill from './GenerateBill';
import { VerifyInputs } from '../../Assets/js/validation';


function Bill() {

    const location = useHistory().location.pathname;

    
    useEffect(() => {
        VerifyInputs();
    }, []);


    return (
        <div>
            <span className='d-flex justify-content-end'>
                <div className='rate-datepicker card-title  m-0 p-0 pb-3'>                                                                                                                                                    
                    <NavLink 
                        to="/bill" 
                        style={{color: (location === '/bill') ? '#899bbd' : ''}}
                    >
                        Generate
                    </NavLink>
                    &#160; / &#160;
                    <NavLink 
                        to="/bill/search"
                        style={{color: (location === '/bill/search') ? '#899bbd' : ''}}
                    >
                        Search
                    </NavLink>
                </div>
            </span>

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
