import React, { useState } from 'react'
import { BiFirstPage, BiLastPage } from 'react-icons/bi'
import { GiClick } from 'react-icons/gi';
import { CompletedIcon, ResignIcon, StaffAvtar, TotalWorkIcon, WorkProcessIcon } from '../../Assets/img';

function StaffTable() {
    const[isDetailShow, setIsDetailShow]= useState({index:0, action:false});
    console.log(isDetailShow);

    const showHandle=(selectedIndex)=>{
        (isDetailShow.index === selectedIndex)
            ? setIsDetailShow({index: 0, action:false})
            : setIsDetailShow({index: selectedIndex, action:false})

    }

    return (
        <section className='bill-table-card'>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col"><span style={{fontSize:'1.2rem', cursor:'pointer'}}></span> Staff No.</th>
                        <th scope="col">Staff Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Registration date</th>
                        <th scope="col">Resign date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {[1,2,3,4,5,6,7,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((v)=>{
                    return(
                        <>
                        <tr onClick={()=> showHandle(v)}>
                            <th scope="row">{v}</th>
                            <td>Ram</td>
                            <td>9878767654</td>
                            <td>Kathmandu</td>
                            <td>2022-02-11</td>
                            <td>-</td>
                            <td style={{fontSize:'1.6rem', margin:'0rem', padding:'0rem' }}><GiClick/></td>  
                        </tr>
                        <tr className={`staff-info--${(isDetailShow.index === v)?(isDetailShow)?'show':'hide':'hide'}`}>
                            {/* <tr  className={`a staff-info--show`} > */}
                            {/* <tr className={`staff-info--show`}> */}
                            <td  colspan="6">
                                <section className='staff-info d-flex gap-5' >
                                    <section >
                                        <img className='staff-avtar' src={StaffAvtar} alt="avtar"/>
                                        <p className="assignwork-btn fw-bolder text-center " >Assign work</p>
                                        <p className="resignwork-btn fw-bolder text-center " >Resign</p>

                                    </section >
                                    {/* <section >
                                        <img className='staff-avtar' src={ResignIcon} alt="avtar"/>
                                        <p className="resignwork-btn fw-bolder text-center " >Resign</p>
                                    </section >
                                     */}
                                    <aside className='d-flex gap-5 justify-content-between'>
                                        <span className='d-flex'>
                                            <h5 className="fw-bolder pt-4" style={{fontSize:'6rem'}}>01</h5>
                                        
                                            <div>
                                                <img src={TotalWorkIcon} alt="" style={{width:'6rem', alignSelf:'center'}}/>
                                                <h5 className="fs-3 fw-bolder">Total Work </h5>
                                            </div>
                                        </span>

                                        <span className='d-flex '>
                                            <h5 className="fw-bolder pt-4" style={{fontSize:'6rem'}}>01</h5>
                                    
                                            <div>
                                                <img src={WorkProcessIcon} alt=""  style={{width:'6rem', alignSelf:'center'}}/>
                                                <h5 className="fs-3 fw-bolder">Inprogress </h5>
                                            </div>
                                        </span>

                                        <span className='d-flex'>
                                            <h5 className="fw-bolder pt-4" style={{fontSize:'6rem'}}>01</h5>
                                    
                                            <div>
                                                <img src={CompletedIcon} alt=""  style={{width:'6rem', alignSelf:'center'}}/>
                                                <h5 className="fs-3 fw-bolder">Completed </h5>
                                            </div>
                                        </span>
                                        
                                    </aside>
                                </section>
                            </td>

                        </tr>
                    </>)
                })}                         
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