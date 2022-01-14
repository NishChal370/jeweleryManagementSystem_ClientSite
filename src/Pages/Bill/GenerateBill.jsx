import React from 'react'

function GenerateBill() {
    return (
        <div className="card generate-bill">
            <div className="card-body fs-5">
                <h5 className="card-title fs-5 ps-1">
                    Bill No: 
                    <span className='fs-5 ps-2'>234</span> 
                </h5>


                <form className="row g-4 pt-3 needs-validation" noValidate>
                    <section className='row mb-2'>
                        <div className="col-md-5 d-flex bill--order">
                            <label htmlFor="validationTooltip01" className="form-label">Order No: </label>
                            <input type="text"/>
                        </div>
                    </section>

                    <section className='row  justify-content-between'>
                        <div className="col-md-5 position-relative  d-flex">
                            <label htmlFor="validationTooltip01" className="form-label">First name</label>
                            <input type="text" className="form-control" id="validationTooltip01" value="John" required/>
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>

                        <div className="col-md-5 position-relative d-flex">
                            <label htmlFor="validationTooltip02" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="validationTooltip02" value="Doe" required/>
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>
                    </section>
                    
                    <section className='row  justify-content-between'>
                        <div className="col-md-5 position-relative d-flex">
                            <label htmlFor="validationTooltip01" className="form-label">Address</label>
                            <input type="text" className="form-control" id="validationTooltip01" value="John" required/>
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>

                        <div className="col-md-5 position-relative d-flex">
                            <label htmlFor="validationTooltip02" className="form-label">Email</label>
                            <input type="text" className="form-control" id="validationTooltip02" value="Doe" required/>
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>
                    </section>

                    <table className="table table-striped scrollable--table fs-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product name</th>
                                <th scope="col">Net Weight</th>
                                <th scope="col">loss Weight</th>
                                <th scope="col">Total Weight</th>
                                <th scope="col">M. Charge</th>
                                <th scope="col">Gems Name</th>
                                <th scope="col">Gems Price</th>
                                <th scope="col">Total Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Brandon Jacob</td>
                                <td>31</td>
                                <td>21</td>
                                <td>28</td>
                                <td>28</td>
                                <td>ganesh</td>
                                <td>28</td>
                                <td>28</td>
                            </tr>

                            <tr>
                                <th scope="row">1</th>
                                <td>Brandon Jacob</td>
                                <td>31</td>
                                <td>21</td>
                                <td>28</td>
                                <td>28</td>
                                <td>ganesh</td>
                                <td>28</td>
                                <td>28</td>
                            </tr>
                                                        
                            <tr>
                                <th scope="row">1</th>
                                <td>Brandon Jacob</td>
                                <td>31</td>
                                <td>21</td>
                                <td>28</td>
                                <td>28</td>
                                <td>ganesh</td>
                                <td>28</td>
                                <td>28</td>
                            </tr> 
                                                       
                            <tr>
                                <th scope="row">1</th>
                                <td>Brandon Jacob</td>
                                <td>31</td>
                                <td>21</td>
                                <td>28</td>
                                <td>28</td>
                                <td>ganesh</td>
                                <td>28</td>
                                <td>28</td>
                            </tr>
                            
                        </tbody>
                    </table>   


                    <section className='d-flex generate-bill-product-detail'>
                        <div className="card">
                            <div className='card-body col  justify-content-around d-flex'>
                                <div className='left-inputs'>
                                    <div className="col-md-5 position-relative  d-flex pe-0">
                                        <label htmlFor="validationTooltip01" className="form-label">Product name</label>
                                        <input type="text" className="form-control" id="validationTooltip01" value="John" required/>
                                        <div className="valid-tooltip">
                                            Looks good!
                                        </div>
                                    </div>

                                    <div className="col-md-5 position-relative d-flex">
                                        <label htmlFor="validationTooltip02" className="form-label">Quantity</label>
                                        <input type="text" className="form-control" id="validationTooltip02" value="Doe" required/>
                                        <div className="valid-tooltip">
                                            Looks good!
                                        </div>
                                    </div>

                                    <div className="col-md-5 position-relative d-flex">
                                        <label htmlFor="validationTooltip02" className="form-label">Net Weight</label>
                                        <input type="text" className="form-control" id="validationTooltip02" value="Doe" required/>
                                        <div className="valid-tooltip">
                                            Looks good!
                                        </div>
                                    </div>
                                    

                                    <div className="col-md-5 position-relative d-flex">
                                        <label htmlFor="validationTooltip02" className="form-label">Loss Weight</label>
                                        <input type="text" className="form-control" id="validationTooltip02" value="Doe" required/>
                                        <div className="valid-tooltip">
                                            Looks good!
                                        </div>
                                    </div>

                                    <div className="col-md-5 position-relative d-flex">
                                        <label htmlFor="validationTooltip02" className="form-label">Given Weight</label>
                                        <input type="text" className="form-control" id="validationTooltip02" value="Doe" required/>
                                        <div className="valid-tooltip">
                                            Looks good!
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div className='right-inputs'>
                                    <div className="col-md-5 position-relative  d-flex">
                                        <label htmlFor="validationTooltip01" className="form-label">Making Charge</label>
                                        <input type="text" className="form-control" id="validationTooltip01" value="John" required/>
                                        <div className="valid-tooltip">
                                            Looks good!
                                        </div>
                                    </div>

                                    <div className="col-md-5 position-relative d-flex">
                                        <label htmlFor="validationTooltip02" className="form-label">Gems Name</label>
                                        <input type="text" className="form-control" id="validationTooltip02" value="Doe" required/>
                                        <div className="valid-tooltip">
                                            Looks good!
                                        </div>
                                    </div>

                                    <div className="col-md-5 position-relative d-flex">
                                        <label htmlFor="validationTooltip02" className="form-label">Gems Price</label>
                                        <input type="text" className="form-control" id="validationTooltip02" value="Doe" required/>
                                        <div className="valid-tooltip">
                                            Looks good!
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='generate-bill--button'>
                                <div className="col">
                                    <button className="btn btn-primary" type="submit">Save</button>
                                </div>

                                <div className="col">
                                    <button className="btn btn-primary" type="submit">Drafts</button>
                                </div>

                                <div className="col">
                                    <button className="btn btn-primary" type="submit">Clear</button>
                                </div>
                                <div className="col">
                                    <button className="btn btn-primary" type="submit">Add</button>
                                </div>
                            </div>
                            
                        </div>
                        <div className="card bill-totals--card">
                            <div className="card-body">
                                <span>
                                    <p>Final Weight : <span>123423</span></p>
                                    <p>Customer P.Weight : <span>123423</span></p>
                                </span>
                                <hr />
                                <span>
                                    <h5>Grand Weight : <span>123423</span></h5>
                                    <h5>Total Amount : <span>123423</span></h5>
                                    <p>Advance payment : <span>123423</span></p>
                                    <p>Payment : <span>123423</span></p>
                                </span>
                                <hr />
                                <span>
                                    <p>Remaining Amount : <span>123423</span></p>
                                </span>

                            </div>
                        </div>
                        
                    </section>
                </form>

                
            </div>
        </div>
    )
}

export default GenerateBill


















/**
 *                     <div className="col-md-4 position-relative">
                        <label for="validationTooltipUsername" className="form-label">Username</label>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="validationTooltipUsernamePrepend">@</span>
                            <input type="text" className="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" required/>
                            <div className="invalid-tooltip">
                                Please choose a unique and valid username.
                            </div>
                        </div>
                    </div>
 */
