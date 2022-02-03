import './bill.css';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import { BiFirstPage, BiLastPage} from 'react-icons/bi';
import { FaSortAmountUpAlt, FaFilter } from 'react-icons/fa';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Spinner } from '../../Components/index';
import { Fetch_Bill_Summary } from '../../API/UserServer';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});


function SearchBill() {
    const history = useHistory();
    const location = useLocation();
    const [billType, setBillType] = useState('all');
    const [billStatus, setBillStatus] = useState('all');
    const [billSummary, setBillSummary] = useState();
    const [initailReder, setInitialRender] = useState(true);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const page = (location.search !== '') ?parseInt(location.search.slice(-1)) :1;
    const [pageNumber, setPageNumber] = useState(page);
    const [searchValue, setSearchValue] = useState({initial: '', confirm:''});
    
    const showHandler=()=>{
        (showSearchInput)
            ? setShowSearchInput(false)
            : setShowSearchInput(true)
    }

    const fetchBillsSummary = ()=>{
        let searchFor = (searchValue.confirm === '') 
                            ? `/?billType=${billType}&billStatus=${billStatus}&page=${pageNumber}`
                            : `/${searchValue.confirm}/?billType=${billType}&billStatus=${billStatus}&page=${pageNumber}`

        Fetch_Bill_Summary(searchFor)
            .then(function (response) {
                // handle success

                setBillSummary(response.data);
            })
            .catch(function (error) {
                // handle error
                billSummary['results'] = [];
                billSummary['pageIndex'] = `${pageNumber} of 1`;

                setBillSummary({...billSummary});

                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
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

    const changeBillTypeHandler = ({target})=>{
        alert("In");
        console.log(target.value);
        setBillType(target.value)
    };

    const changeBillStatusHandler = ({target})=> setBillStatus(target.value);

    const filterInputHandler = ({target})=>{
        searchValue['initial'] = target.value;

        setSearchValue({...searchValue});
    }

    const searchButtonHandler = ()=>{
        searchValue['confirm'] = searchValue['initial'];

        setPageNumber(1);
        setSearchValue({...searchValue});
    }

    const sortButtonHandler = () =>{

        billSummary['results'] = (!location.search.includes('sorted'))
                                    ?  billSummary.results.sort((a,b) => (a.billId > b.billId) ? 1 : ((b.billId > a.billId) ? -1 : 0))
                                    :  billSummary.results.sort((a,b) => (a.billId < b.billId) ? 1 : ((b.billId < a.billId) ? -1 : 0))

        setBillSummary({...billSummary});

        history.push({
            pathname: '/bill/search',
            search: (!location.search.includes('sorted')) ?`?sorted/?page=${ pageNumber}` :`?page=${pageNumber}`
        });
    }


    useEffect(()=>{
            history.push({
                pathname: '/bill/search',
                search: `?page=${ pageNumber}`
            });
    
            fetchBillsSummary();
    },[pageNumber, searchValue.confirm, billType, billStatus]);

    // it will be called if the filter input is empty
    useEffect(()=>{
        if(searchValue.initial === ''){
            searchValue['confirm'] = '';

            setSearchValue({...searchValue})
        }
    },[searchValue.initial]);

    useEffect(()=>{
        (!initailReder)
            ?setPageNumber(1)
            :setInitialRender(false);
    },[billType, billStatus])


    return (
        <div className="card background--none " id='search-card'>
            <section className={`top-icons`}>
                <span>
                    <div className='filter-btn'>  
                        <p onClick={sortButtonHandler}><i><FaSortAmountUpAlt/></i> Sort</p>
                        <p onClick={showHandler}> <i><FaFilter/></i> Filter</p>
                    </div>

                    <div className={`search-input mb-3 ${(showSearchInput)? 'show' :'hide'}`}>
                        <section>
                            <span>
                                <p>Type</p>
                                <select name="billType" id="billType" className="dropdown-toggle" value={billType} onChange={changeBillTypeHandler}>
                                    <option value="all">All</option>
                                    <option value="gold">Gold</option>
                                    <option value="silver">Silver</option>
                                </select>
                            </span>

                            <span>
                                <p>Status</p>
                                <select name="billStatus" id="billType" className="dropdown-toggle" value={billStatus} onChange={changeBillStatusHandler}>
                                    <option value="all">All</option>
                                    <option value="submitted">Submit</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </span>
                        </section>
                        
                        <aside>
                            <DatePickerComponent 
                                format="MMM dd, yyyy" 
                                style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}} 
                            ></DatePickerComponent>

                            <input type="search" value={searchValue.initial}  onChange={filterInputHandler} className="form-control" placeholder='Search Customer...'/>
                            <button type="button" className="btn btn-primary search-btn" onClick={searchButtonHandler}>
                                <i><HiSearch/></i>
                            </button>
                        </aside>
                        
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
        </div>
    )
}

export default SearchBill
