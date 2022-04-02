import React from 'react';
import { useSelector } from 'react-redux';

function ProfileCard() {
    const adminInfo = useSelector(state => state.adminInfoReducer.data);

    return (
    <section className="section profile" style={{width:'50%'}}>
        <div className="row">
            <div className="col-xl-10">

                <div className="card">
                    <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    {(adminInfo !== undefined) &&(
                        <>
                        <img src={`http://127.0.0.1:8000${adminInfo.profileImage}`} alt="Profile" className="rounded-circle"/>
                        <h2>{adminInfo.name}</h2>
                        </>
                    )}
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