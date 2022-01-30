import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './Assets/css/style.css'
import {Header, SideNav, Main} from './Components/index'


function App() {
  const [showSideBar, setShowSideBar]= useState(true);

  const showSideBarHandler=(isDisplay)=>{
    setShowSideBar(isDisplay);
  }

  return (
    <Router>
      <Header isDisplayed={showSideBar} showSideBarHandler={(isDisplay)=>showSideBarHandler(isDisplay)}/>
      <SideNav isDisplay={(showSideBar)? 'none': ''}/>
      <Main isSideBarDisplayed={showSideBar}/>
    </Router>  
  );
}

export default App;

