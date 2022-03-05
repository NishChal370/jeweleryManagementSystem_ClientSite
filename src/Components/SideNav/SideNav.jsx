import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IoReceiptOutline } from 'react-icons/io5';
import { GiFlatHammer, GiPriceTag, GiTeamIdea } from 'react-icons/gi';
import { FaUserTie } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';


function SideNav({isDisplay}) {

    const history  = useHistory();
    const [currentLocation, setCurrentLocation] = useState('');
    const [fullLocation, setFullLocation] = useState('');


    useEffect(() => {
        history.listen(location=>{
            setFullLocation(location.pathname);

            setCurrentLocation(
                ((location.pathname.replaceAll('/', '').charAt(0).toUpperCase()+location.pathname.slice(2)).replaceAll('/', ' / ').split("/", 2)[0]).trim().toLowerCase()
                );
        });

        let location = history.location;
        setFullLocation(location.pathname);

        setCurrentLocation(
            ((location.pathname.replaceAll('/', '').charAt(0).toUpperCase()+location.pathname.slice(2)).replaceAll('/', ' / ').split("/", 2)[0]).trim().toLowerCase()
            );

    }, []);


    return (
        <aside id="sidebar" className="sidebar" style={{left: (isDisplay)? '0px': '-300px'}}>
            <ul className="sidebar-nav" id="sidebar-nav">

                <li className="nav-item curser--on-hover " name='dashboard' onClick={()=>history.push('/')}>
                    <a className={`nav-link ${(currentLocation !== '')? 'collapsed': ""}`}>
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${(currentLocation !== 'bill')? 'collapsed': ""}`} data-bs-target="#components-nav" data-bs-toggle="collapse" href="#" arial-aria-expanded="true">
                        <i><IoReceiptOutline/></i>
                        <span>Bill</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="components-nav" className={`nav-content  curser--on-hover ${(currentLocation !== 'bill')? 'collapse': "collapse show"}`} data-bs-parent="#sidebar-nav" >
                        <li onClick={()=>history.push('/bill')}>
                            <a >
                                <i className="bi bi-circle" style={{backgroundColor: (fullLocation !== '/bill')? 'white': 'blue' }}></i><span>Generate</span>
                            </a>
                        </li>
                        <li onClick={()=>history.push('/bill/search')}>
                            <a >
                                <i className="bi bi-circle"style={{backgroundColor: (fullLocation !== '/bill/search')? 'white': 'blue' }}></i><span>Search</span>
                            </a>
                        </li>
                    
                    </ul>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${(currentLocation !== 'order')? 'collapsed': ""}`} data-bs-target="#order-nav" data-bs-toggle="collapse" href="#" arial-aria-expanded="true">
                        <i><GiFlatHammer/></i>
                        <span>Order</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>

                    <ul id="order-nav" className={`nav-content  curser--on-hover ${(currentLocation !== 'order')? 'collapse': "collapse show"}`} data-bs-parent="#sidebar-nav" >
                        <li onClick={()=>history.push('/order')}>
                            <a>
                                <i className="bi bi-circle" style={{backgroundColor: (fullLocation !== '/order')? 'white': 'blue' }}></i><span>Place order</span>
                            </a>
                        </li>

                        <li onClick={()=>history.push('/order/search')}>
                            <a>
                                <i className="bi bi-circle"style={{backgroundColor: (fullLocation !== '/order/search')? 'white': 'blue' }}></i><span>Overview</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${(currentLocation !== 'rate')? 'collapsed': ""}`} data-bs-target="#rate-nav" data-bs-toggle="collapse" href="#" arial-aria-expanded="true">
                        <i><GiPriceTag/></i>
                        <span>Rate</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>

                    <ul id="rate-nav" className={`nav-content  curser--on-hover ${(currentLocation !== 'rate')? 'collapse': "collapse show"}`} data-bs-parent="#sidebar-nav" >
                        <li onClick={()=>history.push('/rate')}>
                            <a >
                                <i className="bi bi-circle" style={{backgroundColor: (fullLocation !== '/rate')? 'white': 'blue' }}></i><span>Overview</span>
                            </a>
                        </li>
                        <li onClick={()=>history.push('/rate/change-rate')}>
                            <a >
                                <i className="bi bi-circle"style={{backgroundColor: (fullLocation !== '/rate/change-rate')? 'white': 'blue' }}></i><span>Change Rate</span>
                            </a>
                        </li>
                    
                    </ul>
                </li>
                 
                <li className="nav-item">
                    <a className={`nav-link ${(currentLocation !== 'staff')? 'collapsed': ""}`} data-bs-target="#staff-nav" data-bs-toggle="collapse" href="#" arial-aria-expanded="true">
                        <i><HiOutlineUserGroup/></i>
                        <span>Staff</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>

                    <ul id="staff-nav" className={`nav-content  curser--on-hover ${(currentLocation !== 'staff')? 'collapse': "collapse show"}`} data-bs-parent="#sidebar-nav" >
                        <li onClick={()=>history.push('/staff')}>
                            <a >
                                <i className="bi bi-circle" style={{backgroundColor: (fullLocation !== '/staff')? 'white': 'blue' }}></i><span>Staff Detail</span>
                            </a>
                        </li>

                        <li onClick={()=>history.push('/staff/work')}>
                            <a >
                                <i className="bi bi-circle"style={{backgroundColor: (fullLocation !== '/staff/work')? 'white': 'blue' }}></i><span>Work Detail</span>
                            </a>
                        </li>
                    
                        <li onClick={()=>history.push('/staff/assign')}>
                            <a>
                                <i className="bi bi-circle"style={{backgroundColor: (fullLocation !== '/staff/assign')? 'white': 'blue' }}></i><span>Assign Work</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${(currentLocation !== 'admin')? 'collapsed': ""}`} data-bs-target="#admin-nav" data-bs-toggle="collapse" href="#" arial-aria-expanded="true">
                        <i><FaUserTie/></i>
                        <span>Admin</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>

                    <ul id="admin-nav" className={`nav-content  curser--on-hover ${(currentLocation !== 'admin')? 'collapse': "collapse show"}`} data-bs-parent="#sidebar-nav" >
                        <li onClick={()=>history.push('/admin')}>
                            <a >
                                <i className="bi bi-circle" style={{backgroundColor: (fullLocation !== '/admin')? 'white': 'blue' }}></i><span>Profile</span>
                            </a>
                        </li>

                        <li onClick={()=>history.push('/admin/setting')}>
                            <a >
                                <i className="bi bi-circle" style={{backgroundColor: (fullLocation !== '/admin/setting')? 'white': 'blue' }}></i><span>Change Password</span>
                            </a>
                        </li>
                    </ul>
                </li> 
            </ul>
        </aside>

    )
}


export default SideNav
