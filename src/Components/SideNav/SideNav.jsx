import React from 'react'

function SideNav() {
    return (
        <aside id="ssidebar toggle-sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <a className="nav-link ">
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
            </ul>
        </aside>

    )
}

export default SideNav
