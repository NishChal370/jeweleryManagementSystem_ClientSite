import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { login } from './API/UserServer';

import './Assets/css/style.css'
import { LoginImg } from './Assets/img';
import {Header, SideNav, Main} from './Components/index'
import Login from './Pages/Login/Login';


// import Cookies from "universal-cookie";

// const cookies = new Cookies();
// axios.defaults.xsrfHeaderName = "X-CSRFToken"
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.withCredentials = true
// import cookie from 'react-cookie';''


function App() {
  const [showSideBar, setShowSideBar]= useState(true);
  const [islogin, setIslogin] = useState(false);
  const [csrfToken, setCsrf] = useState();
  const showSideBarHandler=(isDisplay)=>{
    setShowSideBar(isDisplay);
  }
  

  const getCSRF = () => {
    fetch("http://127.0.0.1:8000/api/token/", {
      credentials: "include",
    })
    .then((res) => {
      let csrfToken = res.headers.get("X-CSRFToken");
      setCsrf(csrfToken);
      console.log(csrfToken);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getSession = () => {
    fetch("http://127.0.0.1:8000/api/session/", {
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.isAuthenticated) {
        // this.setState({isAuthenticated: true});
      } else {
        console.log({isAuthenticated: false});
        getCSRF();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const  login = () => {
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({username: 'admin', password: 'admin'}),
    })
    .then((data) => {
      console.log(data);
      setIslogin(true);
      console.log({isAuthenticated: true, username: "", password: "", error: ""});
    })
    .catch((err) => {
      console.log(err);
      console.log({error: "Wrong username or password."});
    });
  }
  // useEffect(()=>{getSession()},[])


  const loginHandler=()=>{
    login();
    // login()
    // .then(function(response){
    //   // var a = window.NetworkInformation.cookie
    //   // // console.log(response.data.headers)
    //   // console.log(a)
    //   setIslogin(true);
    //   console.log("LOGged in")
    //   console.log(response)
    //   setIslogin(true)

    // })
    // .catch(function(response){
    //   console.log("Error")
    //   console.log(response)
  
    // })
  }


  const logoutHandler=()=>{
    setIslogin(false);
  }



   useEffect(()=>{getSession()},[])

  return (
    // <></>
    (islogin)
      ?(
      // <></>
      <Router>
        {console.log("->> ",document.cookie)}
        <Header isDisplayed={showSideBar} showSideBarHandler={(isDisplay)=>showSideBarHandler(isDisplay). logoutHandler={logoutHandler}}/>
        <SideNav isDisplay={(showSideBar)? 'none': ''}/>
        <Main isSideBarDisplayed={showSideBar}/>
      </Router>  
      )
      :(<button onClick={loginHandler}>LOGIn</button>)
    
  );
}

export default App;

