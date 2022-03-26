import Swal from 'sweetalert2';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './Assets/css/style.css';
import {Login} from './Pages/index';
import { AXIOS } from './API/Constant';
import {Header, SideNav, Main} from './Components/index';
import { Post_Login, Post_Logout } from './API/UserServer';
import SoundWelcome from './Assets/sound/computer.mp3';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 800,
  timerProgressBar: false,
});



function App() {
  const [showSideBar, setShowSideBar]= useState(true);
  const [islogin, setIslogin] = useState(localStorage.getItem('access_token'));
  const showSideBarHandler=(isDisplay)=>{
    setShowSideBar(isDisplay);
  }

  const welcomePlay=()=> {
    var audio = new Audio(SoundWelcome);
    audio.play();
  }

  const loginHandler=(loginDetail)=>{
    
    Post_Login(loginDetail)
      .then(function(response){
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('is_login', true);
        AXIOS.defaults.headers['Authorization'] = 'Bearer '+ localStorage.getItem('access_token')

        setIslogin(true);
        welcomePlay();
      })
      .catch(function(error){
        Toast.fire({
          icon: 'error',
          title: 'Invalid Info !!!'
        });

        //form login form
        document.getElementById('login-email-input').style.borderColor='red';
        document.getElementById('login-password-input').style.borderColor='red';
      })
  }


  const logoutHandler=()=>{
    Post_Logout()
      .then((response)=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('is_login');

        AXIOS.defaults.headers['Authorization'] = null;

        setIslogin(false);
      })
      .catch((error)=>{
        console.log("ERROR while logout")
      })
  }

  return (
    (islogin)
      ?(
        <Router>
          <Header isDisplayed={showSideBar} showSideBarHandler={(isDisplay)=>showSideBarHandler(isDisplay) } logoutHandler={logoutHandler}/>
          <SideNav isDisplay={(showSideBar)? 'none': ''}/>
          <Main isSideBarDisplayed={showSideBar}/>
        </Router> 
      )
      :(<>
        <Login loginHandler={loginHandler}/>
        </>
      )
  );
}

export default App;




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
