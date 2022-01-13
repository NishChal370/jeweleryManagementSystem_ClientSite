import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { AXIOS, URL_SET_RATE } from '../../API/Constant';

import { ShowInvalidnMessage } from '../../Assets/js/validation';
import { setLatestRate } from '../../Redux/Action';

let rate = {
    'hallmarkRate': 0,
    'tajabiRate': 0,
    'silverRate': 0,
}

let initalRate = {
    'hallmarkRate': 0,
    'tajabiRate': 0,
    'silverRate': 0,
}

function ChangeRate() {
    const dispatch = useDispatch();
    const latestRate = useSelector(state => state.latestRateReducer.data);

    const [currentRate, setCurrentRate] = useState(rate);

    const inputChangeHandler=(e)=>{
        if(isFinite(e.target.value)){
            currentRate[e.target.name] = e.target.value;
            
            setCurrentRate({...currentRate});
        } 
    };

    const submitHandler=(e)=>{
        e.preventDefault();

        setCurrentRateHandler();
        
    };

    const resetHandler=(e)=>{
        setCurrentRate({...initalRate});
    }

    //set current rate to DB
    const setCurrentRateHandler=()=>{
        // axios.post(`http://127.0.0.1:8000/api/rate-set/`, currentRate)
        AXIOS.post(URL_SET_RATE, currentRate)
            .then(function (response) {
                // handle success;  
                alert(" POST SET rate fnction from change rate Saved");

                dispatch(setLatestRate(response.data));
            })
            .catch(function (error) {
                // handle error
                alert('INVALID REQUEST !!!');
            })
    };

    useEffect(() => {
        if(latestRate !== undefined){
            Object.keys(latestRate).map((rateTitle,index) => {

                 // get only HallmarkRate, TajabiRate and SilverRate from latestRate
                if ( currentRate.hasOwnProperty(rateTitle) ){
                    currentRate[rateTitle] = latestRate[rateTitle];

                    setCurrentRate({...currentRate});
                }
    
            });

            initalRate = currentRate;
        }
        
    }, [latestRate]);

    useEffect(() => {
        ShowInvalidnMessage();
    }, []);

    return (
        <>
        <div className="card">
            <div className="card-body">
                <form className='mt-5 ms-5 fs-3 needs-validation' onSubmit={submitHandler} noValidate>

                    {
                        Object.keys(currentRate).map((rateTitle,index) => 
                            <div className="row mb-3" key={index+'rateInput'}>
                                <label className="col-sm-2 col-form-label rate--title">{rateTitle.charAt(0).toUpperCase() + rateTitle.slice(1, rateTitle.indexOf('R'))}</label>
                                <div className="col-sm-10 position-relative">
                                    <input type="text" name= {rateTitle} className="form-control w-50 " id="inputText" required
                                        value={currentRate[rateTitle]}
                                        onChange={inputChangeHandler}
                                    />

                                    <div className="invalid-tooltip">
                                        Invalid Price.
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <div className="row mb-3 ">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10 mb-3 justify-content-center">
                            <button type="submit" className="btn btn-primary w-50">Submit</button>
                        </div>

                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button type="reset" className="btn btn-secondary w-50" onClick={resetHandler}>Reset</button>
                        </div>
                    </div>

                </form>
            
            </div>
        </div>
        </>
    )
}

export default ChangeRate