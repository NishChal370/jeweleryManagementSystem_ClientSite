import './bill.css';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import { BiFirstPage, BiLastPage} from 'react-icons/bi';
import { FaSortAmountUpAlt, FaFilter } from 'react-icons/fa';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';


function SearchBill() {
    const [showSearchInput, setShowSearchInput] = useState(false);

    const showHandler=()=>{
        (showSearchInput)
            ? setShowSearchInput(false)
            : setShowSearchInput(true)
    }


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
            <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Bill No.</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Type</th>
                    <th scope="col">Total Product</th>
                    <th scope="col">Product Weight</th>
                    <th scope="col">Customer Product Weight</th>
                    <th scope="col">Status</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Brandon Jacob</td>
                    <td>9847583946</td>
                    <td>Gold</td>
                    <td>1</td>
                    <td>40</td>
                    <td>40</td>
                    <td><span className="badge bg-success">Submitted</span></td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td>2016-05-25</td>
                    <td><FiEdit/></td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Bridie Kessler</td>
                    <td>9847583946</td>
                    <td>Gold</td>
                    <td>1</td>
                    <td>40</td>
                    <td>40</td>
                    <td><span className="badge bg-success">Submitted</span></td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td>2016-05-25</td>
                    <td><FiEdit/></td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Ashleigh Langosh</td>
                    <td>9847583946</td>
                    <td>Gold</td>
                    <td>1</td>
                    <td>40</td>
                    <td>40</td>
                    <td><span className="badge bg-warning">Draft</span></td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td>2016-05-25</td>
                    <td><FiEdit/></td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Angus Grady</td>
                    <td>9847583946</td>
                    <td>Gold</td>
                    <td>1</td>
                    <td>40</td>
                    <td>40</td>
                    <td><span className="badge bg-success">Submitted</span></td>
                    <td><span className="badge bg-danger">Remain</span></td>
                    <td>2016-05-25</td>
                    <td><FiEdit/></td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Raheem Lehner</td>
                    <td>9847583946</td>
                    <td>Gold</td>
                    <td>1</td>
                    <td>40</td>
                    <td>40</td>
                    <td><span className="badge bg-success">Submitted</span></td>
                    <td><span className="badge bg-success">Done</span></td>
                    <td>2016-05-25</td>
                    <td><FiEdit/></td>
                  </tr>
                </tbody>
                <tfoot >
                    <tr className="text-end">
                        <td colspan="10" >
                            <i className='hover--curser'><BiFirstPage/></i> 
                            <i className='hover--curser'><BiLastPage/></i>
                        </td>
                    </tr>
                </tfoot>
              </table>
            </section>
        </div>
    )
}

export default SearchBill
