import React, { useEffect } from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2';
import { GET_ADMIN_DETAIL, POST_ADMIN_DETAIL } from '../../API/UserServer';
import { ProfileImage, ProfileImage2 } from '../../Assets/img'
import { clearRegisterAdminErrorMessage, validateAdminDetail } from '../Common/validation';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});



const detail ={name:'', firstName:'', lastName:'', phone:'', email:'', panNumber:'', registrationDate:''}
function EditProfile({adminNameSet}) {
    const [adminDetail, setAdminDetail] = useState(detail);

    
    const GetAdminDetail=()=>{
        GET_ADMIN_DETAIL()
            .then((response)=>{
                console.log(response.data);
                adminDetail.name = response.data.username;
                adminDetail.firstName = response.data.first_name;
                adminDetail.lastName = response.data.last_name;
                adminDetail.email = response.data.email;
                adminDetail.phone = (response.data.phone === null) ?'' :response.data.phone;
                adminDetail.panNumber = response.data.pan_number;
                adminDetail.registrationDate = response.data.register_date;
                
                
                setAdminDetail({...adminDetail});
                adminNameSet(response.data.first_name, response.data.last_name);// for profile card
            })
            .catch((error)=>{
                console.log(error.response.data);
                alert("ERROR IN GET ADMIN DETAIL");
            })
    }

    const UpdateAdminDetail=()=>{
        const {name, firstName, lastName, phone, email, panNumber, registrationDate} = adminDetail;
        const updatedData = {username :name, first_name :firstName, last_name :lastName, email :email, phone :phone,  pan_number :panNumber, register_date :registrationDate}
        POST_ADMIN_DETAIL(updatedData)
            .then((response)=>{
                console.log(response);
                adminDetail.name = response.data.username;
                adminDetail.email = response.data.email;
                adminDetail.phone = response.data.phone;
                adminDetail.panNumber = response.data.pan_number;
                adminDetail.registrationDate = response.data.register_date;

                setAdminDetail({...adminDetail});
            })
            .catch((error)=>{
                console.log(error.response.data);
                alert("ERROR IN UPDAte ADMIN DETAIL");
            })
    }


    const inputChangeHandler=(e)=>{
        e.preventDefault();
        clearRegisterAdminErrorMessage(e.target.name);

        adminDetail[e.target.name] = e.target.value;

        setAdminDetail({...adminDetail});
    }

    const saveButtonHandler=(e)=>{
        e.preventDefault();

        if( validateAdminDetail(adminDetail) ){
            Swal.fire({
                title: `Are you confirm for changes ?`,
                text:'Make sure you are confirm',
                showCancelButton: true,
                confirmButtonText: 'Update',

            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    UpdateAdminDetail();
                    
                    Swal.fire('Profile Updated !!!', '', 'success');
                }
            });
            
        }
        
    }

    useEffect(()=>{
        GetAdminDetail();
    },[])


    return (
        <div className="tab-pane fade  show active  profile-edit pt-3" id="profile-edit">

            {/* <!-- Profile Edit Form --> */}
            <form onSubmit={saveButtonHandler}>
                <div className="row mb-3">
                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                    <div className="col-md-8 col-lg-9">
                        <img src={ProfileImage2} alt="Profile"/>
                        <div className="pt-2">
                            <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></a>
                            <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></a>
                        </div>
                    </div>
                </div>

                {//{name:'Full Name', id:'name', value:adminDetail.name, type:'text', pattern:"[A-Za-z]", title:"name should be alphabet."}
                    [{name:'Username', id:'name', value:adminDetail.name, type:'text', pattern:undefined, title:"name should be alphabet."}, 
                     {name:'First name', id:'firstName', value:adminDetail.firstName, type:'text', pattern:undefined, title:"name should be alphabet."},
                     {name:'last name', id:'lastName', value:adminDetail.lastName, type:'text', pattern:undefined, title:"name should be alphabet."},
                     {name:'Phone', id:'phone', value:adminDetail.phone, type:'number', pattern:undefined, title:"it should be number only"}, 
                     {name:'Email', id:'email', value:adminDetail.email, type:'email'},
                     {name:'PAN Number', id:'panNumber', value:adminDetail.panNumber, type:'text', pattern:undefined, title:"it should be number only"}, 
                     {name:'Registration Date', id:'registrationDate', value:adminDetail.registrationDate, type:'date'},]
                        .map(({name, id, value, type, pattern, title}, index)=>{return(
                            <div className="row mb-3" key={`${index}EPT`}>
                                <label htmlFor={id} className="col-md-4 col-lg-3 col-form-label">{name}</label>
                                <div className="col-md-8 col-lg-9">
                                    <input name={id} type={type} className="form-control" id={id} value={value} onChange={inputChangeHandler} pattern={pattern} title={title}/>
                                    <div id='invalid-tooltip' className={`${id}-tooltip`} hidden={true}>
                                        <p>You missed me !</p> 
                                    </div>
                                </div>
                            </div>
                        )})
                }
                
                <div className="text-center">
                    <button type="submit" className="btn btn-primary" >Save Changes</button>
                </div>
            </form>

            {/* <!-- End Profile Edit Form --> */}

        </div>
    )
}

export default EditProfile