import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { IoReceiptOutline } from 'react-icons/io5';

function SideNav() {
    const history  = useHistory();
    const [currentLocation, setCurrentLocation] = useState('');

    useEffect(() => {

        history.listen(location=>{
            setCurrentLocation(
                ((location.pathname.replaceAll('/', '').charAt(0).toUpperCase()+location.pathname.slice(2)).replaceAll('/', ' / ').split("/", 2)[0]).trim().toLowerCase()
                );
        });

        let location = history.location;
        setCurrentLocation(
            ((location.pathname.replaceAll('/', '').charAt(0).toUpperCase()+location.pathname.slice(2)).replaceAll('/', ' / ').split("/", 2)[0]).trim().toLowerCase()
            );

    }, []);

    return (
        <aside id="ssidebar toggle-sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-item curser--on-hover " name='dashboard' onClick={()=>history.push('/')}>
                    <a className={`nav-link ${(currentLocation !== '')? 'collapsed': ""}`}>
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <li className="nav-item  curser--on-hover"  name='bill' onClick={()=>history.push('/rate')}>
                    <a className={`nav-link ${(currentLocation !== 'rate')? 'collapsed': ""}`}>
                        <i><IoReceiptOutline/></i>
                        <span>Bill</span>
                    </a>
                </li>
            </ul>
        </aside>

    )
}

export default SideNav
