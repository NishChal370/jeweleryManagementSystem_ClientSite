import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { HiSearch } from 'react-icons/hi';
import { useLocation, useHistory } from 'react-router-dom';
import { INITIAL_STAFF_WORK } from '../../Components/Staff/Constant';
import { OrderProductsModel, OrderProductTable } from '../../Components';
import { Get_Staff_Names, POST_Staff_Assign_Work } from '../../API/UserServer';
import { clearAssignWorkErrorMessage, isAssignWorkValid, removeResetAssignWorkValidation } from '../../Components/Common/validation';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: false,
});


function AssignWork() {
    const history = useHistory();
    const location = useLocation();
    const [stafffNameList, setStaffNameList] = useState();
    const [workDetail, setWorkDetail] = useState(INITIAL_STAFF_WORK);
    const [showOrderProductModel, setShowOrderProductModel] = useState(false);
    const [selectedOrderProductDetail, setSelectedOrderProductDetail] = useState();
    const [selectedOrderId, setSelectOrderId] = useState((location.state !== undefined)?(location.state.orderId): undefined);
    


    const GetStaffNames=()=>{
        Get_Staff_Names()
            .then(function(response){

                setStaffNameList(response.data);
            })
            .catch(function(error){
                alert(error.response.data[0])
            })
    }


    const PostStaffAssignWork=(workDetail)=>{
        POST_Staff_Assign_Work(workDetail)
            .then(function(response){
                Swal.fire('Work assigned!', '', 'success')

                resetButtonHandler();
            })
            .catch(function(error){

                alert(error.response.data[0])
            })
    }


    const inputChangeHandler=({target})=>{
        // removeInvalidMessage(target);->
        console.log(target.name);

        clearAssignWorkErrorMessage(target.name);

        (target.type !== 'date')
            ?workDetail[target.name] = parseFloat(target.value)
            :workDetail[target.name] = target.value;

        setWorkDetail({...workDetail});
    }


    const handleShowOrderProductModel=()=>{
        const NUMBER_REGEX = new RegExp('^$|^[1-9]*$');

        if( (selectedOrderId>0 && selectedOrderId !== '') && NUMBER_REGEX.test(selectedOrderId)){
            (showOrderProductModel)
                ? setShowOrderProductModel(false)
                : setShowOrderProductModel(true)
        }
        else{
            Toast.fire({
                icon: 'error',
                title: 'OrderId is empty / invalid !'
            });
        }
        
    }


    const handlerOrderProductSelect=(orderProduct)=>{
        workDetail['orderProduct'] = orderProduct[0].orderProductId;
        setWorkDetail({...workDetail});
        
        setSelectedOrderProductDetail(orderProduct);
    }


    const submitButtonHandler=(e)=>{
        e.preventDefault();
        console.log("IN");
        let btnId = e.target.id;
        if(isAssignWorkValid(workDetail, selectedOrderProductDetail, btnId )){
            workDetail['totalWeight'] = workDetail['givenWeight'] + workDetail['KDMWeight'];
            
            if(e.target.id === 'submit-work'){
                workDetail['submittedDate'] = new Date().toJSON().slice(0,10)
                setWorkDetail({...workDetail});
            }

            PostStaffAssignWork(workDetail);
        }
    }


    const resetButtonHandler=()=>{
        removeResetAssignWorkValidation();

        document.getElementById('orderId').value = undefined;
        // document.getElementById('staff').value = "---";
        // document.getElementById('staff').value = "---";

        // to clear location state
        location.state = undefined;
        delete location['state']
        history.replace();

        setSelectOrderId();
        setWorkDetail(INITIAL_STAFF_WORK);
        setSelectedOrderProductDetail();

        disableSubmitForm();
    }


    const disableSubmitForm =()=>{
        let assignWorkInputs = [...document.forms['assign-work'].getElementsByTagName("input")];
        let assignWorkButtons = [...document.forms['assign-work'].getElementsByTagName("button")];
        let submitWorkInputs = [...document.forms['submit-work'].getElementsByTagName("input")];
        let submitWorkButtons = [...document.forms['submit-work'].getElementsByTagName("button")];

        let staffWorkId  = (location.state !== undefined)?location.state.staffWorkId : null;
        let work  = (location.state !== undefined)?location.state.workDetail : null;

        if(staffWorkId === null ||work === undefined){
            submitWorkInputs.forEach((input)=>{
                input.disabled=true;
            });

            submitWorkButtons.forEach((button)=>{
                button.disabled=true;
            });
            assignWorkInputs.forEach((input)=>{
                input.disabled=false;
            });

            assignWorkButtons[0].disabled=false;
        }
        else{
            if(work.status === 'completed'){
                submitWorkInputs.forEach((input)=>{
                    input.disabled=true;
                });
    
                submitWorkButtons.forEach((button)=>{
                    button.disabled=true;
                });

                assignWorkInputs.forEach((input)=>{
                    input.disabled=true;
                });
    
                assignWorkButtons[0].disabled=true;
            }
        }
    }


    const _ = require("lodash"); 
    const selectedWorkDetail=()=>{
        if(location.state !== undefined){
            let work = _.omit(INITIAL_STAFF_WORK);
            let selectedWork =  _.omit(location.state.workDetail);

            work['staff'] = location.state.staffId;
            for (const [key, value] of Object.entries(selectedWork)) {

                if(work.hasOwnProperty(key)){
                    work[key] = value;
                }
                if(key === 'orderProduct'){
                    work[key] = value.orderProductId;

                    setSelectedOrderProductDetail([value]);
                }
                else if(key === 'staff'){
                    work[key] = value.staffId;
                }
            }

            setWorkDetail(work);
        }
        
    }

    const changeOrderIdInputhandler=(target)=>{
        clearAssignWorkErrorMessage(target.name);

        if(target.value>0||target.value ===''){
            setSelectOrderId(target.value);
        }
        
    }

    useEffect(()=>{
        GetStaffNames();
        disableSubmitForm();
        selectedWorkDetail();
    },[])



    return (
        <div className="card background--none " id='assign-work-card'>
            <header className="top-nav" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                <nav className='d-flex py-2'>
                    <div className=' d-flex flex-column gap-2'>
                        <section className='d-flex'>
                            <h5>Order No&nbsp;</h5>
                        </section> 

                        <section className='d-flex'>
                            <h5>Staff&nbsp;</h5>
                        </section>
                    </div>

                    <div className=' d-flex flex-column gap-2'>
                        <section className='d-flex'>:
                            <input type="number" id='orderId' pattern='^$|^[1-9]$' name='orderId' min={0} value={(selectedOrderId=== undefined)?"":selectedOrderId} onChange={({target})=>{changeOrderIdInputhandler(target) }} className="form-control" disabled={(location.state !== undefined)?(location.state.staffWorkId !== undefined)? true: false : false} style={{ textAlign:'center', fontSize:'1rem', height:'1.6rem', width:'4rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none', border:'none', borderBottom:'1px solid gray', backgroundColor:'rgba(255, 255, 255, 0)'}}/>
                            <button onClick={handleShowOrderProductModel} type="button" className="btn btn-primary search-btn" disabled={(location.state !== undefined)?(location.state.staffWorkId !== undefined)? true: false : false} style={{fontSize:'0.9rem',width:'1.6rem',height:'1.6rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none'}}>
                                <i style={{fontSize:'1rem',width:'2rem', height:'1.9rem', padding:'0rem', borderRadius:'0rem'}}><HiSearch/></i>
                            </button>
                        </section> 
                        
                        <section className='d-flex mt-1'>:
                            <select id="staffs" name="staff" value={(location.state !== undefined)?(location.state.staffId):(workDetail.staff ===null)?"":workDetail.staff} onChange={inputChangeHandler}  disabled={(location.state !== undefined)?(location.state.staffWorkId !== undefined)? true: false : false} style={{fontSize:'1rem', height:'1.6rem', width:'fit-containt', borderRadius:'0rem', boxShadow:'none', borderRadius:'0rem', border:'none', borderBottom:'1px solid gray', textAlign:'center'}}>
                                <option  id={null} value={"---"}>---</option>
                                {(stafffNameList !== undefined)&&(
                                    stafffNameList.map(({staffId, staffName},index)=>{
                                        return <option key={`staffName${index}`} id={staffId} value={staffId}>{staffName}</option>
                                    })
                                )}
                            </select>
                        </section>
                    </div>
                </nav>
            </header>

            <main>
                <OrderProductTable selectedOrderProductDetail={selectedOrderProductDetail}/>

                            
                <section className='d-flex gap-5' >
                                    {/* ASSIGN WORK */}
                    <div className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                        <h5 className="card-title">Assign Work</h5>

                        {/* <!-- Horizontal Form --> */}
                        <form id='assign-work' onSubmit={submitButtonHandler}>
                            <div className="row mb-3">
                                <label htmlFor="inputGivenweight" className="col-sm-3 col-form-label">Given weight</label>

                                <div className="col-sm-9">
                                    <input type="number" min={0} className="form-control" id="inputGivenWeight" name="givenWeight" value={(workDetail.givenWeight === null)?'':workDetail.givenWeight} onChange={inputChangeHandler}/>
                                    <div id='invalid-tooltip' className={`givenWeight-tooltip`} hidden={true}>
                                        <p>You missed me !</p> 
                                    </div>
                                </div>
                                
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputKdmWeight" className="col-sm-3 col-form-label">KDM Weight</label>

                                <div className="col-sm-9">
                                    <input type="number" className="form-control" id="inputKdmWeight" name="KDMWeight" value={(workDetail.KDMWeight === null)?'':workDetail.KDMWeight} onChange={inputChangeHandler}/>
                                    <div id='invalid-tooltip' className={`KDMWeight-tooltip`} hidden={true}>
                                        <p>You missed me !</p> 
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputSubmittionDate" className="col-sm-3 col-form-label">Submittion Date</label>

                                <div className="col-sm-9">
                                    <input type="date" className="form-control" id="inputSubmittionDate" name="submittionDate" value={(workDetail.submittionDate === null)?'':workDetail.submittionDate} onChange={inputChangeHandler}/>
                                    <div id='invalid-tooltip' className={`submittionDate-tooltip`} hidden={true}>
                                        <p>You missed me !</p> 
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end flex-cloumn gap-2">
                                <button type="submit" className="btn btn-success">Submit</button>
                                <button type="reset" className="btn btn-warning" onClick={resetButtonHandler}>Reset</button>
                            </div>
                        </form>
                        {/* <!-- End Horizontal Form --> */}
                    </div>


                                    {/* SUBMIT WORK */}
                    <aside className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                        <h5 className="card-title">Submit Work</h5>

                        {/* <!-- Horizontal Form --> */}
                        <form id='submit-work' onSubmit={submitButtonHandler}>
                            <div className="row mb-3">
                                <label htmlFor="inputProductWeight" className="col-sm-3 col-form-label">Product Weight</label>

                                <div className="col-sm-9">
                                    <input type="number"  name='finalProductWeight' className="form-control" id="inputProductWeight" value={(workDetail.finalProductWeight === null)?'':workDetail.finalProductWeight} onChange={inputChangeHandler} />
                                    <div id='invalid-tooltip' className={`finalProductWeight-tooltip`} hidden={true}>
                                        <p>You missed me !</p> 
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputSubmittedWeight" className="col-sm-3 col-form-label">Submitted Weight</label>

                                <div className="col-sm-9">
                                    <input type="number" min={0} name='submittedWeight' className="form-control" id="inputSubmittedWeight" value={(workDetail.submittedWeight === null)?'':workDetail.submittedWeight} onChange={inputChangeHandler} />
                                    <div id='invalid-tooltip' className={`submittedWeight-tooltip`} hidden={true}>
                                        <p>You missed me !</p> 
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputLossWeight" className="col-sm-3 col-form-label">Loss Weight</label>

                                <div className="col-sm-9">
                                    <input type="number" name='lossWeight' className="form-control" id="inputLossWeight" value={(workDetail.lossWeight === null)?'':workDetail.lossWeight} onChange={inputChangeHandler} />
                                    <div id='invalid-tooltip' className={`lossWeight-tooltip`} hidden={true}>
                                        <p>You missed me !</p> 
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputSubmittedDate" className="col-sm-3 col-form-label">Submitted Date</label>

                                <div className="col-sm-9">
                                    <input type="date" name='submittedDate' className="form-control" id="inputSubmittedDate" value={(workDetail.submittedDate === null)?'':workDetail.submittedDate} onChange={inputChangeHandler} />
                                    <div id='invalid-tooltip' className={`submittedDate-tooltip`} hidden={true}>
                                        <p>You missed me !</p> 
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end flex-cloumn gap-2">
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                        </form>
                        {/* <!-- End Horizontal Form --> */}
                    </aside>
                </section>

            </main>

            <OrderProductsModel show={showOrderProductModel} handleClose={handleShowOrderProductModel} selectedOrderId={selectedOrderId} handlerOrderProductSelect={handlerOrderProductSelect}/>
        </div>
    )
}

export default AssignWork