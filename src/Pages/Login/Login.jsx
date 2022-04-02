import React, { useState } from 'react';
import './login.css';
import { LoginImage } from '../../Assets/img';
import {  ChangePasswordForm, LoginForm, LoginScanner, RequestTokenForm } from '../../Components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


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
                              <h1>Welcome <br/>Gitanjai Jeweller</h1>
                              <p>Login to continue</p>
                        </header>
                        {/* <Router>
                              <Switch>
                                    <Route path="/scan">
                                          <LoginScanner/>
                                    </Route>
                                    
                                    <Route path="">
                                          {haveToken&&(
                                                <ChangePasswordForm haveToken={haveToken} pagechangeHandler={pagechangeHandler}/>
                                          )}

                                          {!haveToken &&( 
                                                (! isPasswordForget)
                                                      ? <LoginForm loginHandler={loginHandler} pagechangeHandler={pagechangeHandler}/>
                                                      : <RequestTokenForm pagechangeHandler={pagechangeHandler}/>
                                          )} 
                                    </Route>
                              </Switch>
                        </Router> */}
                        
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

/**<Router>
                              <Switch>
                                    <Route path="/scan">
                                          <LoginScanner/>
                                    </Route>
                                    
                                    <Route path="">
                                          {haveToken&&(
                                                <ChangePasswordForm haveToken={haveToken} pagechangeHandler={pagechangeHandler}/>
                                          )}

                                          {!haveToken &&( 
                                                (! isPasswordForget)
                                                      ? <LoginForm loginHandler={loginHandler} pagechangeHandler={pagechangeHandler}/>
                                                      : <RequestTokenForm pagechangeHandler={pagechangeHandler}/>
                                          )} 
                                    </Route>
                              </Switch>
                        </Router> */

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