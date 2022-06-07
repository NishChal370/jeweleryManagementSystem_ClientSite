import React, { useState } from 'react';
import './login.css';
import { LoginImage } from '../../Assets/img';
import {  ChangePasswordForm, LoginForm, RequestTokenForm } from '../../Components';


function Login({loginHandler}) {
      const [haveToken, setHaveToken] = useState(window.location.search.includes('?token='));
      const [isPasswordForget, setIsPasswordForget] = useState((window.history.state === 'changepassword'));


      const pagechangeHandler=()=>{
            haveToken 
                  ? setIsPasswordForget(false)
                  : setIsPasswordForget(!isPasswordForget);

            haveToken && 
                  window.history.pushState("", "", '/')

            !haveToken &&(
                  (!isPasswordForget)
                        ? window.history.pushState("changepassword", "changepassword", '/changepassword')
                        : window.history.pushState("", "", '/')
            )
                  

            setHaveToken(false);
      }

      return (
            <div className='login-body'>
                  <section>
                        <div>
                              <img src={LoginImage} alt="model0-img" style={{height: '70vh', width:'100%'}} />
                        </div>
                  </section>
                  <aside>
                        <header>
                              <h1>Welcome <br/>Gitanjali Jeweller</h1>
                              <p>Login to continue</p>
                        </header>

                        
                        {haveToken&&(
                              <ChangePasswordForm haveToken={haveToken} pagechangeHandler={pagechangeHandler}/>
                        )}

                        {!haveToken &&( 
                              (! isPasswordForget)
                                    ? <LoginForm loginHandler={loginHandler} pagechangeHandler={pagechangeHandler}/>
                                    : <RequestTokenForm pagechangeHandler={pagechangeHandler}/>
                        )} 
                  </aside>  
            </div> 
      )
}

export default Login