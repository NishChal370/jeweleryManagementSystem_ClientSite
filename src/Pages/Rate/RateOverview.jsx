import axios from 'axios';

import React, { useEffect, useState } from 'react'

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { format } from 'date-fns';

function RateOverview() {

    const [rates, setRates]= useState();

    const fetchRates=()=>{
        axios.get('http://127.0.0.1:8000/api/rates/')
            .then(function (response) {
                // handle success
                setRates(response.data.reverse())
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    };

    const searchRate=(e)=>{
        let date = format(e.target.value, 'yyyy-MM-dd');

        axios.get(`http://127.0.0.1:8000/api/rate/${date}`)
            .then(function (response) {
                // handle success;  
                setRates([response.data]);
            })
            .catch(function (error) {
                // handle error
                alert('Not Found');
            })
    };

    useEffect(() => {
        fetchRates();
    }, []);



    return (
        // <div className="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
        <>
            <span className='d-flex justify-content-end'>
                <div className='rate-datepicker'>                                                                                                                                                      {/*  onChange={(e)=>{alert(e.target.value)}} */}
                    <DatePickerComponent format="MMM dd, yyyy" style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}} onChange={searchRate}></DatePickerComponent>
                </div>
            </span>
            
            <div className=' rate--overview'>
                {
                (rates !== undefined)
                    ? (rates.map(
                        (rate, index)=>{
                            
                            return(
                                <div className="card" key={index+'rateoverview'}>
                                    <div className="card-body">
                                        <h5 className="card-title">Date :  {new Date(rate.date).toDateString()}</h5>

                                        <div className='rate-table'>
                                            <span className="tr">
                                                <h5>Hallmark</h5>
                                                <p>Rs. {rate.hallmarkRate}/tola</p>
                                            </span>

                                            <span className="tr">
                                                <h5>Tajabi</h5>
                                                <p>Rs. {rate.tajabiRate}/tola</p>
                                            </span>

                                            <span className="tr">
                                                <h5>Silver</h5>
                                                <p>Rs. {rate.silverRate}/tola</p>
                                            </span>
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        }
                    ))
                    : "Not Found"
                }
            </div>
        {/* </div> */}
        </>
    )
}

export default RateOverview
