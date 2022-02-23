import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Spinner } from '..';
import { Fetch_Bill_Summary, Fetch_Orders_Summary, Fetch_Staff_Work } from '../../API/UserServer';
import { NotFound, NotFound2, NotFound3 } from '../../Assets/img';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 900,
    timerProgressBar: false,
});

function DataTable({name}) {

    const [summary, setSummary] = useState();
    const [heading, setHeading] = useState();
    const [filter, setFilter] = useState({type:'This Week',date:'2022-02-20'});
    const FetchOrderSummary=()=>{
        Fetch_Orders_Summary(`?customerInfo=None&type=all&status=all&date=${filter.date}&page=1`)
            .then(function(response){

                setSummary(response.data.results.slice(0,10))
            })
            .catch(function(error){
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
            })
    }

    const FetchBillsSummary = ()=>{
        Fetch_Bill_Summary(`/?billType=all&billStatus=all&page=1&billDate=${filter.date}`)
            .then(function (response) {
                // handle success
                setSummary(response.data.results.slice(0,10))
            })
            .catch(function (error) {
                // handle error
                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
                console.log(error);
            });
    }


    const FetchStaffWork =()=>{
        Fetch_Staff_Work(`?submittionDate=${filter.date}&staffInfo=${''}&orderId=${''}&type=${''}&workStatus=${''}&page=1`)
            .then(function(response){

                setSummary(response.data.results.slice(0,10))
            })
            .catch(function(error){
                console.log(error.response.data)
                Toast.fire({
                    icon: 'error',
                    title: "Not Found !!",
                });
            })
    }


    const getFirstDayOfThisWeek =()=>{
        let curr = new Date; // get current date
        let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week

        return new Date(curr.setDate(first)).toJSON().slice(0,10);
    }


    const filterHandler=(btnName)=>{
        if(btnName === 'week'){
            filter.type = 'This Week'
            filter.date = getFirstDayOfThisWeek();
        }
        else if(btnName === 'today'){
            filter.type = 'Today'
            filter.date = new Date().toJSON().slice(0,10);
        }
        else if(btnName === 'month'){
            filter.type = 'This month'
            filter.date = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toJSON().slice(0,10);
        }

        setFilter({...filter})
    }



    useEffect(()=>{
        let heading;
        if(name === 'Orders'){
            FetchOrderSummary();
            heading = ['Order', 'Bill No.', 'Date', 'Customer Name', 'Phone', 'Type', 'Total Products', 'Submittion Date', 'Submitted Date', 'Status']
            
        }
        else if(name === 'Bills'){
            FetchBillsSummary();
            // FetchOrderSummary();
            heading = ['Bill', 'Customer Name', 'Phone', 'Address', 'Type', 'Total Product', 'Products Weight', 'Status', 'Payment', 'Date']
        }
        else if(name === 'Staff Works'){
            FetchStaffWork();
            heading = ['Staff', 'Name', 'Phone', 'Date', 'Order ID', 'Order P. ID', 'Type', 'P. Name', 'Given Weight', 'KDM Weight', 'Submittion Date', 'Status']
        }
        setHeading(heading);
    },[filter])

  return (
    <div className="col-12">
        <div className="card orders">

            <div className="filter">
                <a className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>

                    <li><i className="dropdown-item" onClick={()=>filterHandler('today')}>Today</i></li>
                    <li><i className="dropdown-item" onClick={()=>filterHandler('week')}>This Week</i></li>
                    <li><i className="dropdown-item" onClick={()=>filterHandler('month')}>This Month</i></li>
                </ul>
            </div>

            <div className="card-body">
                <h5 className="card-title">{name} <span>| {filter.type}</span></h5>
                <section className='data-table-card'>
                <table className="table table-borderless datatable" style={{textAlign:'center'}}>
                    <thead>
                        <tr style={{fontSize:`${(name=== 'Staff Works')&&'0.81rem'}`}}>
                        {(heading !== undefined)&&(
                            heading.map((item, index)=>{
                                return <th scope="col" key={`${index}DTH`}>{item}</th>
                            })
                        )}
                        </tr>
                    </thead>
                    {(name=== 'Staff Works')
                        ?(  <tbody>
                            {(summary !== undefined)
                                ?(
                                    (summary.length>0)
                                        ?(summary.map((data, index)=>{
                                            return(
                                                <tr key={`${index}SWD`}>
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
                                                    <td><span className={`badge bg-${(data.status === 'completed')?'success':( data.status === 'submitted')? 'primary':( data.status === 'inprogress')? 'secondary':'warning text-dark'}`}>{data.status}</span></td>
                                                </tr>
                                            )
                                        }))
                                        :( <>
                                                <tr><td colSpan={12}><h5 style={{textAlign:'center'}}><img src={NotFound2} alt="not-found" /></h5></td></tr>
                                                <tr><td colSpan={12}><h5 style={{color:'red', textAlign:'center', fontWeight:'bolder',}}>No data to show</h5></td></tr>
                                            </>
                                        )
                                )
                                :<Spinner/>
                            }
                            </tbody>
                         )
                        :(<tbody>
                            {(summary !== undefined)
        
                                ?((summary.length>0)
        
                                    ?((name=== 'Orders')
                                        ?summary.map(({orderId, billId, customerName, phone, type, totalOrderedProduct, date, submittionDate, submittedDate, status, billStatus, billRemainingAmt}, index)=>{
                                            return(
                                                <tr key={`${index}SBTR`}>
                                                    <th scope="row">{orderId}</th>
                                                    <td>{billId}</td>
                                                    <td>{date}</td>
                                                    <td>{customerName}</td>
                                                    <td>{phone}</td>
                                                    <td style={{color: (type === 'gold')? '#b36b00' : '#595959'}}>{type}</td>
                                                    <td>{totalOrderedProduct}</td>
                            
                                                    <td >
                                                        <i className={(( new Date(submittionDate) - new Date(new Date().toJSON().slice(0,10)) ) < 0 && submittedDate === '-')? 'fw-bold text-danger': ((submittedDate !== '-')?'':( new Date(submittionDate) - new Date(new Date().toJSON().slice(0,10)) ) == 0)? 'fw-bold text-info':''}>{submittionDate}</i>
                                                    </td>
                                                    <td>{submittedDate}</td>
                                                    <td><span className={`badge bg-${(status === 'completed')?'success':( status === 'submitted')? 'primary':( status === 'inprogress')? 'secondary':'warning text-dark'}`}>{status}</span></td>
                                                </tr>
                                            )
                                            }) 
                                        :summary.map(({billId, customerName, customerAddress, phone, type, totalProduct, productsWeight, customerProductWeight, status, payment, date}, index)=>{
                                            return(
                                                <tr key={`${index}SBTR`}>
                                                    <th scope="row">{billId}</th>
                                                    <td>{customerName}</td>
                                                    <td>{phone}</td>
                                                    <td>{customerAddress}</td>
                                                    <td style={{color: (type === 'gold')? '#b36b00' : '#595959'}}>{type}</td>
                                                    <td>{totalProduct}</td>
                                                    <td>{productsWeight}</td>
                                                    <td><span className={`badge bg-${(status === 'submitted')?'success': 'warning text-dark'}`}>{status}</span></td>
                                                    <td><span className={`badge bg-${(payment === 'Payed')?'success':'danger'}`}>{payment}</span></td>
                                                    <td>{date}</td>
                                                </tr>
                                            )
                                        }))  
        
                                    : (<>
                                        <tr><td colSpan={10}><h5 style={{textAlign:'center'}}><img src={NotFound2} alt="not-found" /></h5></td></tr>
                                        <tr><td colSpan={10}><h5 style={{color:'red', textAlign:'center', fontWeight:'bolder',}}>No data to show</h5></td></tr>
                                        </>) ) 
        
                                :(<Spinner/>)
                            }
                            </tbody>
                        )    
                    }
                    
                </table>
                </section>
            </div>     
        </div>
    </div>
  )
}

export default DataTable

//<h5 style={{color:'red', textAlign:'center', fontWeight:'bolder', padding:'2rem 0rem'}}>No data to show</h5>