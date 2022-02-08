
import { useHistory } from 'react-router-dom';
import React, {useState, useEffect} from 'react'
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Fetch_All_Rates } from '../../API/UserServer';
import { Spinner } from '../../Components/index';

function Dashboard() {

    const history = useHistory();

    const [rates, setRates]= useState();

    
    const fetchRates=()=>{

        Fetch_All_Rates()
            .then(function (response) {
                // handle success
                setRates(response.data.reverse().slice(0,3))
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }


    useEffect(() => {
        fetchRates();
    }, [])

    return (
        <section className="section dashboard">
            <div className="row">

                {/* <!-- Left side columns --> */}
                <div className="col-lg-8">
                    <div className="row">

                        {
                            [{title:'Bill', icon: 'bi-cart', link:'/bill'}, {title:'Order', icon: 'bi-currency-dollar', link:'/order'}, {title:'Staff', icon: 'bi-people-fill', link:'/'}].map(
                                (item, index)=>{
                                   return (
                                    <div className="col-xxl-4 col-md-6 curser--on-hover" key={index+"BDS"}   onClick={()=> history.push(item.link)}>
                                        <div className="card info-card sales-card">

                                            <div className="filter">
                                                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                    <li className="dropdown-header text-start">
                                                        <h6>Filter</h6>
                                                    </li>

                                                    <li><a className="dropdown-item" href="#">Today</a></li>
                                                    <li><a className="dropdown-item" href="#">This Month</a></li>
                                                    <li><a className="dropdown-item" href="#">This Year</a></li>
                                                </ul>
                                            </div>

                                            <div className="card-body">
                                                <h5 className="card-title">{item.title} <span>| Today</span></h5>
                                                <div className="d-flex align-items-center">
                                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                        <i className={"bi "+item.icon}></i>
                                                    </div>

                                                    <div className="ps-3">
                                                        <h6>145</h6>
                                                        <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                   )
                                   
                                }
                            )
                        }                     


                        {/* Order table */}
                        <div className="col-12">
                            <div className="card orders">

                                <div className="filter">
                                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a className="dropdown-item" href="#">Today</a></li>
                                        <li><a className="dropdown-item" href="#">This Month</a></li>
                                        <li><a className="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title">Orders <span>| Today</span></h5>

                                    <table className="table table-borderless datatable">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row"><a href="#">#2457</a></th>
                                                <td>Brandon Jacob</td>
                                                <td><a href="#" className="text-primary">At praesentium minu</a></td>
                                                <td>$64</td>
                                                <td><span className="badge bg-success">Approved</span></td>
                                            </tr>

                                            <tr>
                                                <th scope="row"><a href="#">#2147</a></th>
                                                <td>Bridie Kessler</td>
                                                <td><a href="#" className="text-primary">Blanditiis dolor omnis similique</a></td>
                                                <td>$47</td>
                                                <td><span className="badge bg-warning">Pending</span></td>
                                            </tr>

                                            <tr>
                                                <th scope="row"><a href="#">#2049</a></th>
                                                <td>Ashleigh Langosh</td>
                                                <td><a href="#" className="text-primary">At recusandae consectetur</a></td>
                                                <td>$147</td>
                                                <td><span className="badge bg-success">Approved</span></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>     
                            </div>

                        </div>

                    </div>
                </div>


                {/* <!-- Right side columns --> */}
                <div className="col-lg-4">
                    {/* Rate Card */}
                    <div className="card rate">
                        <div className=" d-flex justify-content-between px-3 py-2">
                            <h4 className="card-title fs-5 p-2 m-0 curser--on-hover" onClick={()=>{history.push('/rate')}}>Rates</h4>

                            <span className='rate-datepicker'>
                                <DatePickerComponent format="MMM dd yyyy" value= {new Date()} style={{fontFamily:'Poppins sans-serif', fontSize:'1rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}}></DatePickerComponent>
                            </span>
                            
                        </div> 

                        {
                            (rates != undefined)
                                ? (rates.map(
                                    (rate, index)=>{
                                        return(
                                            <table className='rate-table' key={index+"dashboardRates"}> 
                                                <thead className='rate-date text-end'>
                                                    <tr >
                                                        <th colSpan="2">{new Date(rate.date).toDateString()}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row"><a href="#">Hallmart:</a></th>
                                                        <td>Rs. {rate.hallmarkRate}/tola</td>                                                                                                               
                                                    </tr>

                                                    <tr>
                                                        <th scope="row"><a href="#">Tajabi:</a></th>
                                                        <td>Rs. {rate.tajabiRate}/tola</td> 
                                                    </tr>

                                                    <tr>
                                                        <th scope="row"><a href="#">Silver:</a></th>
                                                        <td>Rs. {rate.silverRate}/tola</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        );
                                    }
                                ))
                                : <Spinner/>
                        }
                        
                    </div>

                </div>
            </div>   
        </section>
    )
}


export default Dashboard