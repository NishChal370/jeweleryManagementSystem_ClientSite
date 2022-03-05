import '../../Assets/css/style.css'
import React, { useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { Admin, Bill, Dashboard, Order, Rate, Staff } from '../../Pages/index'

function Main({isSideBarDisplayed}) {

    const history = useHistory();
    const [nowlocation, setNowLocation] = useState('Dashboard');

    const setNavigation=(location)=>{
        setNowLocation((location.pathname.replaceAll('/', '').charAt(0).toUpperCase()+location.pathname.slice(2)).replaceAll('/', ' / '));
    }
    

    useEffect(() => {
        history.listen(location=>{
            setNavigation(location);
        });

        setNavigation(history.location);
    }, [])

    
    return (
        <main id="main" className="main" style={{marginLeft: (!isSideBarDisplayed)? '0px': '300px'}}>
            
            <div className="pagetitle">
                <h1>{(nowlocation === '') ? 'Dashboard' : nowlocation.split("/", 2)[0]}</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item curser--on-hover d-flex" onClick={()=>history.push('/')}>
                        <i className="bi bi-house-door px-1"></i>
                            <p>Home</p>
                        </li>
                        
                        <li className="breadcrumb-item active">
                            {nowlocation}
                        </li>
                    </ol>
                </nav>
            </div>
            
            <Switch>
                <Route path="/admin">
                    <Admin/>
                </Route>
                
                <Route path="/bill">
                    <Bill/>
                </Route>

                <Route path="/rate">
                    <Rate/>
                </Route>

                <Route path='/order'>
                    <Order/>
                </Route>

                <Route path='/staff'>
                    <Staff/>
                </Route>

                <Route path="/">
                    <Dashboard/>
                </Route>
            </Switch>
            
        </main>
    );
}

export default Main
