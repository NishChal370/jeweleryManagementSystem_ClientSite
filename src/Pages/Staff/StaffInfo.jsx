import './staff.css';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { Get_Staff_Detail } from '../../API/UserServer';
import { VerifyInputs } from '../../Components/Common/validation';
import { ResigsterStaffModal, StaffTable, UpdateStaffModel } from '../../Components';


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