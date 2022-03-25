import Swal from 'sweetalert2';
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { GrLinkNext } from 'react-icons/gr';
import { validateChangePasswordEmail } from '../Common/validation';
import { POST_RESET_PASSWORD, POST_RESET_PASSWORD_CONFIRM } from '../../API/UserServer';


const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 800,
      timerProgressBar: false,
});


function ChangePasswordForm({pagechangeHandler}) {
      const[showNextPage, setShowNextPage] = useState(false);
      const[email, setEmail]= useState('');
      const[passwordDetail, setPasswordDetail] = useState({token:'', password1:'', password2:''})

      const emailInputChangeHandler=({target})=>{
            setEmail(target.value);
      }

      const changePasswordDetailInputHandler=({target})=>{
            let {name, value} = target;
            passwordDetail[name] = value;
            setPasswordDetail({...passwordDetail});
      }

      const confirmChangePasswordHandler=()=>{
            const {password1, password2} = passwordDetail
            if(password1 === password2){
                  PostResetPasswordConfirm();
            }
      }


      const PostResetPassword=()=>{
            POST_RESET_PASSWORD({email:email})
                  .then((response)=>{

                        setShowNextPage(!showNextPage);
                  })
                  .catch(({response})=>{
                        console.log(response);
                        Toast.fire({
                              icon: 'error',
                              title: 'Invalid Email',
                        });
                        document.getElementsByName('email')[0].style.borderColor ='red';
                  })
      }

      const PostResetPasswordConfirm=()=>{
            const {token, password1} = passwordDetail;
            const detail = {token:token, password:password1};
            POST_RESET_PASSWORD_CONFIRM(detail)
                  .then((response)=>{
                        console.log(response.data);
                        Swal.fire('Password Changed !!!', '', 'success'); 

                        pagechangeHandler();
                  })
                  .catch(({response})=>{
                        console.log(response);

                        Toast.fire({
                              icon: 'error',
                              title: response.data['password'][0],
                        });

                        document.getElementsByName('token')[0].style.borderColor ='red';
                        document.getElementsByName('password1')[0].style.borderColor ='red';
                        document.getElementsByName('password2')[0].style.borderColor ='red';
                        
                  })
      }

      const nextButtonHandler=()=>{
            if( validateChangePasswordEmail(email) ){
                  PostResetPassword();
            }
           
      }

      return (
            <>
            {(!showNextPage)
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
                              <button class="login-button" role="button" onClick={nextButtonHandler}>Next <GrLinkNext/></button>
                        </footer>
                        </>
                  )
                  :(// show change password form
                        <>
                        <main>
                              <div class="page">
                                    <p className='back-button' style={{fontSize:'2rem', padding:'0rem', margin:'0rem'}} onClick={pagechangeHandler} ><BiArrowBack/></p>
                                    <label style={{ margin:'0rem'}} class="field field_v1">
                                          <input class="field__input" placeholder="token" name='token' value={passwordDetail.token} onChange={changePasswordDetailInputHandler}/>
                                          <span class="field__label-wrap">
                                                
                                                <span class="field__label">Token</span>
                                          </span>
                                    </label>
                                    <label class="field field_v1">
                                          <input class="field__input" placeholder="new password" name='password1' type='password' value={passwordDetail.password1} onChange={changePasswordDetailInputHandler}/>
                                          <span class="field__label-wrap">
                                                
                                                <span class="field__label">New Password</span>
                                          </span>
                                    </label>  
                                    <label class="field field_v1">
                                          <input class="field__input" placeholder="new password" name='password2' type='password' value={passwordDetail.password2} onChange={changePasswordDetailInputHandler}/>
                                          <span class="field__label-wrap">
                                                
                                                <span class="field__label">Re-enter Password</span>
                                          </span>
                                    </label>  
                              </div>            
                        </main>
                        
                        <footer className='d-flex justify-content-end mx-4'>
                              <button class="login-button" role="button" onClick={confirmChangePasswordHandler}>Change Password</button>
                        </footer>
                        </>
                  )

            }
            </>
      )
}

export default ChangePasswordForm






            /* <main>
                  <div class="page">
                        <p className='back-button' style={{fontSize:'2rem', padding:'0rem', margin:'0rem'}} onClick={pagechangeHandler} ><BiArrowBack/></p>
                        <label style={{ margin:'0rem'}} class="field field_v1">
                              <input class="field__input" placeholder="email"/>
                              <span class="field__label-wrap">
                                    
                                    <span class="field__label">Email</span>
                              </span>
                        </label>
                        <label class="field field_v1">
                              <input class="field__input" placeholder="new password"/>
                              <span class="field__label-wrap">
                                    
                                    <span class="field__label">New Password</span>
                              </span>
                        </label>  
                        <label class="field field_v1">
                              <input class="field__input" placeholder="new password"/>
                              <span class="field__label-wrap">
                                    
                                    <span class="field__label">Re-enter Password</span>
                              </span>
                        </label>  
                  </div>            
            </main>
            
            <footer className='d-flex justify-content-end mx-4'>
                  <label class="field field_v1" style={{marginRight:'4rem'}} hidden={showTokenInput}>
                        <input class="field__input" placeholder="insert token"/>
                        <span class="field__label-wrap">
                              
                              <span class="field__label">token</span>
                        </span>
                  </label> 
                  <button class="login-button" role="button" onClick={confirmChangeHandler}>{(showTokenInput) ?"Change Password" :"Confirm"}</button>
            </footer> */