import React from 'react';
import { Spinner } from '..';
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';



function SearchTable({ordersSummary, changePagehandler, buttonHandler}) {
  return (
    <section className='bill-table-card'>
        {(ordersSummary !== undefined) 
            ?(
                <table className="table table-borderless" >
                    <thead  style={{fontSize:'0.96rem'}}>
                        <tr>
                            <th scope="col">Order No.</th>
                            <th scope="col">Bill No.</th>
                            <th scope="col">Date</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Type</th>
                            <th scope="col">Total Products</th>
                            <th scope="col">Customer P. Weight</th>
                            <th scope="col">Advance amount</th>
                            <th scope="col">Submittion Date</th>
                            <th scope="col">Submitted Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    {
                        ordersSummary.results.map(({orderId, billId, customerName, phone, type, totalOrderedProduct, advanceAmount, customerProductWeight, date, submittionDate, submittedDate, status}, index)=>{
                            return(
                                <tr key={`${index}SBTR`}>
                                    <th scope="row">{orderId}</th>
                                    <td>{billId}</td>
                                    <td>{date}</td>
                                    <td>{customerName}</td>
                                    <td>{phone}</td>
                                    <td style={{color: (type === 'gold')? '#b36b00' : '#595959'}}>{type}</td>
                                    <td>{totalOrderedProduct}</td>
                                    <td>{customerProductWeight}</td>
                                    <td>{advanceAmount}</td>
                                    
                                    <td >
                                        <i className={(( new Date(submittionDate) - new Date(new Date().toJSON().slice(0,10)) ) < 0)? 'fw-bold text-danger': (( new Date(submittionDate) - new Date(new Date().toJSON().slice(0,10)) ) == 0)? 'fw-bold text-info':''}>{submittionDate}</i>
                                    </td>
                                    <td>{submittedDate}</td>
                                    <td><span className={`badge bg-${(status === 'submitted')?'success': 'warning text-dark'}`}>{status}</span></td>
                                    <td><span onClick={()=>buttonHandler('edit', orderId)}><FiEdit/></span>| <span><BsEye/></span></td>
                                </tr>
                            )
                        }) 

                    }
                    </tbody>
                    <tfoot>
                        <tr className="text-end">
                            <td colSpan="13" className="border-top">
                                <>
                                <span>{ordersSummary.pageIndex} &emsp;</span>
                                <i className='hover--curser' onClick={()=>changePagehandler('previous')} style={{ visibility: (ordersSummary.previous === null)?'hidden': 'visible'}}><BiFirstPage/></i> 
                                <i className='hover--curser' onClick={()=>changePagehandler('next')} style={{ visibility: (ordersSummary.next === null)?'hidden': 'visible'}}><BiLastPage/></i>
                                </>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )
            :( <Spinner/> )
        }
        </section>
  )
}

export default SearchTable