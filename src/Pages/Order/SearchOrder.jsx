import React, { useState, useEffect } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { HiSearch } from 'react-icons/hi';
import { FaFilter, FaSortAmountUpAlt } from 'react-icons/fa';
import { SearchOrderTable } from '../../Components';
import { Delete_Pending_Order, Fetch_Bill_By_Id, Fetch_Orders_Summary, Fetch_Order_By_Id } from '../../API/UserServer';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});


function SearchOrder() {
    const history = useHistory();
    const location = useLocation();
    const [ordersSummary, setOrdersSummary] = useState();
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [needRender, setNeedRender] = useState(false);
    const page = (location.search !== '') ?parseInt(location.search.slice(-1)) :1;
    const [filter, setFilter] = useState({pageNumber: page, type: 'all', status:'all', customerInfo:{initial:'', confirm:''}, date:'None'});

    const showHandler=()=>{
        (showSearchInput)
            ? setShowSearchInput(false)
            : setShowSearchInput(true)
    }

    const FetchOrderSummary=()=>{
        let {pageNumber, type, status, customerInfo, date} = filter;
        Fetch_Orders_Summary(`?customerInfo=${(customerInfo.confirm === '')?'None' : customerInfo.confirm}&type=${type}&status=${status}&date=${date}&page=${pageNumber}`)
            .then(function(response){

                setOrdersSummary(response.data)
            })
            .catch(function(error){
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
            })
    }

    const FetchOrderById=(orderId, action)=>{
        Fetch_Order_By_Id(orderId)
            .then(function(response){

                if (action === 'edit'){ // if order is pending and can be edited or deleted
                    redirectPlaceOrderPageOrDelete(response);
                }
                else if(action === 'view'){ // if order is completed and cannot be edited or deleted
                    // alert("view page")
                    history.push({pathname:'/order/view', state: response.data})
                }
                else{
                    changePage(orderId, response);
                }
            })
            .catch(function(error){
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
            })
    }

    const FetchBillById=(billId)=>{
        Fetch_Bill_By_Id(billId)
            .then(function(response){
                let bill = response.data;
                // seperating response data
                const customer = bill.customer;
                const billProductList = bill.billProduct;
                delete bill.customer;
                delete bill.billProduct;

                // if bill amount is unpaid or draft navigate to generate bill i.e. update or else navigate invoice page
                (bill['remainingAmount'] <= 0 && bill['status'] === 'submitted')
                    ? history.push({pathname:'/bill/invoice', state:billId, search: `?billno=${ billId}`})
                    : history.push({pathname:'/bill', state:{dataType:'oldBill', bill:bill, customer:customer, billProductList:billProductList}, search: `?billno=${ billId}`});

            })
            .catch(function(error){
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
            })
    }

    const DeleteOrderById=(orderId)=>{
        Delete_Pending_Order(orderId)
            .then(function(response){
                setNeedRender(!needRender);

                Toast.fire({
                    icon: 'success',
                    title: response.data,
                });
            })
            .catch(function(error){
                Toast.fire({
                    icon: 'error',
                    title: error.response.data[0]['message'],
                });
            })
    }


    const redirectPlaceOrderPageOrDelete=(response)=>{
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
                history.push({pathname:'/order', state: response.data})
            }
            else if(result.isDenied){ //if delete button click
                const { orderId } = response.data.orders;
                console.log(orderId);
                Swal.fire({
                    title: `Do you want to delete Order ${orderId}`,
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showDenyButton: true,
                    confirmButtonText: 'Delete',
                    denyButtonText: `Cancel`,
    
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        DeleteOrderById(orderId);
                    }
                });
            }
        });
    }





    const changePage= (orderId, response)=>{
        Swal.fire({
            title: 'Select action',
            icon: 'info',
            confirmButtonColor: '#3085d6',
            denyButtonColor: '#d33',
            showDenyButton: true,
            confirmButtonText: 'View',
            denyButtonText: 'Generate bill'

        }).then((result) => {
            if(result.isConfirmed){ //if edit button click

                history.push({pathname:'/order/view', state: response.data})
            }
            else if(result.isDenied){ //if generate bill button click
                let customer = response.data;
                const order = customer.orders;
                const orderProductList = order.orderProducts;
                delete customer.orders;
                delete order.orderProducts;

                history.push({pathname:'/bill', state:{dataType:'orderBill', bill:order, customer:customer, billProductList:orderProductList}, search: `?orderno=${ orderId}`});
            }
        });
    }

    const buttonHandler=(orderId, billId, status, billStatus)=>{
        // FetchOrderById(orderId);
        if (status === 'pending'){
            FetchOrderById(orderId,'edit');
        }
        else if(status === 'inprogress'){
            FetchOrderById(orderId,'view');
        }
        else if(status === 'completed' && billId === '-'){
            FetchOrderById(orderId)
        }
        else if((status === 'completed' && billId !== '-') || (status === 'submitted' && billStatus === 'submitted')){
            // view order or go to bill
            Swal.fire({
                title: 'Select action',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#d33',
                showDenyButton: true,
                confirmButtonText: 'View order',
                denyButtonText: 'Go to bill'
    
            }).then((result) => {
                if(result.isConfirmed){ //if edit button click
                    FetchOrderById(orderId,'view');
                }
                else if(result.isDenied){ //if Go to billbutton click
                    FetchBillById(billId);
                }
            });
        }
        
        
    }

    const changePagehandler =(btnName)=>{
        if(ordersSummary.next !== null && btnName === 'next'){
            filter.pageNumber = filter.pageNumber +1;

            setFilter({...filter});
        }
        else if(ordersSummary.previous !== null && btnName === 'previous'){
            filter.pageNumber = filter.pageNumber -1;

            setFilter({...filter});
        }
    }

    const changefilterInputHandler=({target})=>{
        let  {name, value} = target;

        if(name === 'customerInfo'){
            filter.customerInfo.initial = value;

            (value === '') && (searchButtonHandler())
        }
        else if (name === 'datepicker'){

            filter.date = (target.value != null) ? format(target.value, 'yyyy-MM-dd') : 'None';
            filter.pageNumber = 1;
        }
        else{
            filter[name] = value;
            filter.pageNumber = 1;
        }


        setFilter({...filter});
    }

    const searchButtonHandler = ()=>{
        filter.customerInfo.confirm = filter.customerInfo.initial;
        filter.pageNumber = 1;

        setFilter({...filter});
    }

    const sortButtonHandler = () =>{
        console.log(ordersSummary);
        ordersSummary['results'] = (!location.search.includes('sorted'))
                                    ?  ordersSummary.results.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                                    :  ordersSummary.results.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))

        setOrdersSummary({...ordersSummary});

        history.push({
            pathname: '/order/search',
            search: (!location.search.includes('sorted')) ?`?sorted&page=${filter.pageNumber}` :`?page=${filter.pageNumber}`
        });
    }

    useEffect(()=>{
        history.push({
            pathname: '/order/search',
            search: `?page=${ filter.pageNumber }`
        });

        FetchOrderSummary();
    },[filter.pageNumber, filter.type, filter.status, filter.customerInfo.confirm, filter.date, needRender]);


    return (
    <div className="card background--none " id='search-card'>
        <section className={`top-icons`}>
            <span>
                <div className='filter-btn'>
                    <p onClick={sortButtonHandler}><i><FaSortAmountUpAlt/></i> Sort</p>
                    <p onClick={showHandler}><i><FaFilter/></i> Filter</p>
                </div>

                <div className={`search-input mb-3 ${(showSearchInput)? 'show' :'hide'}`}>
                    <section>
                        <span>
                            <p>Type</p>
                            <select name="type" id="orderType" className="dropdown-toggle" value={filter.type} onChange={changefilterInputHandler}>
                                <option value="all">All</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                            </select>
                        </span>

                        <span>
                            <p>Status</p>
                            <select name="status" id="orderStatus" className="dropdown-toggle" value={filter.status} onChange={changefilterInputHandler}>
                                <option value="all">All</option>
                                <option value="submitted">Submitted</option>
                                <option value="completed">Completed</option>
                                <option value="inprogress">Inprogress</option>
                                <option value="pending">Pending</option>
                            </select>
                        </span>
                    </section>

                    <aside>
                        <DatePickerComponent
                            allowEdit={false}
                            name="datepicker"
                            format="MMM dd, yyyy"
                            onChange={changefilterInputHandler}
                            style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}}
                        ></DatePickerComponent>

                        <input type="search" className="form-control" name='customerInfo' placeholder='Search Customer...' value={filter.customerInfo.initial} onChange={changefilterInputHandler}/>
                        <button type="button" className="btn btn-primary search-btn" onClick={searchButtonHandler}>
                            <i><HiSearch/></i>
                        </button>
                    </aside>
                </div>
            </span>

        </section>

        <SearchOrderTable ordersSummary={ordersSummary} changePagehandler={changePagehandler} buttonHandler={buttonHandler} sortButtonHandler={sortButtonHandler}/>
    </div>
  )
}

export default SearchOrder



/**
 * <span className='d-flex' style={{justifyContent:'space-between'}}>
                    <div className='d-flex gap-2'>
                        <p>pending</p>
                        <p>inprogress</p>
                        <p>completed</p>
                    </div>
                    {/* <div className='filter-btn'>   /*
                    <div className='d-flex gap-2'>
                        <p><i><FaSortAmountUpAlt/></i> Sort</p>
                        <p onClick={showHandler}><i><FaFilter/></i> Filter</p>
                    </div>
                </span>
 */





/**const buttonHandler=(orderId, billId, status, billStatus)=>{
        FetchOrderById(orderId);
        // if(status === 'pending'){
        //     FetchOrderById(orderId);
        // }
        // else if(status === 'inprogress'){
        //     alert("view only")
        // }
        // else if(status === 'completed' && billStatus !== 'submitted'){ //i.e.completed
        //     alert("view order or generate bill")
        //     Swal.fire({
        //         confirmButtonColor: '#3085d6',
        //         denyButtonColor: '#625c78',
        //         showDenyButton: true,
        //         confirmButtonText:`View order`,
        //         denyButtonText: `Generate Bill`

        //     }).then((result) => {
        //         if(result.isConfirmed){ //if view order button click
        //             alert("VIew")
        //         }
        //         else if(result.isDenied){ //if generate bill button click
        //             FetchBillById(billId);
        //         }
        //     });
        // }
        // else if(billStatus === 'submitted'){
        //     alert("view order or view bill")
        //     FetchOrderById(orderId);
            // FetchOrderById(orderId);
            // changePage();
            // Swal.fire({
            //     confirmButtonColor: '#3085d6',
            //     denyButtonColor: '#625c78',
            //     showDenyButton: true,
            //     confirmButtonText:`View order`,
            //     denyButtonText: `View Invoice`

            // }).then((result) => {
            //     if(result.isConfirmed){ //if view order button click
            //         alert("VIew")
            //     }
            //     else if(result.isDenied){ //if generate bill button click
            //         FetchBillById(billId);
            //     }
            // });

        // // }
        // // id bill id dont exit allow to edit order or else navigate to bill
        // ( billId === '-')
        //     ? FetchOrderById(orderId)
        //     : FetchBillById(billId);
    } */                










/// button handler


/**if(status === 'pending'){
            //edit
            FetchOrderById(orderId, status);
        }
        else if(status === 'inprogress'){
            //view only
            FetchOrderById(orderId, status);
        }
        else if(status === 'completed' && billId === '-'){
            //alert("view order or generate bill");
            FetchOrderById(orderId, status);
        }
        else if(status === 'completed' && billStatus === 'draft'){
            //alert("view order or edit bill");
            Swal.fire({
                title: 'Select action',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#d33',
                showDenyButton: true,
                confirmButtonText: 'View',
                denyButtonText: 'Edit bill'
    
            }).then((result) => {
                if(result.isConfirmed){ //if view button click
                    //alert("View page")
                    FetchOrderById(orderId, status, billStatus);
                    // history.push({pathname:'/order', state: response.data})
                }
                else if(result.isDenied){ //if edit bill button click
                    FetchBillById(billId)
                }
            });
        }
        else if(status === 'completed' && billStatus === 'submitted'){
            Swal.fire({
                title: 'Select action',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#d33',
                showDenyButton: true,
                confirmButtonText: 'View',
                denyButtonText: 'Edit bill'
    
            }).then((result) => {
                if(result.isConfirmed){ //if edit button click
                    alert("View page")
                    FetchOrderById(orderId, status, billStatus);
                    // history.push({pathname:'/order', state: response.data})
                }
                else if(result.isDenied){ //if generate bill button click
                    FetchBillById(billId)
                }
            });
        } */    



// button vlivk handler last else if
        // else if(){
        //     alert("view order or view bill")
        //     Swal.fire({
        //         title: 'Select action',
        //         icon: 'info',
        //         confirmButtonColor: '#3085d6',
        //         denyButtonColor: '#d33',
        //         showDenyButton: true,
        //         confirmButtonText: 'View order',
        //         denyButtonText: 'Go to bill'
    
        //     }).then((result) => {
        //         if(result.isConfirmed){ //if edit button click
        //             FetchOrderById(orderId,'view');
        //             // history.push({pathname:'/order', state: response.data})
        //         }
        //         else if(result.isDenied){ //if generate bill button click
        //             FetchBillById(billId)
        //         }
        //     });
        // }
        


/** const FetchOrderById=(orderId, action)=>{
        // const FetchOrderById=(orderId, status, billStatus)=>{
        Fetch_Order_By_Id(orderId)
            .then(function(response){
                // (status === 'pending')
                //     ? history.push({pathname:'/order', state: response.data})
                //     : changePage(orderId, response);
                // // if(status === 'pending'){ // only edit order
                // //     history.push({pathname:'/order', state: response.data})
                // // }
                // // else if(status === 'inprogress' ){
                // //     alert("View page")
                // // }
                // // else if(status === 'completed' && billStatus === ''){
                // //     changePage(orderId, response);
                // // }

                if (action === 'edit'){
                    history.push({pathname:'/order', state: response.data})
                }
                else if(action === 'view'){
                    alert("view page")
                }
                else{
                    changePage(orderId, response);
                }
                // changePage(orderId, response);

            })
            .catch(function(error){
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
            })
    } */        



    /**const buttonHandler=(orderId, billId, status, billStatus)=>{
        // FetchOrderById(orderId);
        if (status === 'pending'){
            //alert("edit order")
            // FetchOrderById(orderId, status, billStatus);
            FetchOrderById(orderId,'edit');
        }
        else if(status === 'inprogress'){
            alert("view order")
            FetchOrderById(orderId,'view');
        }
        else if(status === 'completed' && billId === '-'){
           // alert("View order or generate bill", billStatus)
            FetchOrderById(orderId)
        }
        else if((status === 'completed' && billId !== '-') || (status === 'submitted' && billStatus === 'submitted')){
            alert("view order or go to bill")
            Swal.fire({
                title: 'Select action',
                icon: 'info',
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#d33',
                showDenyButton: true,
                confirmButtonText: 'View order',
                denyButtonText: 'Go to bill'
    
            }).then((result) => {
                if(result.isConfirmed){ //if edit button click
                    FetchOrderById(orderId,'view');
                    // history.push({pathname:'/order', state: response.data})
                }
                else if(result.isDenied){ //if generate bill button click
                    FetchBillById(billId);
                }
            });
        }
        
        
    } */