import { Spinner } from '..';
import { FaFileExport } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { Fetch_Rate_Report } from '../../API/UserServer';
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



function RateChart() {
  const [data, setData] = useState();
  const [filter, setFilter] = useState('monthly');

  const getReport=()=>{
    Fetch_Rate_Report(filter)
      .then(function (response) {
        // handle success
        setData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  
  useEffect(()=>{getReport()},[filter])
  return (
    <div className="col-12" >
      <div className="card rate" style={{minHeight:'14rem'}}>

        <div className="filter">
          <a className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              {/* <span className='d-flex justify-content-between'>
                <h6>Filter</h6>
                <p style={{textAlign:"start",  fontSize:'1.2rem', margin:'0rem', padding:'0rem',cursor:'pointer', top:'0',}}><FaFileExport/></p>
              </span> */}
              
            </li>

            <li><i className="dropdown-item" onClick={()=>setFilter('weekly')}>This Week</i></li>
            <li><i className="dropdown-item" onClick={()=>setFilter('monthly')}>This Month</i></li>
            <li><i className="dropdown-item" onClick={()=>setFilter('yearly')}>This Year</i></li>
          </ul>
        </div>

        <div className="card-body">
          <h5 className="card-title">Rate <span>| This {(filter==='monthly')?'Month':(filter==='weekly')?"Week":"Year"}<p className='p-0 m-0'>Gold : in thousands</p> <p className='p-0 m-0'>Silve : in hundreds</p></span></h5>
          {(data !== undefined)
              ?(<>
                {(data.length>0)
                  ?(<>
                    
                    <ResponsiveContainer width="100%" aspect={2}>
                      <ComposedChart
                        // width={500} 
                        height={500}
                        data={data}
                        margin={{ left: 0}}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="index" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar  dataKey={(filter === 'weekly')?"hallmarkRate": "avgHallmarkRate"} fill="#256ec2a6" />
                        <Bar  dataKey={(filter === 'weekly')?"tajabiRate" :"avgTajabiRate"} fill="#68de9398" />
                        <Bar  dataKey={(filter === 'weekly')?"silverRate" :"avgSilverRate"} fill="#e6914cc9" />
                      </ComposedChart>
                    </ResponsiveContainer>
                    </>)
                  :<h4 style={{textAlign:'center', color:'red', fontWeight:'bold', padding:'4rem 0rem'}}>No data to Show</h4>
                }
                </>
              )  
              :(<Spinner/>)
          }
          
        </div>     
      </div>

    </div>
  )
}

export default RateChart