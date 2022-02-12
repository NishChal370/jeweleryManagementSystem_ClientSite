import './bill.css';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { FaSortAmountUpAlt, FaFilter } from 'react-icons/fa';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Delete_Bill_By_Id, Fetch_Bill_Summary } from '../../API/UserServer';
import { SearchBillTable } from '../../Components';


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
    const [billSummary, setBillSummary] = useState();
    const [billType, setBillType] = useState('all');
    const [billStatus, setBillStatus] = useState('all');
    const [searchedDate, setSearchedDate] = useState(null);
    const [initailReder, setInitialRender] = useState(true);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [isProductDeleted, setIsProductDeleted] = useState(false);
    const [searchValue, setSearchValue] = useState({initial: '', confirm:''});
    const page = (location.search !== '') ?parseInt(location.search.slice(-1)) :1;
    const [pageNumber, setPageNumber] = useState(page);
    

    const showHandler=()=>{
        (showSearchInput)
            ? setShowSearchInput(false)
            : setShowSearchInput(true)
    }

    const fetchBillsSummary = ()=>{
        let searchFor = (searchValue.confirm === '') // if search not with customer detail
                            ? `/?billType=${billType}&billStatus=${billStatus}&page=${pageNumber}`
                            : `/${searchValue.confirm}/?billType=${billType}&billStatus=${billStatus}&page=${pageNumber}`

                                         //if search by date
        searchFor = (searchedDate != null) ?`${searchFor}&billDate=${searchedDate}` : searchFor

        Fetch_Bill_Summary(searchFor)
            .then(function (response) {
                // handle success

                setBillSummary(response.data);
            })
            .catch(function (error) {
                // handle error
                // billSummary['results'] = [];
                // billSummary['pageIndex'] = `${pageNumber} of 1`;

                // setBillSummary({...billSummary});

                Toast.fire({
                    icon: 'error',
                    title: 'Not found!!',
                });
                console.log(error);
            });
    }
    
    const DeleteBillById =(billId)=>{
        Delete_Bill_By_Id(billId)
            .then(function(response){
                setIsProductDeleted(!isProductDeleted)
                
            })
            .catch(function(error){
                console.log(error);
            })
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

        setBillType(target.value);
    }

    const changeBillStatusHandler = ({target})=> setBillStatus(target.value);

    const datePickerHandler = ({target})=>{
        let date = (target.value != null) ? format(target.value, 'yyyy-MM-dd') : target.value;
        
        setSearchedDate(date);
    }

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
                                    ?  billSummary.results.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                                    :  billSummary.results.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))

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
    },[pageNumber, searchValue.confirm, billType, billStatus, searchedDate, isProductDeleted]);

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
    },[billType, billStatus, searchedDate])


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
                                allowEdit={false}
                                format="MMM dd, yyyy"
                                onChange={datePickerHandler}
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

            <SearchBillTable billSummary={billSummary}  changePagehandler={changePagehandler} DeleteBillById={DeleteBillById}/>
        </div>
    )
}

export default SearchBill
