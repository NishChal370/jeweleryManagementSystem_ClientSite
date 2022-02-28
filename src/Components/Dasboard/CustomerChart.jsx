import { Spinner } from '..';
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Fetch_Customer_Address_Report } from '../../API/UserServer';


ChartJS.register(
    Tooltip, 
    Legend,
    ArcElement,
)

function CustomerChart() {
    const [data, setData] = useState();

    const fetchCustomerAddressReport=()=>{
        Fetch_Customer_Address_Report()
            .then(function(response){
                let  dataa = {
                    labels: Object.keys(response.data),
                    datasets: [
                      {
                        label: 'Customers Address',
                        data: Object.values(response.data),
                        backgroundColor: [
                          'rgba(224, 49, 86)',
                          'rgba(16, 125, 199)',
                          'rgba(191, 144, 29)',
                          'rgba(8, 153, 153)',
                          'rgba(114, 68, 207)',
                          'rgba(184, 115, 48)',
                        ],
                        borderColor: [
                          'rgba(224, 49, 86, 1)',
                          'rgba(16, 125, 199, 1)',
                          'rgba(191, 144, 29, 1)',
                          'rgba(8, 153, 153, 1)',
                          'rgba(114, 68, 207, 1)',
                          'rgba(184, 115, 48, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                };

                setData({...dataa});
            })
            .catch(function(error){
                console.log("Error")
            })
    }

    useEffect(()=>{
        fetchCustomerAddressReport();
    },[])


    return (
        <div className="col-12" >
            <div className="card rate">
                <div className="card-body">
                    <h5 className="card-title">Customers <span>| Address</span></h5>
                    
                    {(data !== undefined)
                        ? <Doughnut data={data} />
                        : <Spinner/>
                    }
                </div>     
            </div>
        </div>
    )
      
}

export default CustomerChart