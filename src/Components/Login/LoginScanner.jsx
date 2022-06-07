import React from 'react'
import { useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import {QrReader} from 'react-qr-reader';


function LoginScanner() {
      const history = useHistory();
      
      const handleError=(error)=>{
            console.error("CALLED ERROR");
            console.error(error);
      }
      const handleSuccess=(result)=>{
            console.log("CALLED SUCCESS");
            console.log(result);
      }
  return (
      <>
            <p className='back-button' style={{fontSize:'2rem', padding:'0rem', margin:'0rem'}} onClick={()=> history.push("")}><BiArrowBack/></p>
            <div>
                  <QrReader
                        delay={300}
                        style={{width:'10%', height:'10%', padding:'0rem', margin:'0rem', }}
                        onResult={(result)=>handleSuccess(result)} 
                  />
            </div>
            
      </>
  )
}

export default LoginScanner