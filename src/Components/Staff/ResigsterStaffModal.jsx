import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { HiSaveAs } from 'react-icons/hi';
import { AiOutlineClear } from 'react-icons/ai';

function ResigsterStaffModal({show, handleClose}) {
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
        {/* <header> */}
            <h1 className='fw-bolder' style={{color:'#012970'}}>Register staff</h1>
        {/* </header> */}
    </Modal.Header>
        <Modal.Body closeButton>
            <form className='register-staff'>
                
                <main>
                    <section className='d-flex'>
                        <span>
                            <p>Name:</p>
                            <input type="text" className="form-control"/>
                        </span>

                        <span>
                            <p>Phone:</p>
                            <input type="tel" className="form-control"/>
                        </span>
                    </section>
                    
                    <section className='d-flex'>
                        <span>
                            <p>Addres:</p>
                            <input type="text" name="" id="" className="form-control"/>
                        </span>

                        <span>
                            <p>Email</p>
                            <input type="email" className="form-control"/>
                        </span> 
                    </section>

                    <section className='d-flex'>
                        <span>
                            <p>Image:</p>
                            <input type="file" name="" id="" className="form-control"/>
                        </span>
                        <span style={{display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
                            <span className='d-flex gap-5'>
                            <button type="button" className="btn btn-success"> <HiSaveAs/>  Save </button>
                            <button type="button" className="btn btn-danger"> <AiOutlineClear/>  Clear </button>
                            </span>
                            
                        </span>
                    </section>
                </main>
            </form>
        </Modal.Body>

        {/* <Button onClick={handleClose}>Close</Button> */}
        {/* <Modal.Footer>
            
        </Modal.Footer> */}
    </Modal>
  )
}

export default ResigsterStaffModal