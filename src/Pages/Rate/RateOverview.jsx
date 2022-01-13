import axios from 'axios';

import React, { useEffect, useState } from 'react'

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { format } from 'date-fns';
import { AXIOS, URL_GET_ALL_RATES, URL_GET_RATE_BY_DATE } from '../../API/Constant';

function RateOverview() {

    const [rates, setRates]= useState();

    const fetchRates=()=>{
        // axios.get('http://127.0.0.1:8000/api/rates/')
        AXIOS.get(URL_GET_ALL_RATES)
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

        // AXIOS.get(`http://127.0.0.1:8000/api/rate/${date}`)
        AXIOS.get(URL_GET_RATE_BY_DATE+date)
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
        <>
            <span className='d-flex justify-content-end'>
                <div className='rate-datepicker'>                                                                                                                                                    
                    <DatePickerComponent 
                        format="MMM dd, yyyy" 
                        style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}} 
                        onChange={searchRate}
                    ></DatePickerComponent>
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

                                            {
                                                Object.keys(rate).map((key,index) => {
                                                    return  (['hallmarkRate', 'tajabiRate', 'silverRate'].includes(key))
                                                                ? ( <span className="tr" key={index+'rate'}>
                                                                        <h5 className='rate--title'>{key.charAt(0).toUpperCase() + key.slice(1, key.indexOf('R'))}</h5>
                                                                        <p>Rs. {rate[key]}/tola</p>
                                                                    </span>
                                                                  )
                                                                :""
                                                })
                                            }

                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        }
                    ))
                    : "Not Found"
                }
            </div>
        </>
    )
}

export default RateOverview
