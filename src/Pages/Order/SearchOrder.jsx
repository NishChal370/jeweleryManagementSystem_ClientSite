import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { HiSearch } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import { Fetch_Orders_Summary, Fetch_Order_By_Id } from '../../API/UserServer';
import SearchTable from '../../Components/Order/SearchTable';
import { FaFilter, FaSortAmountUpAlt } from 'react-icons/fa';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});


function SearchOrder() {
    const history = useHistory();
    const location = useLocation();
    const [ordersSummary, setOrdersSummary] = useState();
    const [showSearchInput, setShowSearchInput] = useState(false);
    const page = (location.search !== '') ?parseInt(location.search.slice(-1)) :1;
    const [filter, setFilter] = useState({pageNumber: page, type: 'all', status:'all', customerInfo:{initial:'', confirm:''}, date:'None'});

    const showHandler=()=>{
        (showSearchInput)
            ? setShowSearchInput(false)
            : setShowSearchInput(true)
    }

    const FetchOrderSummary=()=>{
        let {pageNumber, type, status, customerInfo, date} = filter;
        Fetch_Orders_Summary(`?customerInfo=${(customerInfo.confirm === '')?'None' : customerInfo.confirm}&type=${type}&status=${status}&date=${date}&page=${pageNumber}`)
            .then(function(response){

                setOrdersSummary(response.data)
            })
            .catch(function(error){
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
            })
    }

    const FetchOrderById=(orderId)=>{
        Fetch_Order_By_Id(orderId)
            .then(function(response){

                // console.log(response.data);
                history.push({pathname:'/order', state: response.data})
            })
            .catch(function(error){
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
            })
    }

    const buttonHandler=(btnName, orderId)=>{
        // console.log(btnName);
        // console.log(orderId);
        FetchOrderById(orderId);

    }

    const changePagehandler =(btnName)=>{
        if(ordersSummary.next !== null && btnName === 'next'){
            filter.pageNumber = filter.pageNumber +1;

            setFilter({... filter});
        }
        else if(ordersSummary.previous !== null && btnName === 'previous'){
            filter.pageNumber = filter.pageNumber -1;

            setFilter({... filter});
        }
    }

    const changefilterInputHandler=({target})=>{
        let  {name, value} = target;

        if(name === 'customerInfo'){
            filter.customerInfo.initial = value;

            (value === '') && (searchButtonHandler())
        }
        else if (name === 'datepicker'){

            filter.date = (target.value != null) ? format(target.value, 'yyyy-MM-dd') : 'None';
            filter.pageNumber = 1;
        }
        else{
            filter[name] = value;
            filter.pageNumber = 1;
        }
        
        
        setFilter({...filter});
    }

    const searchButtonHandler = ()=>{
        filter.customerInfo.confirm = filter.customerInfo.initial;
        filter.pageNumber = 1;

        setFilter({...filter});
    }

    useEffect(()=>{
        history.push({
            pathname: '/order/search',
            search: `?page=${ filter.pageNumber }`
        });

        FetchOrderSummary();
    },[filter.pageNumber, filter.type, filter.status, filter.customerInfo.confirm, filter.date]);


    return (
    <div className="card background--none " id='search-card'>
        <section className={`top-icons`}>
            <span>
                <div className='filter-btn'>   
                    <p><i><FaSortAmountUpAlt/></i> Sort</p>
                    <p onClick={showHandler}><i><FaFilter/></i> Filter</p>
                </div>
                
                <div className={`search-input mb-3 ${(showSearchInput)? 'show' :'hide'}`}>
                    <section>
                        <span>
                            <p>Type</p>
                            <select name="type" id="billType" className="dropdown-toggle" value={filter.type} onChange={changefilterInputHandler}>
                                <option value="all">All</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                            </select>
                        </span>

                        <span>
                            <p>Status</p>
                            <select name="status" id="billType" className="dropdown-toggle" value={filter.status} onChange={changefilterInputHandler}>
                                <option value="all">All</option>
                                <option value="completed">Completed</option>
                                <option value="inprogress">Inprogress</option>
                                <option value="pending">Pending</option>
                            </select>
                        </span>
                    </section>
                    
                    <aside>
                        <DatePickerComponent
                            allowEdit={false}
                            name="datepicker"
                            format="MMM dd, yyyy"
                            onChange={changefilterInputHandler}
                            style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}} 
                        ></DatePickerComponent>

                        <input type="search" className="form-control" name='customerInfo' placeholder='Search Customer...' value={filter.customerInfo.initial} onChange={changefilterInputHandler}/>
                        <button type="button" className="btn btn-primary search-btn" onClick={searchButtonHandler}>
                            <i><HiSearch/></i>
                        </button>
                    </aside>
                </div>
            </span>
            
        </section>

        <SearchTable ordersSummary={ordersSummary} changePagehandler={changePagehandler} buttonHandler={buttonHandler}/>
    </div>
  )
}

export default SearchOrder



/**
 * <span className='d-flex' style={{justifyContent:'space-between'}}>
                    <div className='d-flex gap-2'>
                        <p>pending</p>
                        <p>inprogress</p>
                        <p>completed</p>
                    </div>
                    {/* <div className='filter-btn'>   /*
                    <div className='d-flex gap-2'>  
                        <p><i><FaSortAmountUpAlt/></i> Sort</p>
                        <p onClick={showHandler}><i><FaFilter/></i> Filter</p>
                    </div>
                </span>
 */