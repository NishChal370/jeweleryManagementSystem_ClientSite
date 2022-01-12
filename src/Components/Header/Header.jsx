import axios from 'axios';

import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import { ShopLogo, ProfileImage } from '../../Assets/img/index'

function Header() {
    const history = useHistory();  
    const[todaysRate, settodaysRate] = useState();  

    const fetchRate=()=>{
        axios.get('http://127.0.0.1:8000/api/rates/')
        .then(function (response) {
            // handle success
            settodaysRate(response.data[response.data.length-1])
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    useEffect(() => {
        fetchRate()
    },[])

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">

                <div className="logo d-flex align-items-center curser--on-hover" onClick={()=>{history.push('/')}}>
                    <img src={ShopLogo} alt="shop-logo"/>
                    <span className="d-none d-lg-block">Gitanjali Jewellers</span>
                </div>

                <i className="bi bi-list toggle-sidebar-btn" data-bs-toggle="sidebar" data-bs-target="#ssidebar" aria-controls="ssidebar"></i>
            </div>


            <nav className="header-nav ms-auto d-flex">

                <ul className='nav-rate-board d-flex curser--on-hover' onClick={()=>{history.push('/rate')}}>
                    <li className='align-items-center'>
                        <p>Hallmark:</p>
                        <p>Tajabi:</p>
                        <p>Silver:</p>
                    </li>
                    
                    <li className='align-items-center ms-4'>
                        <p>Rs. {(todaysRate === undefined)? "Null": todaysRate.hallmarkRate} /tola</p>
                        <p>Rs. {(todaysRate === undefined)? "Null": todaysRate.tajabiRate} /tola</p>
                        <p>Rs. {(todaysRate === undefined)? "Null": todaysRate.silverRate} /tola</p>
                    </li>
                </ul>

                <ul className="d-flex align-items-center ms-5">
                    <li className="nav-item dropdown pe-3">
                        {/*  Profile Image Icon  */}
                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                            <img src={ProfileImage} alt="Profile" className="rounded-circle"/>
                            <span className="d-none d-md-block dropdown-toggle ps-2">Nirmal Bishwokarma</span>
                        </a>

                        {/*  Profile Dropdown Items */}
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>Kevin Anderson</h6>
                                <span>Shop Owner</span>
                            </li>

                            <li>
                                <hr className="dropdown-divider"/>
                            </li>

                            {
                                ['My Profile', 'Account Settings', 'Need Help?', 'Sign Out'].map(
                                    (item, index)=>{
                                        return (
                                            <span key={index+"profileDropDown"}>
                                                <li>
                                                    <a className="dropdown-item d-flex align-items-center">
                                                        <i className="bi bi-person"></i>
                                                        <span>{item}</span>
                                                    </a>
                                                </li>

                                                <li>
                                                    <hr className="dropdown-divider"/>
                                                </li>
                                            </span>
                                        )
                                    }
                                )
                            }
                        </ul>
                    </li>
                </ul>

            </nav>
        </header>
    )
}

export default Header
