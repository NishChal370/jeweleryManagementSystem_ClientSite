import React from 'react'
import Dashboard from '../../Pages/Dashboard/Dashboard'

function Main() {
    return (
        <main id="main" class="main" >

            <div class="pagetitle" >
            <h1>Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active">Dashboard</li>
                </ol>
            </nav>
            </div>

            <Dashboard/>
        </main>
    )
}

export default Main
