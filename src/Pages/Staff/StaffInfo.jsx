import './staff.css';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { Get_Staff_Detail } from '../../API/UserServer';
import { VerifyInputs } from '../../Components/Common/validation';
import { ResigsterStaffModal, StaffTable } from '../../Components';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 900,
    timerProgressBar: false,
});

function StaffInfo() {
    const [staffDetail, setStaffDetail] = useState([]);
    const [showAddStaff, setShowsAddStaff] = useState(false);

    const saveHandler = (updatedStaffDetail)=>{
        setStaffDetail(updatedStaffDetail)
    }

    const GetStaffDetail=()=>{
        Get_Staff_Detail()
            .then(function(response){
                console.log(response);
                setStaffDetail(response.data)
            })
            .catch(function(error){
                Toast.fire({
                    icon: 'error',
                    title: error.response.data[0],
                });
            })
    }

    const handleShowAddStaff=()=>{
        (showAddStaff)
            ? setShowsAddStaff(false)
            : setShowsAddStaff(true)
    }
    

    useEffect(()=>{
        GetStaffDetail();
        VerifyInputs();
    },[]);


    return (
        <div className="card background--none " id='staff-card'>
            <section style={{ display:'flex', justifyContent:'flex-end'}}>
                <span className='add-staff' style={{ width:'fit-content', textAlign:"center", padding:'0.6rem 1.6rem'}} onClick={handleShowAddStaff}>
                    <div className='d-flex gap-2'>  
                        {/* <img src={AddIconGif} style={{width:'1.6rem'}}/> */}
                        <h5 style={{fontWeight:'bolder', paddingTop:'5px'}}>add employee</h5>
                    </div>
                </span>
            </section>

            <StaffTable staffDetail={staffDetail} saveHandler={saveHandler}/>

            <ResigsterStaffModal handleClose={handleShowAddStaff} show={showAddStaff} saveHandler={saveHandler}/>
        </div>
    )

}

export default StaffInfo



/***<aside className='d-flex flex-column'>
                                            <span>
                                                <h5 className="fs-3 fw-bolder">Total Work </h5>
                                                
                                                <div class="progress">
                                                    <div class="progress-bar progress-bar-striped" role="progressbar" style={{width: '40%', ariaValuenow:"1", ariaValuemin:"0", ariaValuemax:"100"}}></div>
                                                </div>
                                            </span>
                                            
                                            <span>
                                                <h5 className="fs-3 fw-bolder">Inprogress </h5>
                                                
                                                <div class="progress">
                                                    <div class="progress-bar progress-bar-striped" role="progressbar" style={{width: '10%', ariaValuenow:"1", ariaValuemin:"0", ariaValuemax:"100"}}></div>
                                                </div>
                                            </span>

                                            <span>
                                                <h5 className="fs-3 fw-bolder">Complated </h5>
                                                
                                                <div class="progress">
                                                    <div class="progress-bar progress-bar-striped" role="progressbar" style={{width: '20%', ariaValuenow:"1", ariaValuemin:"0", ariaValuemax:"100"}}></div>
                                                </div>
                                            </span>
                                            //<p className="fs-4 fw-bolder">: 25</p> 
                                            </aside> */