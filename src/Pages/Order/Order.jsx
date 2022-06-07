import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { VerifyInputs } from '../../Components/Common/validation';
import OrderView from './OrderView';
import PlaceOrder from './PlaceOrder';
import SearchOrder from './SearchOrder';

function Order() {
  
  useEffect(() => {
    VerifyInputs();
  }, []);

  return(
        <Switch> 
            <Route path="/order/view">
              <OrderView/>
            </Route> 
            <Route path="/order/search">
              <SearchOrder/>
            </Route>        
            <Route path="/order">
                <PlaceOrder/>
            </Route>                
        </Switch>
  )
}

export default Order;
