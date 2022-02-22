import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { useHistory, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import { FaFilter, FaSortAmountUpAlt } from 'react-icons/fa';
import { WorkDetailTable } from '../../Components';
import { Fetch_Staff_Work } from '../../API/UserServer';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';



const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});


function WorkDetail() {
    const history = useHistory();
    const location = useLocation();
    let [staffWorkDetail, setStaffWorkDetail] = useState();
    const [showSearchInput, setShowSearchInput] = useState(false);
    const page = (location.search !== '') ?parseInt(location.search.slice(-1)) :1;
    const [filter, setFilter] = useState({page:page, orderId:'', type:'', status:'', date:'', staffInfo:{initial:'', confirm:''}})
    


    const showHandler=()=>{
        (showSearchInput)
            ? setShowSearchInput(false)
            : setShowSearchInput(true)
    }


    const FetchStaffWork =()=>{
        let {orderId, type, status, date, staffInfo, page} = filter;

        Fetch_Staff_Work(`?submittionDate=${date}&staffInfo=${staffInfo.confirm}&orderId=${orderId}&type=${type}&workStatus=${status}&page=${page}`)
            .then(function(response){
                
                setStaffWorkDetail(response.data);
            })
            .catch(function(error){
                console.log(error.response.data)
                Toast.fire({
                    icon: 'error',
                    title: "Not Found !!",
                });
            })
    }

    const directToAssignWork=(selectedWork)=>{
        let staffId = selectedWork.staff.staffId;
        let orderId = selectedWork.orderProduct.orderId;

        history.push({pathname:'/staff/assign', state:{orderId :orderId, staffId :staffId, staffWorkId :selectedWork.staffWorkId, workDetail :selectedWork}});
    }

    const inputChangeHandler=({target})=>{
        let { name, value } = target;
        console.log(value)
        if (name === 'staffInfo'){
            filter[name].initial = value;

            (value === '')&&(filter[name].confirm = '')
        }
        else if (name === 'date'){

            filter[name] = (value != null) ? format(value, 'yyyy-MM-dd') : '';
        }
        else{
            filter[name] = value;
        }

        filter.page = 1;

        setFilter({...filter});
    }


    const buttonClickHandler=()=>{
        filter.staffInfo.confirm = filter.staffInfo.initial;

        setFilter({...filter});
    }

    const sortButtonHandler = () =>{
        console.log(staffWorkDetail.results);
        staffWorkDetail.results = (!location.search.includes('sorted'))
                                    ?  staffWorkDetail.results.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                                    :  staffWorkDetail.results.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))

        setStaffWorkDetail({...staffWorkDetail});

        history.push({
            pathname: '/staff/work',
            search: (!location.search.includes('sorted')) ?`?sorted` :``
        });
    }

    const changePagehandler =(btnName)=>{
        if(staffWorkDetail.next !== null && btnName === 'next'){
            filter.page = filter.page +1;

            setFilter({...filter});
        }
        else if(staffWorkDetail.previous !== null && btnName === 'previous'){
            filter.page = filter.page -1;

            setFilter({...filter});
        }
    }

    useEffect(()=>{
        history.push({
            pathname: '/staff/work',
            search: `?page=${ filter.page }`
        });

        FetchStaffWork();
    },[filter.orderId, filter.date, filter.status, filter.staffInfo.confirm, filter.type, filter.page])


    return (
    <div className="card background--none " id='search-card'>
        <section className={`top-icons`}>
            <span>
                <div className='filter-btn'>
                    <p onClick={sortButtonHandler}><i><FaSortAmountUpAlt/></i> Sort</p>
                    <p onClick={showHandler}><i><FaFilter/></i> Filter</p>
                </div>

                <div className={`search-input mb-3 ${(showSearchInput)? 'show' :'hide'}`}>
                    <section>
                        <span>
                            <p>Order No</p>
                            <input type="number" name='orderId' id='orderId' min={0} className="form-control" value={filter.orderId} onChange={inputChangeHandler} style={{width:'3rem', padding:'0rem'}}/>
                        </span>

                        <span>
                            <p>Type</p>
                            <select name="type" id="workType" className="dropdown-toggle" value={filter.type} onChange={inputChangeHandler}>
                                <option value="">All</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                            </select>
                        </span>

                        <span>
                            <p>Status</p>
                            <select name="status" id="workStatus" className="dropdown-toggle" value={filter.status} onChange={inputChangeHandler}>
                                <option value="">All</option>
                                <option value="completed">Completed</option>
                                <option value="inprogress">Inprogress</option>
                            </select>
                        </span>
                    </section>

                    <aside>
                        <DatePickerComponent
                            allowEdit={false}
                            name="date"
                            format="MMM dd, yyyy"
                            onChange={inputChangeHandler}
                            style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}}
                        ></DatePickerComponent>

                        <input type="search" className="form-control" name='staffInfo' value={filter.staffInfo.initial} onChange={inputChangeHandler} placeholder='Search Staff...'/>
                        <button type="button" className="btn btn-primary search-btn" onClick={buttonClickHandler}>
                            <i><HiSearch/></i>
                        </button>
                    </aside>
                </div>
            </span>
        </section>

        <WorkDetailTable staffWorkDetail={staffWorkDetail} directToAssignWork={directToAssignWork} sortButtonHandler={sortButtonHandler} changePagehandler={changePagehandler}/>
    </div>
  )
}

export default WorkDetail
