import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import ChangeRate from './ChangeRate';
import '../../Assets/css/style.css'
import RateOverview from './RateOverview';

function Rate() {
    const history = useHistory();

    return (
        <div className="card background--color">
            <div className="card-body rate-panel">
                {/* NAV */}
                <ul className="nav nav-tabs "  id="myTab" role="tablist">
                    <li className="nav-item "  role="presentation">                                                                                                                   {/*   onClick={()=>history.push('/rate/')} */}
                        <button name='overView' className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" 
                            onClick={()=>history.push('/rate')} 
                        > 
                            Overview
                        </button>
                    </li>

                    <li className="nav-item "  role="presentation">                                                                                                                                             {/*   onClick={()=>history.push('/rate/change-rate')} */}
                        <button name= 'changeRate' className="nav-link" id="change-rate-tab" data-bs-toggle="tab" data-bs-target="#change-rate" type="button" role="tab" aria-controls="change-rate" aria-selected="false"  
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
                                    {/* <h1>HELOOOOOOOOOOOOOOOOOOOOOOOOO</h1> */}
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