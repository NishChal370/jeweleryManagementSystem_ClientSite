import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AssignWork from './AssignWork';
import StaffInfo from './StaffInfo';
import WorkDetail from './WorkDetail';

function Staff() {
  return (
    <Switch> 
        <Route path="/staff/assign">
          <AssignWork/>
        </Route> 

        <Route path="/staff/work">
          <WorkDetail/>
        </Route>  

        <Route path="/staff">
          <StaffInfo/>
        </Route>                 
    </Switch>
  )
}

export default Staff