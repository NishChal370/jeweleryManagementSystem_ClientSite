import React from 'react';
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

function WorkDetailTable({staffWorkDetail, directToAssignWork}) {
    return (
        <section className='bill-table-card'>
            <table className="table table-borderless">
                <thead style={{fontSize:'0.92rem'}}>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Staff ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Order ID</th>
                        <th scope="col">Order P. ID</th>
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
                <tbody>
                    {(staffWorkDetail !== undefined)&&(
                        staffWorkDetail.map((data, index)=>{
                            return(
                                <tr>
                                    <th scope="row">{data.date}</th>
                                    <td>{data.staff.staffId}</td>
                                    <td>{data.staff.staffName}</td>
                                    <td>{data.staff.phone}</td>
                                    <td>{data.orderProduct.orderId}</td>
                                    <td>{data.orderProduct.orderProductId}</td>
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
                        })
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default WorkDetailTable