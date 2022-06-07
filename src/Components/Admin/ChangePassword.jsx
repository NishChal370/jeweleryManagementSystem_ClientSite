import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { POST_CHANGE_PASSWORD } from '../../API/UserServer';
import { clearChangePasswordError, validateChangePassword } from '../Common/validation';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});



let initialPasswordDetail = {oldPassword :'', newPassword1 :'', newPassword2 :''}
function ChangePassword() {
    const [passwordDetail, setPasswordDetail] = useState(initialPasswordDetail);

    
    const inputChangeHandler=(e)=>{
        e.preventDefault();
        clearChangePasswordError();

        let {name, value} = e.target;
        passwordDetail[name] = value;

        setPasswordDetail({...passwordDetail});
    }


    const PostChangePassword=()=>{
        const {oldPassword, newPassword1} = passwordDetail;
        const updatedPasswordDetail = {old_password :oldPassword, new_password:newPassword1 }

        POST_CHANGE_PASSWORD(updatedPasswordDetail)
            .then((response)=>{
                resetFields();

                Swal.fire(response.data.message, '', 'success');
            })
            .catch((error)=>{
                const messsage = Object.keys(error.response.data)[0] +" "+error.response.data[Object.keys(error.response.data)[0]]

                Swal.fire({
                    icon: 'error',
                    title: messsage
                });
            })
    }


    const submitHandler=(e)=>{
        e.preventDefault();
        
        if( validateChangePassword(passwordDetail) ){
            PostChangePassword();
        }
    }


    const resetFields=()=>{
        passwordDetail['oldPassword'] = '';
        passwordDetail['newPassword1'] = '';
        passwordDetail['newPassword2'] = '';

        setPasswordDetail({...passwordDetail});
    }



    return (
        <div class="tab-pane show active profile-change-password  pt-3" id="profile-change-password">
            {/* <!-- Change Password Form --> */}
                <form onSubmit={submitHandler}>

                    <div className="row mb-3">
                    <label for="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="oldPassword"  className="form-control" id="oldPassword" type='password' value={passwordDetail.oldPassword} onChange={inputChangeHandler}/>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label for="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="newPassword1"  className="form-control" id="newPassword1" type='password' value={passwordDetail.newPassword1} onChange={inputChangeHandler}/>
                    </div>
                    </div>

                    <div className="row mb-3">
                    <label for="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                    <div className="col-md-8 col-lg-9">
                        <input name="newPassword2"  className="form-control" id="newPassword2" type='password' value={passwordDetail.newPassword2} onChange={inputChangeHandler}/>
                    </div>
                    </div>

                    <div className="text-center">
                    <button type="submit" className="btn btn-primary">Change Password</button>
                    </div>
                </form>
            {/* <!-- End Change Password Form --> */}
        </div>
   )
}

export default ChangePassword