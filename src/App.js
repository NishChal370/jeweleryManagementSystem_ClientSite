import { BrowserRouter as Router } from 'react-router-dom';

import './Assets/css/style.css'

import {Header, SideNav, Main} from './Components/index'


function App() {
  return (
    <Router>
      <Header/>
      <SideNav/>
      <Main/>
    </Router>  
  );
}

export default App;

