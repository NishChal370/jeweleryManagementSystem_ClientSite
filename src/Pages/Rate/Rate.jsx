import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';

import ChangeRate from './ChangeRate';
import RateOverview from './RateOverview';

import '../../Assets/css/style.css'

function Rate() {

    const history = useHistory();
    const [currentLocation, setCurrentLocation] = useState();

    
    useEffect(() => {
        let tempLocation = history.location.pathname.split('/');
        tempLocation = tempLocation[tempLocation.length-1];

        history.listen(location=>{
            tempLocation = location.pathname.split('/')

            setCurrentLocation(tempLocation[tempLocation.length-1]);
        });

        setCurrentLocation(tempLocation);
    }, []);


    return (
        <div className="card background--color">
            <div className="card-body rate-panel">
                {/* NAV */}
                <ul className="nav nav-tabs "  id="myTab" role="tablist">
                    <li className="nav-item "  role="presentation">                                                                                                                   {/*   onClick={()=>history.push('/rate/')} */}
                        <button name='overView'id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" 
                            className={`nav-link ${(currentLocation === 'rate')? 'active': ""}`} 
                            onClick={()=>history.push('/rate')} 
                        > 
                            Overview
                        </button>
                    </li>

                    <li className="nav-item "  role="presentation">                                                                                                                                             {/*   onClick={()=>history.push('/rate/change-rate')} */}
                        <button name= 'changeRate' id="change-rate-tab" data-bs-toggle="tab" data-bs-target="#change-rate" type="button" role="tab" aria-controls="change-rate" aria-selected="false"  
                            className={`nav-link ${(currentLocation === 'change-rate')? 'active': ""}`} 
                            onClick={()=>history.push('/rate/change-rate')}
                        >
                            Change Rate
                        </button>
                    </li>
                </ul>


                {/* BODY */}
                <main>
                    <div className="tab-content" id="myTabContent">
                        <Switch>                                  
                            <Route path="/rate/change-rate">
                                <div className="tab-pane fade active show" id="change-rate" role="tabpanel" aria-labelledby="change-rate-tab">
                                    <ChangeRate/>
                                </div>
                            </Route>

                            <Route path="/rate">
                                <div className="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <RateOverview/>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </main>


            </div>
        </div>
    )
}

export default Rate