import React from 'react'

function Dashboard() {
    return (
        <section class="section dashboard">
            <div class="row">

                {/* <!-- Left side columns --> */}
                <div class="col-lg-8">
                    <div class="row">


                        {/* !-- Sales Card --> */}
                        <div class="col-xxl-4 col-md-6">
                            <div class="card info-card sales-card">

                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body">
                                    <h5 class="card-title">Bill <span>| Today</span></h5>

                                    <div class="d-flex align-items-center">
                                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i class="bi bi-cart"></i>
                                        </div>
                                        <div class="ps-3">
                                            <h6>145</h6>
                                            <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <!-- End Sales Card --> */}


                        {/* !-- Sales Card --> */}
                        <div class="col-xxl-4 col-md-6">
                            <div class="card info-card sales-card">

                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body">
                                    <h5 class="card-title">Order <span>| Today</span></h5>

                                    <div class="d-flex align-items-center">
                                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i class="bi bi-cart"></i>
                                        </div>
                                        <div class="ps-3">
                                            <h6>145</h6>
                                            <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <!-- End Sales Card --> */}


                        <div class="col-xxl-4 col-md-6">
                            <div class="card info-card revenue-card">

                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body">
                                    <h5 class="card-title">Staff </h5>

                                    <div class="d-flex align-items-center">
                                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i class="bi bi-currency-dollar"></i>
                                        </div>
                                        <div class="ps-3">
                                            <h6>$3,264</h6>
                                            {/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">increase</span> */}

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>



                        




                        {/* <!-- Recent Sales --> */}


                        <div class="col-12">
                            <div class="card recent-sales">

                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body">
                                <h5 class="card-title">Orders <span>| Today</span></h5>

                                <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                    
                                    <div class="dataTable-container">
                                        <table class="table table-borderless datatable dataTable-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" data-sortable="" style={{'width': '10.9635%'}}>
                                                        <a href="#" class="dataTable-sorter">#</a>
                                                    </th>
                                                    <th scope="col" data-sortable="" style={{'width': '23.9204%'}}>
                                                        <a href="#" class="dataTable-sorter">Customer</a>
                                                    </th>
                                                    <th scope="col" data-sortable="" style={{'width': '40.1663%'}}>
                                                        <a href="#" class="dataTable-sorter">Product</a>
                                                    </th>
                                                    <th scope="col" data-sortable="" style={{'width': '9.86716%'}}>
                                                        <a href="#" class="dataTable-sorter">Price</a>
                                                    </th>
                                                    <th scope="col" data-sortable="" style={{'width': '15.0499%'}}>
                                                        <a href="#" class="dataTable-sorter">Status</a>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">
                                                        <a href="#">#2457</a>
                                                    </th>
                                                    <td>Brandon Jacob</td>
                                                    <td>
                                                        <a href="#" class="text-primary">At praesentium minu</a>
                                                    </td>
                                                    <td>$64</td>
                                                    <td>
                                                        <span class="badge bg-success">Approved</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="dataTable-bottom">
                                        <div class="dataTable-info">Showing 1 to 5 of 5 entries</div>
                                        <nav class="dataTable-pagination">
                                            <ul class="dataTable-pagination-list"></ul>
                                        </nav>
                                    </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        




                        <div class="col-12">
                            <div class="card recent-sales">

                                <div class="filter">
                                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li class="dropdown-header text-start">
                                            <h6>Filter</h6>
                                        </li>

                                        <li><a class="dropdown-item" href="#">Today</a></li>
                                        <li><a class="dropdown-item" href="#">This Month</a></li>
                                        <li><a class="dropdown-item" href="#">This Year</a></li>
                                    </ul>
                                </div>

                                <div class="card-body">
                                <h5 class="card-title">Staff Work <span>| Today</span></h5>

                                <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                    
                                    <div class="dataTable-container">
                                        <table class="table table-borderless datatable dataTable-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" data-sortable="" style={{'width': '10.9635%'}}>
                                                        <a href="#" class="dataTable-sorter">#</a>
                                                    </th>
                                                    <th scope="col" data-sortable="" style={{'width': '23.9204%'}}>
                                                        <a href="#" class="dataTable-sorter">Customer</a>
                                                    </th>
                                                    <th scope="col" data-sortable="" style={{'width': '40.1663%'}}>
                                                        <a href="#" class="dataTable-sorter">Product</a>
                                                    </th>
                                                    <th scope="col" data-sortable="" style={{'width': '9.86716%'}}>
                                                        <a href="#" class="dataTable-sorter">Price</a>
                                                    </th>
                                                    <th scope="col" data-sortable="" style={{'width': '15.0499%'}}>
                                                        <a href="#" class="dataTable-sorter">Status</a>
                                                    </th>
                                                </tr>
                                                
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">
                                                        <a href="#">#2457</a>
                                                    </th>
                                                    <td>Brandon Jacob</td>
                                                    <td>
                                                        <a href="#" class="text-primary">At praesentium minu</a>
                                                    </td>
                                                    <td>$64</td>
                                                    <td>
                                                        <span class="badge bg-success">Approved</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><a href="#">#2049</a></th>
                                                    <td>Ashleigh Langosh</td>
                                                    <td><a href="#" class="text-primary">At recusandae consectetur</a></td>
                                                    <td>$147</td>
                                                    <td><span class="badge bg-success">Approved</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><a href="#">#2644</a></th>
                                                    <td>Angus Grady</td>
                                                    <td><a href="#" class="text-primar">Ut voluptatem id earum et</a></td>
                                                    <td>$67</td>
                                                    <td><span class="badge bg-danger">Rejected</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><a href="#">#2644</a></th>
                                                    <td>Raheem Lehner</td>
                                                    <td><a href="#" class="text-primary">Sunt similique distinctio</a></td>
                                                    <td>$165</td>
                                                    <td><span class="badge bg-success">Approved</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="dataTable-bottom">
                                        <div class="dataTable-info">Showing 1 to 5 of 5 entries</div>
                                        <nav class="dataTable-pagination">
                                            <ul class="dataTable-pagination-list"></ul>
                                        </nav>
                                    </div>
                                    </div>

                                </div>

                            </div>
                        </div>






                    </div>
                </div>



                {/* <!-- Right side columns --> */}
            <div class="col-lg-3">
                <div class="card recent-sales">
                    <div class="card-body">
                        <h5 class="card-title">Rate</h5>

                        <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                            
                            <div class="dataTable-container">
                                <ul className='nav-rate-board d-flex'>
                                    <li className='align-items-center'>
                                        <p>Hallmark:</p>
                                        <p>Tajabi:</p>
                                        <p>Silver:</p>
                                    </li>
                                    <li className='align-items-center ms-4'>
                                        <p>Rs. 90000/tola</p>
                                        <p>Rs. 90000/tola</p>
                                        <p>Rs. 90000/tola</p>
                                    </li>
                                </ul>
                                
                            </div>

                            <div class="dataTable-container">
                                <ul className='nav-rate-board d-flex'>
                                    <li className='align-items-center'>
                                        <p>Hallmark:</p>
                                        <p>Tajabi:</p>
                                        <p>Silver:</p>
                                    </li>
                                    <li className='align-items-center ms-4'>
                                        <p>Rs. 90000/tola</p>
                                        <p>Rs. 90000/tola</p>
                                        <p>Rs. 90000/tola</p>
                                    </li>
                                </ul>
                                    
                            </div>

                        </div>

                    </div>

                </div>
















                
            </div>






            </div>
            
        </section>
    )
}

export default Dashboard



{/* <tr><th scope="row"><a href="#">#2147</a></th><td>Bridie Kessler</td><td><a href="#" class="text-primary">Blanditiis dolor omnis similique</a></td><td>$47</td><td><span class="badge bg-warning">Pending</span></td></tr><tr><th scope="row"><a href="#">#2049</a></th><td>Ashleigh Langosh</td><td><a href="#" class="text-primary">At recusandae consectetur</a></td><td>$147</td><td><span class="badge bg-success">Approved</span></td></tr><tr><th scope="row"><a href="#">#2644</a></th><td>Angus Grady</td><td><a href="#" class="text-primar">Ut voluptatem id earum et</a></td><td>$67</td><td><span class="badge bg-danger">Rejected</span></td></tr><tr><th scope="row"><a href="#">#2644</a></th><td>Raheem Lehner</td><td><a href="#" class="text-primary">Sunt similique distinctio</a></td><td>$165</td><td><span class="badge bg-success">Approved</span></td></tr> */}
