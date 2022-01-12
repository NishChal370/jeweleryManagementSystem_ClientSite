import React, { useEffect, useState } from 'react'

import { Dashboard, Rate } from '../../Pages/index'

import { Switch, Route, useHistory } from 'react-router-dom'


function Main() {
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
        <main id="main" className="main">
            
            <div className="pagetitle">
                <h1>{(nowlocation === '') ? 'Dashboard' : nowlocation.split("/", 2)[0]}</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item curser--on-hover" onClick={()=>history.push('/')}>
                            <p>Home</p>
                        </li>
                        
                        <li className="breadcrumb-item active">
                            {nowlocation}
                        </li>
                    </ol>
                </nav>
            </div>
            
            <Switch>
                <Route path="/rate">
                    <Rate/>
                </Route>

                <Route path="/">
                    <Dashboard/>
                </Route>
            </Switch>
            
        </main>
    );
}

export default Main
