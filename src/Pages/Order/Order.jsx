import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlaceOrder from './PlaceOrder';

function Order() {
  return(
        <Switch>         
            <Route path="/order">
                <PlaceOrder/>
            </Route>                
        </Switch>
  )
}

export default Order;
