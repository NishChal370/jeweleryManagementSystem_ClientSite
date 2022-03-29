import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { BiArrowBack } from 'react-icons/bi';
import { POST_RESET_PASSWORD_CONFIRM } from '../../API/UserServer';


//ChangePasswordForm,
const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 800,
      timerProgressBar: false,
});


function ChangePasswordForm({haveToken, pagechangeHandler}) {
      const [passwordDetail, setPasswordDetail] = useState({token:'', password1:'', password2:''});
      
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
                              title: "Invalid info !!",
                        });

                        document.getElementsByName('password1')[0].style.borderColor ='red';
                        document.getElementsByName('password2')[0].style.borderColor ='red';
                        
                  })
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

      useEffect(()=>{
            if(haveToken){
                  passwordDetail['token'] = window.location.search.replace('?token=','');
                  setPasswordDetail({...passwordDetail});
            }        
      },[])


      return (
            <>
            <main>
                  <div class="page">
                        <p className='back-button' style={{fontSize:'2rem', padding:'0rem', margin:'0rem'}} onClick={pagechangeHandler}><BiArrowBack/></p>
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

export default ChangePasswordForm