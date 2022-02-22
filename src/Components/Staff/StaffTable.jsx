import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GiClick } from 'react-icons/gi';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';
import { Spinner } from '..';
import { Delete_Staff_By_Id } from '../../API/UserServer';
import { CompletedIcon, StaffAvtar, TotalWorkIcon, WorkProcessIcon } from '../../Assets/img';



const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 900,
    timerProgressBar: false,
});


function StaffTable({staffDetail, saveHandler}) {
    const history = useHistory();
    const[isDetailShow, setIsDetailShow]= useState({index:-1, action:false});

    const showHandle=(selectedIndex)=>{
        (isDetailShow.index === selectedIndex)
            ? setIsDetailShow({index: -1, action:false})
            : setIsDetailShow({index: selectedIndex, action:false})

    }

    const deleteStaffById=(staffId)=>{
        Delete_Staff_By_Id(staffId)
            .then(function(response){
                saveHandler(response.data);

                setIsDetailShow({index: -1, action:false});
                Toast.fire({
                    icon: 'success',
                    title: 'Deleted!'
                });
            })
            .catch(function(error){
                if(error.response.status === 428){
                    Swal.fire(
                        'Request unsuccessful!',
                        error.response.data[0],
                        'error'
                    )
                }
                else{
                    alert(error.response.message)
                }
                
            })
    }


    const deleteHandler=(staffId)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed){
                deleteStaffById(staffId)
            }
        });
    }


    
    return (
        <section className='table-card'>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col"><span style={{fontSize:'1.2rem', cursor:'pointer'}}></span> Staff No.</th>
                        <th scope="col">Staff Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Registration date</th>
                        {/* <th scope="col">Resign date</th> */}
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {(staffDetail.length>0)
                    ?(staffDetail.map(({staffId, staffName, phone, email, address, registrationDate, resignDate, totalWork, completed, inprogress}, index)=>{
                    return(
                        <>
                        <tr onClick={()=> showHandle(index)}>
                            <th scope="row">{staffId}</th>
                            <td>{staffName}</td>
                            <td>{phone}</td>
                            <td>{(email === null || email === '' )?'-':email}</td>
                            <td>{address}</td>
                            <td>{registrationDate}</td>
                            {/* <td>{(resignDate === null)?'-':resignDate}</td> */}
                            <td style={{fontSize:'1.6rem', margin:'0rem', padding:'0rem' }}><GiClick/></td>  
                        </tr>
                        <tr className={`staff-info--${(isDetailShow.index === index)?(isDetailShow)?'show':'hide':'hide'}`}>
                            {/* <tr  className={`a staff-info--show`} > */}
                            {/* <tr className={`staff-info--show`}> */}
                            <td  colspan="6">
                                <section className='staff-info d-flex gap-5' >
                                    <section >
                                        <img className='staff-avtar' src={StaffAvtar} alt="avtar"/>
                                        <p className="assignwork-btn fw-bolder text-center " onClick={()=>history.push({pathname:"/staff/assign", state:{staffId:staffId, staffName:staffName}})} >Assign work</p>
                                        <p className="resignwork-btn fw-bolder text-center " onClick={()=>{deleteHandler(staffId)}}>Resign</p>
                                    </section >
                                    {/* <section >
                                        <img className='staff-avtar' src={ResignIcon} alt="avtar"/>
                                        <p className="resignwork-btn fw-bolder text-center " >Resign</p>
                                    </section >
                                     */}
                                    <aside className='d-flex justify-content-between'>
                                        <span className='d-flex'>
                                            <h5 className="fw-bolder pt-4" style={{fontSize:'6rem'}}>{(totalWork).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h5>
                                        
                                            <div>
                                                <img src={TotalWorkIcon} alt="" style={{width:'6rem', alignSelf:'center'}}/>
                                                <h5 className="fs-3 fw-bolder">Total Work </h5>
                                            </div>
                                        </span>

                                        <span className='d-flex '>
                                            <h5 className="fw-bolder pt-4" style={{fontSize:'6rem'}}>{(inprogress).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h5>
                                    
                                            <div>
                                                <img src={WorkProcessIcon} alt=""  style={{width:'6rem', alignSelf:'center'}}/>
                                                <h5 className="fs-3 fw-bolder">Inprogress </h5>
                                            </div>
                                        </span>

                                        <span className='d-flex'>
                                            <h5 className="fw-bolder pt-4" style={{fontSize:'6rem'}}>{(completed).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h5>
                                    
                                            <div>
                                                <img src={CompletedIcon} alt=""  style={{width:'6rem', alignSelf:'center'}}/>
                                                <h5 className="fs-3 fw-bolder">Completed </h5>
                                            </div>
                                        </span>
                                        
                                    </aside>
                                </section>
                            </td>

                        </tr>
                    </>)}))
                    : <Spinner/>
                }                         
                </tbody>

                <tfoot>
                    <tr className="text-end">
                        <td colSpan="12" className="border-top">
                            <>
                            <span>1 of 1 &emsp;</span>
                            <i className='hover--curser'><BiFirstPage/></i> 
                            <i className='hover--curser'><BiLastPage/></i>
                            </>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </section>
    )
}

export default StaffTable