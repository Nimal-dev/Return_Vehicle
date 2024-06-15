import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Head from './Head'
import { Link } from 'react-router-dom';

function Truckview() {
    const [truck,setTruck]=useState([]);
    const [refresh,setRefresh]=useState(0);
    useEffect(()=>{
        fetch('http://127.0.0.1:4000/truck/viewschedule').then((res)=>res.json()).then((result)=>{
            console.log(result);
            setTruck(result)
        })
    },[refresh]);
    const handleApprove = (id) => {
        let dataApprove = {
            id: id,
            is_check: 1
        };
        fetch('http://localhost:4000/truck/approve', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataApprove)
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setRefresh(refresh + 1); // Refresh the list after updating
            })
            .catch((error) => console.error('Error approving truck:', error));
    };

    const handleReject = (id) => {
        let dataReject = {
            id: id,
            is_check: 0
        };
        fetch('http://localhost:4000/truck/reject', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataReject)
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setRefresh(refresh + 1); // Refresh the list after updating
            })
            .catch((error) => console.error('Error rejecting truck:', error));
    };

    
  return (
    <>
    <Sidebar/>
    <div class="content">
        <Head/>
        <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
        <div class="col-sm-12 col-xl-12">
                        <div class="bg-secondary rounded h-100 p-4">
                            <h6 class="mb-4">Truckdetails</h6>
                           
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">sl.no:</th>

                                        
                                        <th scope="col">Truck name</th>
                                        
                                        <th scope="col">Contact</th>
                                        <th scope="col">License No</th>
                                        <th scope="col">Vehicle No</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        truck.map((truck,index)=>{
                                            return(
<tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{truck.truckname.truckname}</td>
                                        
                                        <td>{truck.truckownerid.contact}</td>
                                        <td>{truck.truckname.licenseno}</td>
                                        <td>{truck.truckname.vehicleno}</td>
                                       
                                        <td>
        
                                        <button className='btn btn-success mx-2'  onClick={() => handleApprove(truck._id)}>Accept</button>
                                        <button className='btn btn-primary' onClick={() => handleReject(truck._id)}>Reject</button>
                                        </td>
                                    </tr>
                                            )
                                        })
                                    }
                                    
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                    </div>

        </div>
    </>
  )
}

export default Truckview