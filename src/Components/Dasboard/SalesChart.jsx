import { Spinner } from '..';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement} from 'chart.js';
import { Fetch_Sales_Report } from '../../API/UserServer';



ChartJS.register(
    ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, 
    PointElement,
    LineElement,
)

const backgroundColor= [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
];

const borderColor= [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
];

let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function SalesChart() {
    const [data, setData] = useState();
    const [date, setDate] = useState(new Date().toJSON().slice(0,10));


    const FetchSalesReport=()=>{
        Fetch_Sales_Report(date)
            .then(function (response) {
                // handle success
                let dataset =[];
                for(let data in response.data.report){
                    dataset.push({
                        label :data,
                        data :response.data.report[data],
                        backgroundColor : backgroundColor,
                        borderColor :borderColor,
                    })
                }

                setData({
                    labels: response.data.labels,
                    datasets: dataset,
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }


    const datePickerHandler=({target})=>{
        setDate(target.value);
    }

    useEffect(()=>{
        FetchSalesReport()
    },[date])
    
    return (
    <div className="col-12">
        <div className="card rate">
            <div className="filter" style={{paddingRight:'2rem'}}>
                <input type="date" value={date} onChange={datePickerHandler} style={{fontFamily:'Poppins sans-serif', fontSize:'1rem', width:'9rem', paddingTop:'0.3rem', textAlign:'center', border:'none', borderBottom:'1px solid #012970'}}/>
            </div>
            <div id='product-sales-report' className="card-body">
                <h5 className="card-title mb-0 pb-0">Sales <span>| {months[new Date(date).getMonth()]+", "+new Date(date).getFullYear()}</span></h5>

                {(data !== undefined)
                    ? <Line data={data}/>
                    : <Spinner/>
                }
            </div>     
        </div>

    </div>

    )
}

export default SalesChart