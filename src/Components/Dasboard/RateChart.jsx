import { Spinner } from '..';
import { FaFileExport } from 'react-icons/fa';
import { TiExportOutline } from 'react-icons/ti';
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
        console.log(response);
        setData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  
  useEffect(()=>{getReport()},[filter])
  return (
    <div className="col-12">
      <div className="card rate">

        <div className="filter">
          <a className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              <span className='d-flex justify-content-between'>
                <h6>Filter</h6>
                <p style={{textAlign:"start",  fontSize:'1.2rem', margin:'0rem', padding:'0rem',cursor:'pointer', top:'0',}}><FaFileExport/></p>
              </span>
              
            </li>

            <li><a className="dropdown-item" href="#" onClick={()=>setFilter('weekly')}>This Week</a></li>
            <li><a className="dropdown-item" href="#" onClick={()=>setFilter('monthly')}>This Month</a></li>
            <li><a className="dropdown-item" href="#" onClick={()=>setFilter('yearly')}>This Year</a></li>
          </ul>
        </div>

        <div className="card-body">
          {(data !== undefined)
              ?(<>
                <h5 className="card-title">Rate <span>| This {(filter==='monthly')?'Month':(filter==='weekly')?"Week":"Year"}</span></h5>
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
                    <Bar  dataKey={(filter === 'weekly')?"hallmarkRate": "avgHallmarkRate"} fill="#8884d8" />
                    <Bar  dataKey={(filter === 'weekly')?"tajabiRate" :"avgTajabiRate"} fill="#82ca9d" />
                    <Bar  dataKey={(filter === 'weekly')?"silverRate" :"avgSilverRate"} fill="#eba165" />
                  </ComposedChart>
                </ResponsiveContainer>
                </>)
              :(<Spinner/>)}
          
        </div>     
      </div>

    </div>
  )
}

export default RateChart