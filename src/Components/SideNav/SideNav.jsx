import React from 'react'
import { useHistory } from 'react-router-dom';

function SideNav() {
    const history  = useHistory();
    return (
        <aside id="ssidebar toggle-sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item curser--on-hover" onClick={()=>history.push('/')}>
                    <span className="nav-link ">
                        <i className="bi bi-grid"></i>
                        
                        <span>Dashboard</span>
                    </span>
                </li>
            </ul>

        </aside>

    )
}

export default SideNav
