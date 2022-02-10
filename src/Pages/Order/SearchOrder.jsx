import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi'
import { FaFilter, FaSortAmountUpAlt } from 'react-icons/fa';
import { Fetch_Orders_Summary } from '../../API/UserServer';
import SearchTable from '../../Components/Order/SearchTable';
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
    const [pageNumber, setPageNumber] = useState(page);

    const showHandler=()=>{
        (showSearchInput)
            ? setShowSearchInput(false)
            : setShowSearchInput(true)
    }

    const FetchOrderSummary=()=>{
        Fetch_Orders_Summary(`?page=${pageNumber}`)
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

    const changePagehandler =(btnName)=>{
        if(ordersSummary.next !== null && btnName === 'next'){

            setPageNumber(pageNumber+1);
        }
        else if(ordersSummary.previous !== null && btnName === 'previous'){

            setPageNumber(pageNumber-1);
        }
    }

    useEffect(()=>{
        history.push({
            pathname: '/order/search',
            search: `?page=${ pageNumber}`
        });

        FetchOrderSummary();
    },[pageNumber]);

    useEffect(()=>{
        FetchOrderSummary()
    },[])


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
                            {/* <select name="billType" id="billType" className="dropdown-toggle" value={billType} onChange={changeBillTypeHandler}> */}
                            <select name="billType" id="billType" className="dropdown-toggle">
                                <option value="all">All</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                            </select>
                        </span>

                        <span>
                            <p>Status</p>
                            {/* <select name="billStatus" id="billType" className="dropdown-toggle" value={billStatus} onChange={changeBillStatusHandler}> */}
                            <select name="billStatus" id="billType" className="dropdown-toggle">
                                <option value="all">All</option>
                                <option value="submitted">Completed</option>
                                <option value="draft">Inprogress</option>
                                <option value="draft">Pending</option>
                            </select>
                        </span>
                    </section>
                    
                    <aside>
                        <DatePickerComponent
                            allowEdit={false}
                            format="MMM dd, yyyy"
                            // onChange={datePickerHandler}
                            style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}} 
                        ></DatePickerComponent>

                        {/* <input type="search" value={searchValue.initial}  onChange={filterInputHandler} className="form-control" placeholder='Search Customer...'/> */}
                        <input type="search" className="form-control" placeholder='Search Customer...'/>
                        {/* <button type="button" className="btn btn-primary search-btn" onClick={searchButtonHandler}> */}
                        <button type="button" className="btn btn-primary search-btn">
                            <i><HiSearch/></i>
                        </button>
                    </aside>
                </div>
            </span>
            
        </section>

        <SearchTable ordersSummary={ordersSummary} changePagehandler={changePagehandler}/>
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