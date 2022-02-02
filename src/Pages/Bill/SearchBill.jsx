import './bill.css';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import { BiFirstPage, BiLastPage} from 'react-icons/bi';
import { FaSortAmountUpAlt, FaFilter } from 'react-icons/fa';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Fetch_Bill_Summary } from '../../API/UserServer';
import { Spinner } from '../../Components/index';



function SearchBill() {
    const history = useHistory();
    const location = useLocation();
    const [billSummary, setBillSummary] = useState();
    const page = (location.search !== '') ?parseInt(location.search.slice(-1)) :1;
    const [pageNumber, setPageNumber] = useState(page);
    const [showSearchInput, setShowSearchInput] = useState(false);
    

    const showHandler=()=>{
        (showSearchInput)
            ? setShowSearchInput(false)
            : setShowSearchInput(true)
    }

    const fetchBillsSummary = ()=>{

        Fetch_Bill_Summary(pageNumber)
            .then(function (response) {
                // handle success
                console.log(response.data);
                setBillSummary(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
    
    const changePagehandler =(btnName)=>{
        if(billSummary.next !== null && btnName === 'next'){

            setPageNumber(pageNumber+1);
        }
        else if(billSummary.previous !== null && btnName === 'previous'){

            setPageNumber(pageNumber-1);
        }
    }

    useEffect(()=>{
        history.push({
            pathname: '/bill/search',
            search: `?page=${ pageNumber}`
        });

        fetchBillsSummary();
    },[pageNumber]);


    return (
        <div className="card background--none " id='search-card'>
            <section className={`top-icons`}>
                <span>
                    <div className='filter-btn'>
                        
                        <p><i><FaSortAmountUpAlt/></i> Sort</p>
                        <p onClick={showHandler}> <i><FaFilter/></i> Filter</p>
                    </div>

                    <div className={`search-input mb-3 ${(showSearchInput)? 'show' :'hide'}`}>
                        <DatePickerComponent 
                            format="MMM dd, yyyy" 
                            style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}} 
                        ></DatePickerComponent>
                        <input type="search" className="form-control" placeholder='Search...'/>
                        <button type="button" className="btn btn-primary search-btn">
                            <i><HiSearch/></i>
                        </button>
                    </div>
                </span>
                
            </section>
            
            <section className='bill-table-card'>
            {(billSummary !== undefined) 
            ?(
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Bill No.</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Phone</th>
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
                        billSummary.results.map(({billId, customerName, phone, type, totalProduct, productsWeight, customerProductWeight, status, payment, date}, index)=>{
                            return(
                                <tr key={`${index}SBTR`}>
                                    <th scope="row">{billId}</th>
                                    <td>{customerName}</td>
                                    <td>{phone}</td>
                                    <td style={{color: (type === 'gold')? '#b36b00' : '#595959'}}>{type}</td>
                                    <td>{totalProduct}</td>
                                    <td>{productsWeight}</td>
                                    <td>{customerProductWeight}</td>
                                    <td><span className={`badge bg-${(status === 'submitted')?'success': 'warning'}`}>{status}</span></td>
                                    <td><span className={`badge bg-${(payment === 'Payed')?'success':'danger'}`}>{payment}</span></td>
                                    <td>{date}</td>
                                    <td>{(status ==='draft')? <FiEdit/> : null}</td>
                                </tr>
                            )
                        }) 

                    }
                    </tbody>
                    <tfoot>
                        <tr className="text-end">
                            <td colSpan="11" className="border-top">
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
        </div>
    )
}

export default SearchBill
