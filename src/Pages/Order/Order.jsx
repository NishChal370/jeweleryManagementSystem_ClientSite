import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { VerifyInputs } from '../../Components/Common/validation';
import PlaceOrder from './PlaceOrder';

function Order() {
  useEffect(() => {
    VerifyInputs();
}, []);

  return(
        <Switch>         
            <Route path="/order">
                <PlaceOrder/>
            </Route>                
        </Switch>
  )
}

export default Order;
