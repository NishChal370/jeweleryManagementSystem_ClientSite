import './staff.css'
import React, { useState } from 'react'
import { ResigsterStaff, StaffTable } from '../../Components';

function Staff() {
    const [showAddStaff, setShowsAddStaff] = useState(false);

    const handleShowAddStaff=()=>{
        console.log("CLICK");
        (showAddStaff)
            ? setShowsAddStaff(false)
            : setShowsAddStaff(true)
    }
    
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
            <StaffTable/>
            <ResigsterStaff handleClose={handleShowAddStaff} show={showAddStaff}/>
        </div>
    )

}

export default Staff



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