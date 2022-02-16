import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { HiSaveAs } from 'react-icons/hi';
import { AiOutlineClear } from 'react-icons/ai';
import { Post_Staff } from '../../API/UserServer';


const INSTANCE_STAFF = {staffName:'', phone:'', address:'', email:''}

function ResigsterStaffModal({show, handleClose, saveHandler}) {
    const [newStaffDetail, setNewStaffDetail] = useState(INSTANCE_STAFF);

    const inputChangeHandler=(e)=>{
        clearInvalidMessage(e);

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
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    const submitHandler=(e)=>{
        e.preventDefault();

        (validateInput("submit"))
            &&(PostStaff(newStaffDetail) )
    }

    const validateInput=(btnName)=>{
        let isvalid = true;
        let inputs = [...document.forms["staff-registration"].getElementsByTagName("input")];
        
        inputs.forEach((input)=>{
            if(['staffName', 'address', 'phone'].includes(input.name)){
                if(input.value === null || input.value === ''){
                    input.style.borderColor = 'red';
                    input.placeholder = 'you missed me...';

                    isvalid= false;
                }
            }   
        })

        if(btnName==='submit'){
            inputs.forEach((input)=>{
                if(['staffName', 'address'].includes(input.name)){
                    if(input.value.match("[0-9]+")){
                        input.style.borderColor = 'red';
                        input.title = 'Invalid...';
    
                        isvalid= false;
                    }
                } 
                else if(['phone'].includes(input.name)){
                    if(!input.value.match("[0-9]+")){
                        input.style.borderColor = 'red';
                        input.title = 'Invalid phone number ';
                        
                        isvalid= false;
                    }
                } 
            })
        }
    
        return isvalid;
    }

    const removeInvalidMessage=()=>{
        let inputs = [...document.forms["staff-registration"].getElementsByTagName("input")];
        
        inputs.forEach((input)=>{
            input.title = ''; 
            input.placeholder = ''; 
            input.style.borderColor = '';
        })
    }

    const clearInvalidMessage=(e)=>{
        e.target.title = '';
        e.target.placeholder = '';
        e.target.style.borderColor = '';
    }

    const resetHandler=()=>{
        removeInvalidMessage();

        setNewStaffDetail({...INSTANCE_STAFF})
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
                            </span>

                            <span>
                                <p>Phone:</p>
                                <input type="number" name='phone' className="form-control"  id="validationTooltip01" value={newStaffDetail.phone} onChange={inputChangeHandler} required={true}/>
                            </span>
                        </section>
                        
                        <section className='d-flex'>
                            <span>
                                <p>Address:</p>
                                <input type="text" name='address' className="form-control"  id="validationTooltip01" value={newStaffDetail.address} onChange={inputChangeHandler} required={true}/>
                            </span>

                            <span>
                                <p>Email</p>
                                <input type="email" name='email' className="form-control"  id="validationTooltip01" value={newStaffDetail.email} onChange={inputChangeHandler} required={true}/>
                            </span> 
                        </section>

                        <section className='d-flex'>
                            <span>
                                <p>Image:</p>
                                <input type="file" name="" id="" className="form-control"/>
                            </span>

                            <span style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
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