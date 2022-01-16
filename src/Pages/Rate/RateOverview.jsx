import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2';

import { format } from 'date-fns';

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { AXIOS, URL_GET_ALL_RATES, URL_GET_RATE_BY_DATE } from '../../API/Constant';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
});


function RateOverview() {

    const [rates, setRates]= useState();


    const fetchRates=()=>{
        AXIOS.get(URL_GET_ALL_RATES)
            .then(function (response) {
                // handle success
                setRates(response.data.reverse())
            })
            .catch(function (error) {
                // handle error
                Toast.fire({
                    icon: 'error',
                    title: error,
                });
                console.log(error);
            })
    };

    /**Search rate by rate */
    const fetchGetRate=(e)=>{
        let date = format(e.target.value, 'yyyy-MM-dd');

        AXIOS.get(URL_GET_RATE_BY_DATE+date)
            .then(function (response) {
                // handle success; 

                setRates([response.data]);
            })
            .catch(function (error) {
                // handle error
                
                Toast.fire({
                    icon: 'error',
                    title: 'Request Not Found'
                });
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
                        onChange={fetchGetRate}
                        style={{fontFamily:'Poppins sans-serif', fontSize:'1.4rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center'}} 
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
                                                                : ""
                                                })
                                            }

                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        }
                    ))
                    : <h5>Not Found !</h5>
                }
            </div>
        </>
    )
}


export default RateOverview
