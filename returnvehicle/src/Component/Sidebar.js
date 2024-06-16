import React from 'react'

function Sidebar() {
  return (
    <div class="sidebar pe-4 pb-3">
            <nav class="navbar bg-secondary navbar-dark">
                <a href="index.html" class="navbar-brand mx-4 mb-3">
                    <h4 class="text-primary">RETURN VEHICLE</h4>
                </a>
                <div class="d-flex align-items-center ms-4 mb-4">
                    {/* <div class="position-relative">
                        <img class="rounded-circle" src="img/user.jpg" alt="" style={{width: '40px', height: '40px'}}/>
                        <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div class="ms-3">
                        <h6 class="mb-0">Jhon Doe</h6>
                        <span>TRUCK</span>
                    </div> */}
                    <h5>DASHBOARD</h5>
                </div>
                <div class="navbar-nav w-100">
                    <a href="truckview" class="nav-item nav-link"><i class="fa fa-truck me-2"></i>TRUCK DETAILS</a>
                    
                    <a href="/scheduleview" class="nav-item nav-link"><i class="fa fa-calendar me-2"></i>SHEDULED TIME</a>
                    <a href="/driverview" class="nav-item nav-link"><i class="fas fa-users me-2"></i>DRIVERS</a>
                  
                </div>
            </nav>
        </div>
  )
}

export default Sidebar