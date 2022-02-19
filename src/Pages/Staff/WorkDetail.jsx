import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import { FaFilter, FaSortAmountUpAlt } from 'react-icons/fa';
import { WorkDetailTable } from '../../Components';
import { Get_Staff_Work } from '../../API/UserServer';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';



function WorkDetail() {
    const history = useHistory();
    const [staffWorkDetail, setStaffWorkDetail] = useState();
    const [showSearchInput, setShowSearchInput] = useState(false);


    const showHandler=()=>{
        (showSearchInput)
            ? setShowSearchInput(false)
            : setShowSearchInput(true)
    }


    const FetchStaffWork =()=>{
        Get_Staff_Work()
            .then(function(response){
                console.log(response.data);
                setStaffWorkDetail(response.data);
            })
            .catch(function(error){
                console.log(error.response.data)
            })
    }

    const directToAssignWork=(selectedWork)=>{
        let staffId = selectedWork.staff.staffId;
        let orderId = selectedWork.orderProduct.orderId;

        history.push({pathname:'/staff/assign', state:{orderId :orderId, staffId :staffId, staffWorkId :selectedWork.staffWorkId, workDetail :selectedWork}});
    }


    useEffect(()=>{
        FetchStaffWork();
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
                            <p>Order No</p>
                            <input type="number" className="form-control" min={0} style={{width:'4rem'}}/>
                        </span>

                        <span>
                            <p>Type</p>
                            <select name="type" id="billType" className="dropdown-toggle">
                                <option value="all">All</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                            </select>
                        </span>

                        <span>
                            <p>Status</p>
                            <select name="status" id="billType" className="dropdown-toggle">
                                <option value="all">All</option>
                                <option value="submitted">Submitted</option>
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
                            // onChange={changefilterInputHandler}
                            style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}}
                        ></DatePickerComponent>

                        <input type="search" className="form-control" name='customerInfo' placeholder='Search Customer...'/>
                        <button type="button" className="btn btn-primary search-btn">
                            <i><HiSearch/></i>
                        </button>
                    </aside>
                </div>
            </span>
        </section>

        <WorkDetailTable staffWorkDetail={staffWorkDetail} directToAssignWork={directToAssignWork}/>
    </div>
  )
}

export default WorkDetail
