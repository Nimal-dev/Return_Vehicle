import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';
import Head from '../Component/Head';

function Truckscheduleview() {
    const [truck,setTruck]=useState([]);
    const [refresh,setRefresh]=useState(0);
    useEffect(()=>{
        fetch('http://127.0.0.1:4000/truck/viewschedule').then((res)=>res.json()).then((result)=>{
            console.log('data',result);
            setTruck(result)
        })
    },[refresh]);
    const deleteschedule = (iD) => {
        let params = {
            id: iD
        };
    
        fetch('http://127.0.0.1:4000/truck/deleteschedule', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setRefresh(prev => prev + 1);
        });
    }
    
  return (
    <>
    <Sidebar/>
    <div class="content">
        <Head/>
        <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
        <div class="col-sm-12 col-xl-12">
                        <div class="bg-secondary rounded h-100 p-4">
                            <h6 class="mb-4">Truck scheduled details</h6>
                            <Link to='/schedule'><button class=" btn btn-success mb-4">Add</button></Link>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">sl.no:</th>
                                        <th scope="col">Vehicle name</th>
                                        <th scope="col">Location from</th>
                                        <th scope="col">Location to</th>
                                        <th scope="col">Starting time</th>
                                        <th scope="col">Ending time</th>
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
                                        <td>{truck.locationfrom}</td>
                                        <td>{truck.locationto}</td>
                                        <td>{truck.startingtym}</td>
                                        <td>{truck.endtym}</td>
                                       
                                        <td>
                                          <Link to='/scheduleedit' state={{id:truck._id}}><button class="btn btn-danger mx-2">view</button></Link>  
                                            <button className='btn btn-success' onClick={()=>{deleteschedule(truck._id)}}>Delete</button>
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

export default Truckscheduleview