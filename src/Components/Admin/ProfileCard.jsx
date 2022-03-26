import React, { useEffect, useState } from 'react'
import { ProfileImage, ProfileImage2 } from '../../Assets/img'

function ProfileCard({adminName}) {
    const [fulllName, setFullName] = useState(adminName);

    useEffect(()=>{
        if(adminName !== fulllName){
            setFullName(adminName);
        }
    },[fulllName])

    return (
    <section className="section profile" style={{width:'50%'}}>
        <div className="row">
            <div className="col-xl-10">

                <div className="card">
                    <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                    <img src={ProfileImage2} alt="Profile" className="rounded-circle"/>
                    <h2>{adminName}</h2>
                    <h3>Owner</h3>
                    <div className="social-links mt-2">
                        <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    )
}

export default ProfileCard