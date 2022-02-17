import React, { useEffect,useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { INITIAL_STAFF_WORK } from '../../Components/Staff/Constant';
import { OrderProductsModel, OrderProductTable } from '../../Components';
import { Get_Staff_Names, POST_Staff_Assign_Work } from '../../API/UserServer';



function AssignWork() {
    const location = useLocation()
    const [stafffNameList, setStaffNameList] = useState();
    const [selectedOrderId, setSelectOrderId] = useState();
    const [workDetail, setWorkDetail] = useState(INITIAL_STAFF_WORK);
    const [showOrderProductModel, setShowOrderProductModel] = useState(false);
    const [selectedOrderProductDetail, setSelectedOrderProductDetail] = useState();
    

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

                alert("DONE");
                setWorkDetail(INITIAL_STAFF_WORK);
                console.log(response.data);
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

            console.log(workDetail);
            PostStaffAssignWork(workDetail);
        }
    }


    const verifyInputs = (inputId)=>{
        let isValid = true;

        let inputs = [...document.forms[inputId].getElementsByTagName("input")];

        inputs.forEach((input)=>{
            if(input.value<=0 || input.value === ''){
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


    const resetButtonHandler=(e)=>{
        let inputs = [...document.forms[e.target.id].getElementsByTagName("input")];

        inputs.forEach((input)=>{
            removeInvalidMessage(input);
        })
    }


    const disableSubmitForm =()=>{
        let submitWorkInputs = [...document.forms['submit-work'].getElementsByTagName("input")];
        let submitWorkButtons = [...document.forms['submit-work'].getElementsByTagName("button")];

        if(workDetail.staffWorkId === null || workDetail.staffWorkId === ""){
            submitWorkInputs.forEach((input)=>{
                input.disabled=true;
            });

            submitWorkButtons.forEach((button)=>{
                button.disabled=true;
            });
        }
    }

    useEffect(()=>{
        GetStaffNames();
        disableSubmitForm();
    },[])



    return (
        <div className="card background--none " id='assign-work-card'>
            <header className="top-nav" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                <nav className='d-flex py-2'>
                    {/* <div className='d-flex gap-4'>  */}
                        <div className=' d-flex flex-column gap-2'>
                            <section className='d-flex'>
                                <h5>Order No&nbsp;</h5>
                                {/* <input type="number" className="form-control" min='0' style={{ textAlign:'center', fontSize:'1rem', height:'1.6rem', width:'2.6rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none', border:'none', borderBottom:'1px solid gray', backgroundColor:'rgba(255, 255, 255, 0)'}}/>
                                <button type="button" className="btn btn-primary search-btn" style={{fontSize:'0.9rem',width:'1.6rem',height:'1.6rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none'}}>
                                    <i style={{fontSize:'1rem',width:'2rem', height:'1.9rem', padding:'0rem', borderRadius:'0rem'}}><HiSearch/></i>
                                </button> */}
                            </section> 
                            
                            {/* <section className='d-flex'> */}
                                {/* <h5>Order Product No: &nbsp;</h5> */}
                                {/* <input type="number" className="form-control" min='0' style={{fontSize:'1rem', height:'1.6rem', width:'2.6rem', padding:'0rem', borderRadius:'0rem', border:'none', borderBottom:'1px solid gray', boxShadow:'none', backgroundColor:'rgba(255, 255, 255, 0)'}} disabled/> */}
                            {/* </section> */}

                            <section className='d-flex'>
                                <h5>Staff&nbsp;</h5>
                                {/* <select id="cars" name="cars" style={{fontSize:'1rem', height:'1.6rem', width:'fit-containt', borderRadius:'0rem', boxShadow:'none', textAlign:'center'}}>
                                    <option value="ram">Ram</option>
                                    <option value="hari">Hari</option>
                                    <option value="gopal">Gopal</option>
                                    <option value="shayam">shayam</option>
                                </select> */}
                            </section>
                        </div>

                        <div className=' d-flex flex-column gap-2'>
                            <section className='d-flex'>:
                                <input type="number" min={1} value={selectedOrderId} onChange={({target})=>{setSelectOrderId(target.value)}} className="form-control" min='0' style={{ textAlign:'center', fontSize:'1rem', height:'1.6rem', width:'4rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none', border:'none', borderBottom:'1px solid gray', backgroundColor:'rgba(255, 255, 255, 0)'}}/>
                                <button onClick={(selectedOrderId>0)&&(handleShowOrderProductModel)} type="button" className="btn btn-primary search-btn" style={{fontSize:'0.9rem',width:'1.6rem',height:'1.6rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none'}}>
                                    <i style={{fontSize:'1rem',width:'2rem', height:'1.9rem', padding:'0rem', borderRadius:'0rem'}}><HiSearch/></i>
                                </button>
                            </section> 
                            
                            {/* <section className='d-flex'>
                                <input type="number" className="form-control" min='0' style={{fontSize:'1rem', height:'1.6rem', width:'5.6rem', padding:'0rem', borderRadius:'0rem', border:'none', borderBottom:'1px solid gray', boxShadow:'none', backgroundColor:'rgba(255, 255, 255, 0)'}} disabled/>
                            </section> */}
                            <section className='d-flex mt-1'>:
                                <select id="staffs" name="staff" value={(location.state !== undefined)?(location.state.staffId):workDetail.staff} onChange={inputChangeHandler}  style={{fontSize:'1rem', height:'1.6rem', width:'fit-containt', borderRadius:'0rem', boxShadow:'none', borderRadius:'0rem', border:'none', borderBottom:'1px solid gray', textAlign:'center'}}>
                                    <option  id={null} value={null}>---</option>
                                    {(stafffNameList !== undefined)&&(
                                        stafffNameList.map(({staffId, staffName},index)=>{
                                            return <option key={`staffName${index}`} id={staffId} value={staffId}>{staffName}</option>
                                        })
                                    )}
                                </select>
                            </section>
                        </div>

                        
                    {/* </div> */}
                </nav>
            </header>

            <main>
                <OrderProductTable selectedOrderProductDetail={selectedOrderProductDetail}/>

                            
                <section className='d-flex gap-5' >
                    <div className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                        <h5 class="card-title">Assign Work</h5>

                        {/* <!-- Horizontal Form --> */}
                        <form id='assign-work' onSubmit={submitButtonHandler} onReset={resetButtonHandler}>
                            <div class="row mb-3">
                                <label for="inputGivenweight" class="col-sm-3 col-form-label">Given weight</label>

                                <div class="col-sm-9">
                                    <input type="number" min={0} class="form-control" id="inputGivenWeight" name="givenWeight" value={workDetail.givenWeight} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputKdmWeight" class="col-sm-3 col-form-label">KDM Weight</label>

                                <div class="col-sm-9">
                                    <input type="number" min={0} class="form-control" id="inputKdmWeight" name="KDMWeight" value={workDetail.KDMWeight} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputSubmittionDate" class="col-sm-3 col-form-label">Submittion Date</label>

                                <div class="col-sm-9">
                                    <input type="date" class="form-control" id="inputSubmittionDate" name="submittionDate" value={workDetail.submittionDate} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="d-flex justify-content-end flex-cloumn gap-2">
                                <button type="submit" class="btn btn-success">Submit</button>
                                <button type="reset" class="btn btn-warning">Reset</button>
                            </div>
                        </form>
                        {/* <!-- End Horizontal Form --> */}
                    </div>

                    <aside className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                        <h5 class="card-title">Submit Work</h5>

                        {/* <!-- Horizontal Form --> */}
                        <form id='submit-work' onSubmit={submitButtonHandler} onReset={resetButtonHandler}>
                            <div class="row mb-3">
                                <label for="inputProductWeight" class="col-sm-3 col-form-label">Product Weight</label>

                                <div class="col-sm-9">
                                    <input type="number" min={0} class="form-control" id="inputProductWeight" value={workDetail.finalProductWeight} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputSubmittedWeight" class="col-sm-3 col-form-label">Submitted Weight</label>

                                <div class="col-sm-9">
                                    <input type="number" min={0} class="form-control" id="inputSubmittedWeight" value={workDetail.submittedWeight} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputLossWeight" class="col-sm-3 col-form-label">Loss Weight</label>

                                <div class="col-sm-9">
                                    <input type="number" min={0} class="form-control" id="inputLossWeight" value={workDetail.lossWeight} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputSubmittedDate" class="col-sm-3 col-form-label">Submitted Date</label>

                                <div class="col-sm-9">
                                    <input type="date" class="form-control" id="inputSubmittedDate" value={workDetail.submittedDate} onChange={inputChangeHandler}/>
                                </div>
                            </div>

                            <div class="d-flex justify-content-end flex-cloumn gap-2">
                                <button type="submit" class="btn btn-success">Submit</button>
                                <button type="reset" class="btn btn-warning">Reset</button>
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











/**
 * 
 * <section className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                    <h5 className="card-title">Order Products' Detail</h5>

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Order P. No</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Net Weight</th>
                                <th scope="col">Total Weight</th>
                                <th scope="col">Gems Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(selectedOrderProductDetail !== undefined)&&(
                                selectedOrderProductDetail.map(({orderProductId, product, totalWeight, quantity}, index)=>{
                                    return(
                                    <tr style={{cursor:'pointer'}}>
                                        <td>{orderProductId}</td>
                                        <td>{product.productName}</td>
                                        <td>{(product.netWeight === null || product.netWeight==='') ?'-' :product.netWeight}</td>
                                        <td>{(totalWeight === null || totalWeight==='') ?'-' :totalWeight}</td>
                                        <td>{(product.gemsName === null || product.gemsName==='') ?'-' :product.gemsName}</td>
                                        <td>{(quantity === null || quantity==='') ?'-' :quantity}</td>
                                        <td>{(product.size === null || product.size==='') ?'-' :product.size}</td>
                                    </tr>)
                                })
                            )}
                            // <tr>
                            //     <td>1</td>
                            //     <td>Ring</td>
                            //     <td>22</td>
                            //     <td>0</td>
                            //     <td>Muga</td>
                            //     <td>01</td>
                            //     <td>-</td>
                            // </tr> 
                            </tbody>
                            </table>
                        </section>
 */