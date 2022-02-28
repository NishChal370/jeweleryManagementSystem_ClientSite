import { Spinner } from '..';
import { NotFound2 } from '../../Assets/img';
import React, { useEffect, useState } from 'react';
import { Fetch_Bill_Product_Report_Monthly } from '../../API/UserServer';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement} from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
)

var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function BillProductChart() {
    const [data, setData] = useState();
    const [date, setDate] = useState(new Date().toJSON().slice(0,10));

    const FetchBillProductReportMonthly=()=>{
        Fetch_Bill_Product_Report_Monthly(date)
            .then(function(response){
              let report ={};
              let label = []
              let dataset = []
              let productsList=[];

              // find list of labels and products
              response.data.forEach(data=>{
                label.push(Object.values(data)[0]);

                let product = Object.keys(data);
                product.splice(product.indexOf(product[0]), 1);
                productsList = productsList.concat(product);
              })

              productsList = [...new Set(productsList)];
              
              // add 0 if the product doesnot exist in week
              response.data.forEach((data)=>{
                for(let a in productsList){
                  (!data.hasOwnProperty(productsList[a]))&&(data[productsList[a]] = 0)
                }


                Object.entries(data).forEach(([key, value])=>{
                  (report[key] !== undefined)
                    ? report[key].push(value)
                    : report[key] = [value]
                
                })
              })
              
              delete report.week;

              Object.entries(report).forEach(([key, value])=>{
                dataset.push({
                  axis: 'y',
                  label: key,
                  data: value,
                  fill: false,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
                });
              })


              setData( {
                labels: label,
                datasets: dataset
              });


            })
            .catch(function(errors){
                console.log(errors);
            })
    }

    const datePickerHandler=({target})=>{
      setDate(new Date(target.value).toJSON().slice(0,10));
    }

    useEffect(() => {
      FetchBillProductReportMonthly();
    }, [date]);



    return (
      <div className="col-12">
        <div className="card rate">

          <div className="filter" style={{paddingRight:'2rem'}}>
            <input type="date" value= {date} onChange={datePickerHandler}  style={{fontFamily:'Poppins sans-serif', fontSize:'1rem', width:'10rem', paddingTop:'0.3rem', textAlign:'center', border:'none', borderBottom:'1px solid #012970'}}/>
          </div>

          <div id='product-sales-report' className="card-body">
            <h5 className="card-title">Sold Products <span>| {months[new Date(date).getMonth()]+", "+new Date(date).getFullYear()}</span></h5>

            {(data !== undefined)
                ? ((data.datasets.length !== 0)
                    ? <Bar data={data} />
                    : <>
                        <h5 style={{textAlign:'center'}}><img src={NotFound2} alt="not-found" /></h5>
                        <h5 style={{color:'red', textAlign:'center', fontWeight:'bolder',}}>No data to show</h5>
                      </>)
                : (<Spinner/>)
            } 
          </div>     
        </div>

      </div>
    )
}

export default BillProductChart