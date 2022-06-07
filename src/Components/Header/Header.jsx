import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShopLogo } from '../../Assets/img/index';
import { setAdminInfo, setLatestRate } from '../../Redux/Action';
import { Fetch_All_Rates, GET_ADMIN_DETAIL } from '../../API/UserServer';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
});


function Header({isDisplayed, showSideBarHandler,logoutHandler}) {

    const history = useHistory();  
    const dispatch = useDispatch();
    const [todaysRate, setTodaysRate] = useState();  
    const [adminDetail, setAdminDetail] = useState();
    const adminInfo = useSelector(state => state.adminInfoReducer.data);
    const latestRate = useSelector(state => state.latestRateReducer.data);
    
    const fetchRate=()=>{
        Fetch_All_Rates()
            .then(function (response) {
                // handle success
                dispatch(setLatestRate(response.data[response.data.length-1]));
            })
            .catch(function (error) {
                // handle error
                Toast.fire({
                    icon: 'error',
                    title: error
                });

                dispatch(setLatestRate({rateId: undefined, date: undefined, hallmarkRate: 0, tajabiRate: 0 , silverRate: 0}));
                console.error(error);
            })

    };

    const GetAdminDetail=()=>{
        GET_ADMIN_DETAIL()
            .then((response)=>{
                dispatch(setAdminInfo({profileImage: response.data.profileImage, name: response.data.first_name+" "+response.data.last_name}));
            })
            .catch((error)=>{
                console.error(error.response.data);
                alert("ERROR IN GET ADMIN DETAIL");
            })
    }

    useEffect(() => {
        fetchRate(); 
        GetAdminDetail(); 
    },[]);

    useEffect(() => {
        setTodaysRate(latestRate);
    }, [latestRate]);

    useEffect(() => {
        setAdminDetail(adminInfo);
    }, [adminInfo]);


    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                
                <div className="logo d-flex align-items-center curser--on-hover" onClick={()=>{history.push('/')}}>
                    <img src={ShopLogo} alt="shop-logo"/>
                    <span className="d-none d-lg-block">Gitanjali Jewellers</span>
                </div>

                <i className="bi bi-list toggle-sidebar-btn" onClick={()=>(isDisplayed)? showSideBarHandler(false): showSideBarHandler(true)}></i>
            </div>

            <nav className="header-nav ms-auto d-flex">

                <ul className='nav-rate-board d-flex curser--on-hover mt-1' onClick={()=>{history.push('/rate')}}>
                    <li className='align-items-center'>
                        <p>Hallmark:</p>
                        <p>Tajabi:</p>
                        <p>Silver:</p>
                    </li>

                    <li className='align-items-center ms-4 '>
                        <p>Rs. {(todaysRate === undefined)? "Null": todaysRate.hallmarkRate} /tola</p>
                        <p>Rs. {(todaysRate === undefined)? "Null": todaysRate.tajabiRate} /tola</p>
                        <p>Rs. {(todaysRate === undefined)? "Null": todaysRate.silverRate} /tola</p>
                    </li>
                </ul>

                <ul className="d-flex align-items-center ms-5">
                    <li className="nav-item dropdown pe-3">
                        {/*  Profile Image Icon  */}
                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                            {(adminDetail !== undefined)&&(
                                <>
                                <img src={`http://127.0.0.1:8000${adminDetail.profileImage}`} alt="Profile" className="rounded-circle"/>
                                <span className="d-none d-md-block dropdown-toggle ps-2">{adminDetail.name}</span>
                                </>
                            )}
                        </a>

                        {/*  Profile Dropdown Items */}
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>Nirmal Bishwokarma</h6>
                                <span>Shop Owner</span>
                            </li>

                            <li>
                                <hr className="dropdown-divider"/>
                            </li>

                            {
                                [{name:'My Profile', link:'/admin', icon:'bi-person'}, {name:'Settings', link:'/admin/setting', icon:'bi-gear'}, {name:'Sign Out', link:'', icon:'bi-box-arrow-right'}].map(
                                    ({name, link, icon}, index)=>{
                                        return (
                                            <span key={index+"profileDropDown"}>
                                                <li>
                                                    <a className="dropdown-item d-flex align-items-center" onClick={()=>{(name!== 'Sign Out')?history.push(link):logoutHandler()}}>
                                                        <i className={`bi ${icon}`}></i>
                                                        <span>{name}</span>
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
