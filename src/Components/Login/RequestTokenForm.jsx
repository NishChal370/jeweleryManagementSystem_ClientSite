import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { GrLinkNext } from 'react-icons/gr';
import { BiArrowBack } from 'react-icons/bi';
import { POST_RESET_PASSWORD } from '../../API/UserServer';
import { validateChangePasswordEmail } from '../Common/validation';
import LoadingModal from '../Common/LoadingModal';




const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 800,
      timerProgressBar: false,
});


function RequestTokenForm({pagechangeHandler}) {
      const[email, setEmail]= useState('');
      const[isLoading, setIsloding] = useState(false);
      const[isEmailValid, setIsEmailValid] = useState(false);

      const emailInputChangeHandler=({target})=>{
            setEmail(target.value);
      }

      const PostResetPassword=()=>{
            POST_RESET_PASSWORD({email:email})
                  .then((response)=>{
                        setIsloding(false);
                        setIsEmailValid(!isEmailValid);
                  })
                  .catch(({response})=>{
                        console.log(response);
                        Toast.fire({
                              icon: 'error',
                              title: 'Invalid Email',
                        });
                        setIsloding(false);
                        document.getElementsByName('email')[0].style.borderColor ='red';
                  })
      }


      const nextButtonHandler=()=>{
            if( validateChangePasswordEmail(email) ){
                  PostResetPassword();
                  setIsloding(true);
            }
      }

      const mailNotFoundHandler=()=>{
            setEmail('');
            setIsEmailValid(!isEmailValid);
      }


      return (
            <>
            {(!isEmailValid)
                  ?(// show email input to send token
                        <>
                        <main>
                              <div class="page">
                                    <p className='back-button' style={{fontSize:'2rem', padding:'0rem', margin:'0rem'}} onClick={pagechangeHandler} ><BiArrowBack/></p>
                                    <label style={{ margin:'0rem'}} class="field field_v1">
                                          {console.log(email)}
                                          <input class="field__input" placeholder="email" name='email' value={email} onChange={emailInputChangeHandler}/>
                                          <span class="field__label-wrap">
                                                
                                                <span class="field__label">Email</span>
                                          </span>
                                    </label>
                              </div>            
                        </main>
                        
                        <footer className='d-flex justify-content-end mx-4'>
                              {isLoading
                                    ?(
                                          <button class="login-button">
                                                <Spinner
                                                      as="span"
                                                      animation="grow"
                                                      size="md"
                                                      role="status"
                                                      aria-hidden="true"
                                                />   Validating email....
                                          </button>
                                    )
                                    :(
                                          <button class="login-button" onClick={nextButtonHandler}>
                                                Next <GrLinkNext/>
                                          </button>
                                    )
                              }

                              {isLoading && <LoadingModal message={'Validating email....'}/>}

                        </footer>
                        </>
                  )
                  :(// show change password form
                        <>
                        <main>
                              <div class="text-center" style={{color:'#012970', fontWeight:'2rem', marginTop:'6rem'}}>
                                    <h1>Mail has been send to your email. <br/>Please Check your indox</h1> 
                                    <button type="button" className="btn btn-outline-primary" onClick={mailNotFoundHandler}>Don't find mail</button>
                              </div>            
                        </main>
                        </>
                  )

            }
            </>
      )
}

export default RequestTokenForm