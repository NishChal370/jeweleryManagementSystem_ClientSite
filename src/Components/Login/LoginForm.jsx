import React, { useState } from 'react'

function LoginForm({loginHandler, pagechangeHandler}) {
      const [loginDetail, setLoginDetail] =  useState({email:'', password:''})

      const changeInputHandler=({target})=>{
            let {name, value} = target;
            loginDetail[name] = value;

            setLoginDetail({...loginDetail});

            //change color
            document.getElementById('login-email-input').style.borderColor='#012a70cb';
            document.getElementById('login-password-input').style.borderColor='#012a70cb';
      }

      const submitHandler=(e)=>{
            e.preventDefault();
            loginHandler(loginDetail);
      }

      return (
            <>
            <form>
                  <main>
                        <div className="page"> 
                              <label className="field field_v1">
                                    <input id='login-email-input' className="field__input" placeholder="e.g. melnik909@ya.ru"  name='email' type='email' value={loginDetail.email} onChange={changeInputHandler} required/>
                                    <span className="field__label-wrap">
                                          
                                          <span className="field__label">E-mail</span>
                                    </span>
                              </label>
                              <label className="field field_v1">
                                    <input id='login-password-input' className="field__input" placeholder="insert password" name='password' type='password' value={loginDetail.password} onChange={changeInputHandler} required/>
                                    <span className="field__label-wrap">
                                          
                                          <span className="field__label">Password</span>
                                    </span>
                              </label>  
                        </div>            
                  </main>

                  <footer className='d-flex justify-content-between mx-4'>
                        <p>forget password? <span onClick={pagechangeHandler}>Need Help</span></p>
                        <button type='submit' className="login-button" role="button" onClick={submitHandler}>Login</button>
                  </footer>
            </form>
            </>
      )
}

export default LoginForm