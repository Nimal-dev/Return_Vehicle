import React from 'react'
import { useNavigate } from 'react-router-dom';

function Head() {

    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     localStorage.removeItem('userdata');
    //     navigate('/');
    // };
    const handleLogout=()=>{
        localStorage.clear();
        setTimeout(()=>{
            navigate('/');
            window.location.reload();
        },100)
        
    }
  return (
    <nav class="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
    <a href="index.html" class="navbar-brand d-flex d-lg-none me-4">
        <h2 class="text-primary mb-0"><i class="fa fa-user-edit"></i></h2>
    </a>
    <a href="#" class="sidebar-toggler flex-shrink-0">
        <i class="fa fa-bars"></i>
    </a>
    
    <div class="navbar-nav align-items-center ms-auto">
        <div class="nav-item dropdown">
            <a href="#" class="nav-link " >
               
                <span class="d-none d-lg-inline-flex" onClick={handleLogout}>LOG OUT</span>
            </a>
            
        </div>
      
      
    </div>
</nav>
  )
}

export default Head