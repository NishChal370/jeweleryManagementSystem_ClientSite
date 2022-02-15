import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { HiSearch } from 'react-icons/hi'
import { FaFilter, FaSortAmountUpAlt } from 'react-icons/fa'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'



function WorkDetail() {
    const history = useHistory();
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
                    <p onClick={showHandler}><i><FaFilter/></i> Filter</p>
                </div>

                <div className={`search-input mb-3 ${(showSearchInput)? 'show' :'hide'}`}>
                    <section>
                        <span>
                            <p>Order No</p>
                            <input type="number" className="form-control" min={0} style={{width:'4rem'}}/>
                        </span>

                        <span>
                            <p>Type</p>
                            <select name="type" id="billType" className="dropdown-toggle">
                                <option value="all">All</option>
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                            </select>
                        </span>

                        <span>
                            <p>Status</p>
                            <select name="status" id="billType" className="dropdown-toggle">
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
                            // onChange={changefilterInputHandler}
                            style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}}
                        ></DatePickerComponent>

                        <input type="search" className="form-control" name='customerInfo' placeholder='Search Customer...'/>
                        <button type="button" className="btn btn-primary search-btn">
                            <i><HiSearch/></i>
                        </button>
                    </aside>
                </div>
            </span>
        </section>

        <section className='bill-table-card'>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col"><span style={{fontSize:'1.2rem', cursor:'pointer'}}></span> Order No.</th>
                        <th scope="col">Type</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Net Weight</th>
                        <th scope="col">Total Weight</th>
                        <th scope="col">Gems Name</th>
                        <th scope="col">Size</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Assigned</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>gold</td>
                        <td>Ring</td>
                        <td>23</td>
                        <td>30</td>
                        <td>Muga</td>
                        <td>12</td>
                        <td>01</td>
                        <td><span className='badge bg-info'>inprogress</span></td>
                        <td>Ram</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>gold</td>
                        <td>Ring</td>
                        <td>23</td>
                        <td>30</td>
                        <td>Muga</td>
                        <td>12</td>
                        <td>01</td>
                        <td><span className='badge bg-warning'>pending</span> </td>
                        <td><a onClick={()=>history.push("/staff/assign")}>assign</a></td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>gold</td>
                        <td>Ring</td>
                        <td>23</td>
                        <td>30</td>
                        <td>Muga</td>
                        <td>12</td>
                        <td>01</td>
                        <td><span className='badge bg-success'>completed</span> </td>
                        <td>Ram</td>
                    </tr>
                </tbody>
            </table>
        </section>

    </div>
  )
}

export default WorkDetail