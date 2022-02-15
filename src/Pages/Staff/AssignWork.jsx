import React from 'react'
import { HiSearch } from 'react-icons/hi'

function AssignWork() {
  return (
    <div className="card background--none " id='assign-work-card'>
        <header className="top-nav" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
            <nav className='d-flex py-2'>
                {/* <div className='d-flex gap-4'>  */}
                    <div className=' d-flex flex-column gap-2'>
                        <section className='d-flex'>
                            <h5>Order No: &nbsp;</h5>
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
                            <h5>Staff: &nbsp;</h5>
                            {/* <select id="cars" name="cars" style={{fontSize:'1rem', height:'1.6rem', width:'fit-containt', borderRadius:'0rem', boxShadow:'none', textAlign:'center'}}>
                                <option value="ram">Ram</option>
                                <option value="hari">Hari</option>
                                <option value="gopal">Gopal</option>
                                <option value="shayam">shayam</option>
                            </select> */}
                        </section>
                    </div>

                    <div className=' d-flex flex-column gap-2'>
                        <section className='d-flex'>
                            <input type="number" className="form-control" min='0' style={{ textAlign:'center', fontSize:'1rem', height:'1.6rem', width:'4rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none', border:'none', borderBottom:'1px solid gray', backgroundColor:'rgba(255, 255, 255, 0)'}}/>
                            <button type="button" className="btn btn-primary search-btn" style={{fontSize:'0.9rem',width:'1.6rem',height:'1.6rem', padding:'0rem', borderRadius:'0rem', boxShadow:'none'}}>
                                <i style={{fontSize:'1rem',width:'2rem', height:'1.9rem', padding:'0rem', borderRadius:'0rem'}}><HiSearch/></i>
                            </button>
                        </section> 
                        
                        {/* <section className='d-flex'>
                            <input type="number" className="form-control" min='0' style={{fontSize:'1rem', height:'1.6rem', width:'5.6rem', padding:'0rem', borderRadius:'0rem', border:'none', borderBottom:'1px solid gray', boxShadow:'none', backgroundColor:'rgba(255, 255, 255, 0)'}} disabled/>
                        </section> */}

                        <section className='d-flex mt-1'>
                            <select id="cars" name="cars" style={{fontSize:'1rem', height:'1.6rem', width:'fit-containt', borderRadius:'0rem', boxShadow:'none', borderRadius:'0rem', border:'none', borderBottom:'1px solid gray', textAlign:'center'}}>
                                <option value="ram">Ram</option>
                                <option value="hari">Hari</option>
                                <option value="gopal">Gopal</option>
                                <option value="shayam">shayam</option>
                            </select>
                        </section>
                    </div>

                    
                {/* </div> */}
            </nav>
        </header>

        <main>
            <section className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
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
                        <tr>
                            <td>1</td>
                            <td>Ring</td>
                            <td>22</td>
                            <td>0</td>
                            <td>Muga</td>
                            <td>01</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        
            <section className='d-flex gap-5' >
                <div className="card-body box--shadow" style={{backgroundColor:'rgba(255, 255, 255, 0.822)'}}>
                    <h5 class="card-title">Assign Work</h5>

                    {/* <!-- Horizontal Form --> */}
                    <form>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-3 col-form-label">Given weight</label>

                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputText"/>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-3 col-form-label">KDM Weight</label>

                            <div class="col-sm-9">
                                <input type="email" class="form-control" id="inputEmail"/>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-3 col-form-label">Submittion Date</label>

                            <div class="col-sm-9">
                                <input type="date" class="form-control" id="inputPassword"/>
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
                    <form>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-3 col-form-label">Product Weight</label>

                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="inputText"/>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-3 col-form-label">Submitted Weight</label>

                            <div class="col-sm-9">
                                <input type="email" class="form-control" id="inputEmail"/>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-3 col-form-label">Loss Weight</label>

                            <div class="col-sm-9">
                                <input type="password" class="form-control" id="inputPassword"/>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-3 col-form-label">Submitted Date</label>

                            <div class="col-sm-9">
                                <input type="date" class="form-control" id="inputPassword"/>
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
    </div>
  )
}

export default AssignWork