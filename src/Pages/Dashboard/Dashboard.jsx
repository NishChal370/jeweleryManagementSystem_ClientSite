
import { useHistory } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { Fetch_All_Rates, Fetch_Increment_Report } from '../../API/UserServer';
import { DataTable, Spinner } from '../../Components/index';
import RateChart from '../../Components/Dasboard/RateChart';
import CustomerChart from '../../Components/Dasboard/CustomerChart';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";



function Dashboard() {
    const history = useHistory();
    const [rates, setRates]= useState();
    const [incrementReport, setIncrementReport] = useState();
    
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

    //get staffwork, order, bill total of this month with total increment
    const fetchIncrementReport=()=>{
        Fetch_Increment_Report()
            .then(function(response){
                setIncrementReport(response.data)

            })
            .catch(function(error){
                console.log(error.response.data);
            })
    }


    useEffect(() => {
        fetchRates();
        fetchIncrementReport()
    }, [])

    return (
        <section className="section dashboard">
            <div className="row">

                {/* <!-- Left side columns --> */}
                <div className="col-lg-8">
                    <div className="row">

                        {
                            [{title:'Bill', icon: 'bi-cart', link:'/bill', report: (incrementReport !== undefined)?incrementReport.bill:undefined}, {title:'Order', icon: 'bi-currency-dollar', link:'/order', report: (incrementReport !== undefined)?incrementReport.order:undefined}, {title:'Staff Work', icon: 'bi-people-fill', link:'/staff', report: (incrementReport !== undefined)?incrementReport.staffWork:undefined}].map(
                                (item, index)=>{
                                   return (
                                    <div className="col-xxl-4 col-md-6 curser--on-hover" key={index+"BDS"}>
                                        <div className="card info-card sales-card">

                                            <div className="filter">
                                                <i className="icon" data-bs-toggle="$dropdown"><i className="bi bi-three-dots"></i></i>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                    <li className="dropdown-header text-start">
                                                        <h6>Filter</h6>
                                                    </li>

                                                    <li><a className="dropdown-item" href="#">Today</a></li>
                                                    <li><a className="dropdown-item" href="#">This Month</a></li>
                                                    <li><a className="dropdown-item" href="#">This Year</a></li>
                                                </ul>
                                            </div>

                                            <div className="card-body" onClick={()=> history.push(item.link)}>
                                                <h5 className="card-title">{item.title} <span>| This Month</span></h5>
                                                <div className="d-flex align-items-center">
                                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                        <i className={"bi "+item.icon}></i>
                                                    </div>

                                                    <div className="ps-3">
                                                        <h6>{(item.report !== undefined)?item.report.total: 'Null'}</h6>
                                                        <span className="text-success small pt-1 fw-bold">{(item.report !== undefined)?item.report.increment: 'Null'}</span> <span className="text-muted small pt-2 ps-1">increase</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                   )
                                   
                                }
                            )
                        }                     

                   
                        <DataTable name='Orders'/>
                        <DataTable name='Bills'/>
                        <DataTable name='Staff Works'/>
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

                    <RateChart/>

                    <CustomerChart/>
                </div>
            </div>   
        </section>
    )
}


export default Dashboard