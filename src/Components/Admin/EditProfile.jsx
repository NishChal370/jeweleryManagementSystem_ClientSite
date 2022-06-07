import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { setAdminInfo } from '../../Redux/Action';
import { GET_ADMIN_DETAIL } from '../../API/UserServer';
import { clearRegisterAdminErrorMessage, validateAdminDetail } from '../Common/validation';


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});



const detail ={name:'', firstName:'', lastName:'', phone:'', email:'', panNumber:'', registrationDate:'', image: null}

function EditProfile() {
    const dispatch = useDispatch();


    const [adminDetail, setAdminDetail] = useState(detail);
    const [previewImage, setPreviewImage] = useState(null);
    const [isImageChanged, setIsImageChanged] = useState(false);

    const GetAdminDetail=()=>{
        GET_ADMIN_DETAIL()
            .then((response)=>{
                adminDetail.name = response.data.username;
                adminDetail.firstName = response.data.first_name;
                adminDetail.lastName = response.data.last_name;
                adminDetail.email = response.data.email;
                adminDetail.phone = (response.data.phone === null) ?'' :response.data.phone;
                adminDetail.panNumber = response.data.pan_number;
                adminDetail.registrationDate = response.data.register_date;
                adminDetail.image = response.data.profileImage;

                setAdminDetail({...adminDetail});
            })
            .catch((error)=>{
                console.log(error.response.data);
                alert("ERROR IN GET ADMIN DETAIL");
            })
    }


    const UpdateAdminDetail=()=>{
        const {name, firstName, lastName, phone, email, panNumber, registrationDate, image} = adminDetail;

        const adminFormData = new FormData();
        adminFormData.append("username", name)
        adminFormData.append("first_name", firstName)
        adminFormData.append("last_name", lastName)
        adminFormData.append("email", email)
        adminFormData.append("phone", phone)
        adminFormData.append("pan_number", panNumber)
        adminFormData.append("register_date", registrationDate)

        if(isImageChanged){
            adminFormData.append("profileImage", image)
        }

        setIsImageChanged(false);

        // POST_ADMIN_DETAIL(updatedData)
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/admin/update/',
            data: adminFormData,
            headers:{
                Authorization: localStorage.getItem('access_token')
                    ?'Bearer '+ localStorage.getItem('access_token')
                    :null,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response)=>{
                adminDetail.name = response.data.username;
                adminDetail.firstName = response.data.first_name;
                adminDetail.lastName = response.data.last_name;
                adminDetail.email = response.data.email;
                adminDetail.phone = response.data.phone;
                adminDetail.panNumber = response.data.pan_number;
                adminDetail.registrationDate = response.data.register_date;
                adminDetail.image = response.data.profileImage;

                setPreviewImage(null);
                setAdminDetail({...adminDetail});
                dispatch(setAdminInfo({profileImage: response.data.profileImage, name: response.data.first_name+" "+response.data.last_name}));
            })
            .catch((error)=>{
                console.log(error.response.data);
                Swal.fire('Unable to updated !!! Check your data.', '', 'error');
            })
    }


    const inputChangeHandler=(e)=>{
        e.preventDefault();

        clearRegisterAdminErrorMessage(e.target.name);

        if(e.target.name === 'image'){
            setIsImageChanged(true)
            setPreviewImage(URL.createObjectURL(e.target.files[0]));

            adminDetail[e.target.name] = e.target.files[0];
        }
        else{
            adminDetail[e.target.name] = e.target.value;
        }

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

    const deleteImageHandler=()=>{
        setPreviewImage(null);
        setIsImageChanged(true);
        adminDetail['image'] = '';
        setAdminDetail({...adminDetail});
    }

    useEffect(()=>{
        GetAdminDetail();
    },[])

    return (
        <div className="tab-pane fade  show active  profile-edit pt-3" id="profile-edit">
            {console.log(adminDetail)}
            {/* <!-- Profile Edit Form --> */}
            <form onSubmit={saveButtonHandler}>
                <div className="row mb-3">
                    <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                    <div className="col-md-8 col-lg-9">
                        <img src={(previewImage !== null) ?previewImage :`http://127.0.0.1:8000${adminDetail.image}`} alt="Profile" style={{width:'12rem'}}/>
                        <div className="pt-2">
                            <a onClick={()=>document.getElementById('file-input').click()} className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></a>
                            <span><input  id="file-input"  style={{display: 'none'}} onChange={inputChangeHandler} type="file" name="image" /></span>
                            <a onClick={deleteImageHandler} className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></a>
                        </div>
                    </div>
                </div>

                {
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
