import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { HiSaveAs } from 'react-icons/hi';
import { AiOutlineClear } from 'react-icons/ai';
import { Post_Staff } from '../../API/UserServer';
import { isRegisterStaffValid,resetRegisterStaffValidation,clearRegisterStaffErrorMessage } from '../Common/validation';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});

const INSTANCE_STAFF = {staffName:'', phone:'', address:'', email:''}

function ResigsterStaffModal({show, handleClose, saveHandler}) {
    const [newStaffDetail, setNewStaffDetail] = useState(INSTANCE_STAFF);

    const inputChangeHandler=(e)=>{
        clearRegisterStaffErrorMessage(e.target.name);

        newStaffDetail[e.target.name] = e.target.value;

        setNewStaffDetail({...newStaffDetail});
    }

    const PostStaff=()=>{
        Post_Staff(newStaffDetail)
            .then(function(response){
                // handle success
                saveHandler(response.data);

                resetHandler();
                handleClose();

                Swal.fire('Register sucessfully !!', '', 'success'); 

                
            })
            .catch(function ({response}) {
                // handle error
                if (response.status === 406){

                    resetHandler()
                    handleClose()

                    Swal.fire('Register sucessfully !!', '', 'success');
                }
                
            });
    }

    const submitHandler=(e)=>{
        e.preventDefault();

        (isRegisterStaffValid(newStaffDetail))
            &&(PostStaff(newStaffDetail) )
    }

    const resetHandler=()=>{
        resetRegisterStaffValidation();

        INSTANCE_STAFF.address = '';
        INSTANCE_STAFF.email = '';
        INSTANCE_STAFF.phone = '';
        INSTANCE_STAFF.staffName = '';
        setNewStaffDetail({...INSTANCE_STAFF});
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            size="lg"
        >
        <Modal.Header closeButton>
            <h1 className='fw-bolder' style={{color:'#012970'}}>Register staff</h1>
        </Modal.Header>
            <Modal.Body closeButton>
                <form name='staff-registration' className='register-staff needs-validation' noValidate onSubmit={submitHandler} onReset={resetHandler}> 
                    <main>
                        <section className='d-flex'>
                            <span>
                                <p>Name:</p>
                                <input type="text" name='staffName' className="form-control"  id="validationTooltip01" value={newStaffDetail.staffName} onChange={inputChangeHandler} required={true}/>
                                <div id='invalid-tooltip' className={`staffName-tooltip`} hidden={true}>
                                    <p>You missed me !</p> 
                                </div>
                            </span>

                            <span>
                                <p>Phone:</p>
                                <input type="number" name='phone' className="form-control"  id="validationTooltip01" value={newStaffDetail.phone} onChange={inputChangeHandler} required={true}/>
                                <div id='invalid-tooltip' className={`phone-tooltip`} hidden={true}>
                                    <p>You missed me !</p> 
                                </div>
                            </span>
                        </section>
                        
                        <section className='d-flex'>
                            <span>
                                <p>Address:</p>
                                <input type="text" name='address' className="form-control"  id="validationTooltip01" value={newStaffDetail.address} onChange={inputChangeHandler} required={true}/>
                                <div id='invalid-tooltip' className={`address-tooltip`} hidden={true}>
                                    <p>You missed me !</p> 
                                </div>
                            </span>

                            <span>
                                <p>Email</p>
                                <input type="email" name='email' className="form-control"  id="validationTooltip01" value={newStaffDetail.email} onChange={inputChangeHandler} required={true}/>
                                <div id='invalid-tooltip' className={`email-tooltip`} hidden={true}>
                                    <p>You missed me !</p> 
                                </div>
                            </span> 
                        </section>

                        <section className='d-flex justify-content-end mt-3'>
                            <span style={{display:'flex', alignItems:'flex-end', justifyContent:'end'}}>
                                <span className='d-flex gap-5'>
                                    <button type="submit" className="btn btn-success"> <HiSaveAs/>  Save </button>
                                    <button type="reset" className="btn btn-danger"> <AiOutlineClear/>  Clear </button>
                                </span>
                            </span>
                        </section>
                        
                    </main>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ResigsterStaffModal