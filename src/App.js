import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AXIOS } from './API/Constant';
import { Post_Login } from './API/UserServer';

import './Assets/css/style.css'
import {Header, SideNav, Main} from './Components/index'


function App() {
  const [showSideBar, setShowSideBar]= useState(true);
  const [islogin, setIslogin] = useState(false);

  const showSideBarHandler=(isDisplay)=>{
    setShowSideBar(isDisplay);
  }

  const loginHandler=()=>{
    Post_Login()
      .then(function(response){
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        AXIOS.defaults.headers['Authorization'] = 'Bearer '+ localStorage.getItem('access_token')

        setIslogin(true)

      })
      .catch(function(error){
        console.log("Error")
        console.log(error.data)
    
      })
  }

  // const loginHandler=()=>{
  //   axios.post(`http://127.0.0.1:8000/api/login/`,{
  //     "username":"admin@gmail.com",
  //     "password":"admin"
  // })
  //     .then((response) => {
  //       // handle success
  //       console.log(response.data)
  //       localStorage.setItem('access_token', response.data.access);
  //     localStorage.setItem('refresh_token', response.data.refresh);
  //     AXIOS.defaults.headers['Authorization'] = 'Bearer '+ localStorage.getItem('access_token')

  //     setIslogin(true)
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log("Error -> ",error);
  //     });
  // }

  return (
    (islogin)
      ?(<Router>
        <Header isDisplayed={showSideBar} showSideBarHandler={(isDisplay)=>showSideBarHandler(isDisplay)}/>
        <SideNav isDisplay={(showSideBar)? 'none': ''}/>
        <Main isSideBarDisplayed={showSideBar}/>
      </Router> )
      :(<button onClick={loginHandler}>Login</button>)
    // <Router>
    //   <Header isDisplayed={showSideBar} showSideBarHandler={(isDisplay)=>showSideBarHandler(isDisplay)}/>
    //   <SideNav isDisplay={(showSideBar)? 'none': ''}/>
    //   <Main isSideBarDisplayed={showSideBar}/>
    // </Router>  
  );
}

export default App;

