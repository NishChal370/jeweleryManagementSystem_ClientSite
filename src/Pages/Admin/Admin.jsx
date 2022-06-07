import React from 'react'
import {useHistory, useLocation,  Route, Switch } from 'react-router-dom'
import { ChangePassword, EditProfile, ProfileCard } from '../../Components'


function Admin() {
    const history = useHistory();
    const pathname = useLocation().pathname;

    return (
        <div className="card background--none" id='admin-card' style={{display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
            
            <ProfileCard/> 

            <div class="col-xl-8">

                <div class="card">
                    <div class="card-body pt-3">
                        {/* <!-- Bordered Tabs --> */}
                        <ul class="nav nav-tabs nav-tabs-bordered">
                            <li class="nav-item active">
                                <button class={`nav-link ${(pathname === '/admin') ?'active' :''}`} onClick={()=>history.push('/admin')}>Edit Profile</button>
                            </li>

                            <li class="nav-item">
                                <button class={`nav-link ${(pathname === '/admin/setting') ?'active' :''}`} onClick={()=>history.push('/admin/setting')}>Change Password</button>
                            </li>

                        </ul>
                        
                        <div class="tab-content pt-2">
                        <Switch> 
                            <Route path="/admin/setting">
                                <ChangePassword/>
                            </Route>

                            <Route path="/admin">
                                <EditProfile/>
                            </Route>                
                        </Switch>
                            
                        </div>
                    </div>                   
                </div>

            </div>
        </div>
    
  )
}

export default Admin