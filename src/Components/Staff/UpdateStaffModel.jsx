
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { HiSaveAs } from 'react-icons/hi';
import { Update_Staff_By_Id } from '../../API/UserServer';
import { clearRegisterStaffErrorMessage, isRegisterStaffValid } from '../Common/validation';

import Swal from 'sweetalert2';



function UpdateStaffModel({ showUpdateStaffModal, handlerShowUpdateStaffModal, selectedStaff, saveHandler} ) {
      const [staffDetail, setStaffDetail] = useState();

      const submitButtonHandler=(e)=>{
            e.preventDefault();
            updateStaffInfo();
            
      }

      const updateStaffInfo=()=>{
            if(isRegisterStaffValid(staffDetail)){
                  Update_Staff_By_Id(staffDetail.staffId, staffDetail)
                        .then((response)=>{
                            saveHandler(response.data); // it is save to render the this page (i.e staff detail)

                            handlerShowUpdateStaffModal();
                            Swal.fire('Updated sucessfully !!', '', 'success');
                        })
                        .catch((response)=>{
                              console.log(response)
                              alert("ERROR")
                        })
            }
      }

      const inputChangeHandler=({target})=>{
            const {name, value} = target;

            clearRegisterStaffErrorMessage(name);

            staffDetail[name] = value;
            setStaffDetail({...staffDetail});
      }

      useEffect(()=>{
            setStaffDetail(selectedStaff);
      },[selectedStaff])


      return (
            <Modal
                  show={showUpdateStaffModal}
                  onHide={handlerShowUpdateStaffModal}
                  backdrop="static"
                  keyboard={false}
                  centered
                  size="lg"
            >
            <Modal.Header closeButton>
                  <h1 className='fw-bolder' style={{color:'#012970'}}>Update staff info</h1>
            </Modal.Header>
            <Modal.Body closeButton>
                  <form name='staff-registration' className='register-staff needs-validation' noValidate onSubmit={submitButtonHandler} >  
                        <main>
                              {(staffDetail !== undefined) && (
                                    <>
                                    <p>Staff No: {staffDetail.staffId}</p>
                                    <section className='d-flex'>
                                          <span>
                                                <p>Name:</p>
                                                <input type="text" name='staffName' className="form-control"  id="validationTooltip01" value={staffDetail.staffName} onChange={inputChangeHandler} required={true}/>
                                                <div id='invalid-tooltip' className={`staffName-tooltip`} hidden={true}>
                                                      <p>You missed me !</p> 
                                                </div>
                                          </span>

                                          <span>
                                                <p>Phone:</p>
                                                <input type="text" name='phone' className="form-control"  id="validationTooltip01" value={staffDetail.phone} onChange={inputChangeHandler} required={true}/>
                                                <div id='invalid-tooltip' className={`phone-tooltip`} hidden={true}>
                                                      <p>You missed me !</p> 
                                                </div>
                                          </span>
                                    </section>
                                    
                                    <section className='d-flex'>
                                          <span>
                                                <p>Address:</p>
                                                <input type="text" name='address' className="form-control"  id="validationTooltip01" value={staffDetail.address} onChange={inputChangeHandler} required={true}/>
                                                <div id='invalid-tooltip' className={`address-tooltip`} hidden={true}>
                                                      <p>You missed me !</p> 
                                                </div>
                                          </span>

                                          <span>
                                                <p>Email</p>
                                                <input type="email" name='email' className="form-control"  id="validationTooltip01" value={(staffDetail.email === null)?'':staffDetail.email} onChange={inputChangeHandler} required={true}/>
                                                <div id='invalid-tooltip' className={`email-tooltip`} hidden={true}>
                                                      <p>You missed me !</p> 
                                                </div>
                                          </span> 
                                    </section>

                                    <section className='d-flex' style={{justifyContent:'right', marginTop:'1rem'}}>

                                          <span style={{display:'flex', alignItems:'flex-end', justifyContent:'end'}}>
                                                <span className='d-flex gap-5'>
                                                      <button type="submit" className="btn btn-success"> <HiSaveAs/>  Save </button>
                                                </span>
                                          </span>
                                    </section>
                                    </>
                              )}
                              
                        </main>
                  </form>
            </Modal.Body>
            </Modal>
      )
}

export default UpdateStaffModel