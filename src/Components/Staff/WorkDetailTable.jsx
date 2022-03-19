import React from 'react';
import { BiFirstPage, BiLastPage, BiSortAlt2 } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { Spinner } from '..';

function WorkDetailTable({staffWorkDetail, directToAssignWork, sortButtonHandler, changePagehandler}) {
    return (
        <section className='table-card'>
            <table className="table table-borderless">
                <thead style={{fontSize:'0.84rem'}}>
                    <tr>
                        {/* <th scope="col">Date</th> */}
                        <th scope="col"><span onClick={sortButtonHandler} style={{fontSize:'1.2rem', cursor:'pointer'}}><BiSortAlt2/></span>Staff ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Date</th>
                        <th scope="col">Order ID</th>
                        <th scope="col">Order P. ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Given Weight</th>
                        <th scope="col">KDM Weight</th>
                        <th scope="col">Submittion Date</th>
                        <th scope="col">Submitted Weight</th>
                        <th scope="col">Submitted Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {(staffWorkDetail !== undefined)
                    ?(<><tbody>
                        {staffWorkDetail.results.map((data, index)=>{
                            return(
                                <tr key={`${index}SWD`}>
                                    {/* <th scope="row">{data.date}</th> */}
                                    <th scope="row">{data.staff.staffId}</th>
                                    <td>{data.staff.staffName}</td>
                                    <td>{data.staff.phone}</td>
                                    <td >{data.date}</td>
                                    <td>{data.orderProduct.orderId}</td>
                                    <td>{data.orderProduct.orderProductId}</td>
                                    <td style={{color: (data.type === 'gold')? '#b36b00' : '#595959'}}>{data.type}</td>
                                    <td>{data.orderProduct.product.productName}</td>
                                    <td>{data.givenWeight}</td>
                                    <td>{data.KDMWeight}</td>
                                    <td>{data.submittionDate}</td>
                                    <td>{(data.submittedWeight === null || data.submittedWeight === '') ?"-" :data.submittedWeight}</td>
                                    <td>{(data.submittedDate === null || data.submittedDate === '') ?"-" :data.submittedDate}</td>
                                    <td><span className={`badge bg-${(data.status === 'completed')?'success':( data.status === 'submitted')? 'primary':( data.status === 'inprogress')? 'secondary':'warning text-dark'}`}>{data.status}</span></td>
                                    {/* <td><span className='badge bg-info'>inprogress</span></td> */}
                                    <td onClick={()=>directToAssignWork(data)}>{(data.status === 'completed')? <BsEye/> :<FiEdit/> }</td>
                                </tr>
                            )
                        })}   
                    </tbody>
                    <tfoot>
                        <tr className="text-end">
                            <td colSpan="15" className="border-top">
                                <>
                                <span>{staffWorkDetail.pageIndex} &emsp;</span>
                                <i className='hover--curser' onClick={()=>changePagehandler('previous')} style={{ visibility: (staffWorkDetail.previous === null)?'hidden': 'visible'}}><BiFirstPage/></i> 
                                <i className='hover--curser' onClick={()=>changePagehandler('next')} style={{ visibility: (staffWorkDetail.next === null)?'hidden': 'visible'}}><BiLastPage/></i>
                                </>
                            </td>
                        </tr>
                    </tfoot>
                    </>)
                    :(<Spinner/>)}
            </table>
        </section>
    )
}

export default WorkDetailTable