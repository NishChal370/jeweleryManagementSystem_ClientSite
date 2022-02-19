import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { HiSearch } from 'react-icons/hi';
import { useLocation, useHistory } from 'react-router-dom';
import { INITIAL_STAFF_WORK } from '../../Components/Staff/Constant';
import { OrderProductsModel, OrderProductTable } from '../../Components';
import { Get_Staff_Names, POST_Staff_Assign_Work } from '../../API/UserServer';



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
        removeInvalidMessage(target);

        (target.type !== 'date')
            ?workDetail[target.name] = parseFloat(target.value)
            :workDetail[target.name] = target.value;

        setWorkDetail({...workDetail});
    }


    const handleShowOrderProductModel=()=>{
        (showOrderProductModel)
            ? setShowOrderProductModel(false)
            : setShowOrderProductModel(true)
    }


    const handlerOrderProductSelect=(orderProduct)=>{
        workDetail['orderProduct'] = orderProduct[0].orderProductId;
        setWorkDetail({...workDetail});
        
        setSelectedOrderProductDetail(orderProduct);
    }


    const submitButtonHandler=(e)=>{
        e.preventDefault();

        if(verifyInputs(e.target.id)){
            workDetail['totalWeight'] = workDetail['givenWeight'] + workDetail['KDMWeight'];
            
            if(e.target.id === 'submit-work'){
                workDetail['submittedDate'] = new Date().toJSON().slice(0,10)
                setWorkDetail({...workDetail});
            }

            PostStaffAssignWork(workDetail);
        }
    }


    const verifyInputs = (inputId)=>{
        let isValid = true;

        let inputs = [...document.forms[inputId].getElementsByTagName("input")];

        inputs.forEach((input)=>{
            if((input.value<=0 || input.value === '') &&(input.id !=='inputLossWeight' &&input.id !=='inputSubmittedDate')){
            input.style.borderColor = 'red';
            input.placeholder = 'you missed me...';

            isValid = false;
        }
           
        })

        return isValid;
    }


    const removeInvalidMessage=(input)=>{
        input.placeholder = '';
        input.style.borderColor = '';
    }

    
    const resetButtonHandler=()=>{
        let inputs = [...document.forms['assign-work'].getElementsByTagName("input")];
        
        inputs.forEach((input)=>{
            removeInvalidMessage(input);
        })

        document.getElementById('orderId').value = undefined;
        document.getElementById('staff').value = "---";

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
            // if(work !== undefined){
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
            // }
            
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
                        
                        {console.log("HERE")}
                        {console.log(selectedOrderId)}
                            <input type="number" id='orderId' min={1} value={(selectedOrderId=== undefined)?"":selectedOrderId} onChange={({target})=>{setSelectOrderId(target.value)}} className="form-control" min='0' disabled={(location.state !== undefined)?(location.state.staffWorkId !== undefined)? true: false : false} style={{ textAlign:'center', fontSize:'1rem', height:'1.6rem', width:'4rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none', border:'none', borderBottom:'1px solid gray', backgroundColor:'rgba(255, 255, 255, 0)'}}/>
                            <button onClick={(selectedOrderId>0)?(handleShowOrderProductModel):()=>{}} type="button" className="btn btn-primary search-btn" disabled={(location.state !== undefined)?(location.state.staffWorkId !== undefined)? true: false : false} style={{fontSize:'0.9rem',width:'1.6rem',height:'1.6rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none'}}>
                                <i style={{fontSize:'1rem',width:'2rem', height:'1.9rem', padding:'0rem', borderRadius:'0rem'}}><HiSearch/></i>
                            </button>
                        </section> 
                        
                        <section className='d-flex mt-1'>:
                            <select id="staffs" id='staff' name="staff" value={(location.state !== undefined)?(location.state.staffId):(workDetail.staff ===null)?"":workDetail.staff} onChange={inputChangeHandler}  disabled={(location.state !== undefined)?(location.state.staffWorkId !== undefined)? true: false : false} style={{fontSize:'1rem', height:'1.6rem', width:'fit-containt', borderRadius:'0rem', boxShadow:'none', borderRadius:'0rem', border:'none', borderBottom:'1px solid gray', textAlign:'center'}}>
                                <option  id={null} value={null}>---</option>
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
                    <div className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                        <h5 class="card-title">Assign Work</h5>

                        {/* <!-- Horizontal Form --> */}
                        <form id='assign-work' onSubmit={submitButtonHandler}>
                            <div class="row mb-3">
                                <label for="inputGivenweight" class="col-sm-3 col-form-label">Given weight</label>

                                <div class="col-sm-9">
                                    <input type="number" min={0} class="form-control" id="inputGivenWeight" name="givenWeight" value={(workDetail.givenWeight === null)?'':workDetail.givenWeight} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputKdmWeight" class="col-sm-3 col-form-label">KDM Weight</label>

                                <div class="col-sm-9">
                                    <input type="number" min={0} class="form-control" id="inputKdmWeight" name="KDMWeight" value={(workDetail.KDMWeight === null)?'':workDetail.KDMWeight} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputSubmittionDate" class="col-sm-3 col-form-label">Submittion Date</label>

                                <div class="col-sm-9">
                                    <input type="date" class="form-control" id="inputSubmittionDate" name="submittionDate" value={(workDetail.submittionDate === null)?'':workDetail.submittionDate} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="d-flex justify-content-end flex-cloumn gap-2">
                                <button type="submit" class="btn btn-success">Submit</button>
                                <button type="reset" class="btn btn-warning" onClick={resetButtonHandler}>Reset</button>
                            </div>
                        </form>
                        {/* <!-- End Horizontal Form --> */}
                    </div>

                    <aside className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                        <h5 class="card-title">Submit Work</h5>

                        {/* <!-- Horizontal Form --> */}
                        <form id='submit-work' onSubmit={submitButtonHandler}>
                            <div class="row mb-3">
                                <label for="inputProductWeight" class="col-sm-3 col-form-label">Product Weight</label>

                                <div class="col-sm-9">
                                    <input type="number" min={0} name='finalProductWeight' class="form-control" id="inputProductWeight" value={(workDetail.finalProductWeight === null)?'':workDetail.finalProductWeight} onChange={inputChangeHandler} />
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputSubmittedWeight" class="col-sm-3 col-form-label">Submitted Weight</label>

                                <div class="col-sm-9">
                                    <input type="number" min={0} name='submittedWeight' class="form-control" id="inputSubmittedWeight" value={(workDetail.submittedWeight === null)?'':workDetail.submittedWeight} onChange={inputChangeHandler} />
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputLossWeight" class="col-sm-3 col-form-label">Loss Weight</label>

                                <div class="col-sm-9">
                                    <input type="number" name='lossWeight' class="form-control" id="inputLossWeight" value={(workDetail.lossWeight === null)?'':workDetail.lossWeight} onChange={inputChangeHandler} />
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputSubmittedDate" class="col-sm-3 col-form-label">Submitted Date</label>

                                <div class="col-sm-9">
                                    <input type="date" name='submittedDate' class="form-control" id="inputSubmittedDate" value={(workDetail.submittedDate === null)?'':workDetail.submittedDate} onChange={inputChangeHandler} />
                                </div>
                            </div>

                            <div class="d-flex justify-content-end flex-cloumn gap-2">
                                <button type="submit" class="btn btn-success">Submit</button>
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