import React, { useEffect, useState } from 'react'
import './login.css'
import { LoginImage } from '../../Assets/img';
import { ChangePasswordForm, LoginForm } from '../../Components'


function Login({loginHandler}) {
      const [isPasswordForget, setIsPasswordForget] = useState(false);

      const pagechangeHandler=()=>{
            setIsPasswordForget(!isPasswordForget);

            (!isPasswordForget)
                  ? window.history.pushState("changepassword", "changepassword", '/changepassword')
                  : window.history.pushState("", "", '/')
      }


      // used when user refresh page
      useEffect(()=>{
            (window.history.state === 'changepassword')
                  ? setIsPasswordForget(true)
                  : setIsPasswordForget(false)
      },[])


      return (
            <div className='login-body'>
                  <section>
                        <div>
                              <img src={LoginImage} alt="model0-img" style={{height: '70vh', width:'100%'}} />
                        </div>
                  </section>
                  <aside>
                        <header>
                              <h1>Welcome <br/>Gitanjai Jeweller</h1>
                              <p>Login to continue</p>
                        </header>
                        {(! isPasswordForget)
                              ? <LoginForm loginHandler={loginHandler} pagechangeHandler={pagechangeHandler}/>
                              : <ChangePasswordForm pagechangeHandler={pagechangeHandler}/>
                        }
                        
                  </aside>
                  
            </div>
            
      )
}

export default Login

/**<main>
                              <div class="page"> 
                                    <label class="field field_v1">
                                          <input class="field__input" placeholder="e.g. melnik909@ya.ru"/>
                                          <span class="field__label-wrap">
                                                
                                                <span class="field__label">E-mail</span>
                                          </span>
                                    </label>
                                    <label class="field field_v1">
                                          <input class="field__input" type='password' placeholder="insert password"/>
                                          <span class="field__label-wrap">
                                                
                                                <span class="field__label">Password</span>
                                          </span>
                                    </label>  
                              </div>
                              
                              
                        </main>
                        <footer className='d-flex justify-content-between mx-4'>
                                    <p>forget password? <span>Need Help</span></p>
                                    <button class="login-button" role="button" >Login</button>
                        </footer> */