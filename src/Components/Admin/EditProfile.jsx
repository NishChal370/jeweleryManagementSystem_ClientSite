import React from 'react'
import { useState } from 'react'
import { ProfileImage, ProfileImage2 } from '../../Assets/img'

const detail ={name:'', phone:'', email:'', panNumber:'', registrationDate:''}
function EditProfile() {
    const [adminDetail, setAdminDetail] = useState(detail);

    
    const inputChangeHandler=({target})=>{
        adminDetail[target.name] = target.value;

        setAdminDetail({...adminDetail});
    }



    return (
        <div class="tab-pane fade  show active  profile-edit pt-3" id="profile-edit">

            {/* <!-- Profile Edit Form --> */}
            <form>
                <div class="row mb-3">
                    <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                    <div class="col-md-8 col-lg-9">
                        <img src={ProfileImage2} alt="Profile"/>
                        <div class="pt-2">
                            <a href="#" class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></a>
                            <a href="#" class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></a>
                        </div>
                    </div>
                </div>

                {
                    [{name:'Full Name', id:'name', value:adminDetail.name, type:'text', pattern:"[A-Za-z]", title:"name should be alphabet."}, 
                     {name:'Phone', id:'phone', value:adminDetail.phone, type:'number', pattern:"[0-9]{10}", title:"it should be number only"}, 
                     {name:'Email', id:'email', value:adminDetail.email, type:'email'},
                     {name:'PAN Number', id:'panNumber', value:adminDetail.panNumber, type:'number', pattern:"[0-9]", title:"it should be number only"}, 
                     {name:'Registration Date', id:'registrationDate', value:adminDetail.registrationDate, type:'date'},]
                        .map(({name, id, value, type, pattern, title}, index)=>{return(
                            <div class="row mb-3" key={`${index}EPT`}>
                                <label for={id} class="col-md-4 col-lg-3 col-form-label">{name}</label>
                                <div class="col-md-8 col-lg-9">
                                    <input name={id} type={type} class="form-control" id={id} value={value} onChange={inputChangeHandler} pattern={pattern} title={title}/>
                                </div>
                            </div>
                        )})
                }
                
                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </div>
            </form>

            {/* <!-- End Profile Edit Form --> */}

        </div>
    )
}

export default EditProfile