import React from 'react';
import Swal from 'sweetalert2';
import { Spinner } from '../index';
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';


/**
 *  used in search Bill page
 **/
function SearchTable({billSummary, changePagehandler, DeleteBillById}) {
    const history = useHistory();
    
    const buttonhandler=(buttonName, billId)=>{
        if(buttonName === 'action'){
            Swal.fire({
                title: 'Select action',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#d33',
                showDenyButton: true,
                confirmButtonText: 'Edit',
                denyButtonText: 'Delete'

            }).then((result) => {
                if(result.isConfirmed){ //if edit button click
                    history.push({pathname:'/bill', state:billId, search: `?billno=${ billId}`});
                }
                else if(result.isDenied){ //if delete button click
                    Swal.fire({
                        title: `Do you want to delete bill ${billId}`,
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showDenyButton: true,
                        confirmButtonText: 'Delete',
                        denyButtonText: `Cancel`,
        
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            
                            DeleteBillById(billId);
                        }
                    });
                }
            });
        
        }
        else if(buttonName === 'view'){
            history.push({pathname:'/bill/invoice', state:billId, search: `?billno=${ billId}`}) 
        }
    }


    return(
        <section className='bill-table-card'>
        {(billSummary !== undefined) 
            ?(
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Bill No.</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Type</th>
                            <th scope="col">Total Product</th>
                            <th scope="col">Products Weight</th>
                            <th scope="col">Customer Product Weight</th>
                            <th scope="col">Status</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        billSummary.results.map(({billId, customerName, customerAddress, phone, type, totalProduct, productsWeight, customerProductWeight, status, payment, date}, index)=>{
                            return(
                                <tr key={`${index}SBTR`}>
                                    <th scope="row">{billId}</th>
                                    <td>{customerName}</td>
                                    <td>{phone}</td>
                                    <td>{customerAddress}</td>
                                    <td style={{color: (type === 'gold')? '#b36b00' : '#595959'}}>{type}</td>
                                    <td>{totalProduct}</td>
                                    <td>{productsWeight}</td>
                                    <td>{customerProductWeight}</td>
                                    <td><span className={`badge bg-${(status === 'submitted')?'success': 'warning text-dark'}`}>{status}</span></td>
                                    <td><span className={`badge bg-${(payment === 'Payed')?'success':'danger'}`}>{payment}</span></td>
                                    <td>{date}</td>
                                    <td>{(status ==='draft' || payment === 'Remain')
                                        ? <i onClick={()=> buttonhandler('action',billId) }><FiEdit/></i> 
                                        : <i onClick={()=> buttonhandler('view',billId)}><BsEye/></i> }</td>
                                </tr>
                            )
                        }) 

                    }
                    </tbody>
                    <tfoot>
                        <tr className="text-end">
                            <td colSpan="12" className="border-top">
                                <>
                                <span>{billSummary.pageIndex} &emsp;</span>
                                <i className='hover--curser' onClick={()=>{changePagehandler('previous')}} style={{ visibility: (billSummary.previous === null)?'hidden': 'visible'}}><BiFirstPage/></i> 
                                <i className='hover--curser' onClick={()=>{changePagehandler('next')}} style={{ visibility: (billSummary.next === null)?'hidden': 'visible'}}><BiLastPage/></i>
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

export default SearchTable;
