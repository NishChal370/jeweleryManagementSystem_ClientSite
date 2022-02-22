import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Spinner } from '..';
import { TiExportOutline } from 'react-icons/ti';

function RateChart() {
  const [data, setData] = useState();
  const [filter, setFilter] = useState('monthly');

  const getReport=()=>{
    axios.get(`http://127.0.0.1:8000/api/rate/report/?type=${filter}`)
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
      <div className="card orders">

        <div className="filter">
          <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              <span className='d-flex justify-content-between'>
                <h6>Filter</h6>
                <i style={{fontSize:'1.2rem', margin:'0rem', padding:'0rem',cursor:'pointer'}}><TiExportOutline/></i>
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
                    // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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