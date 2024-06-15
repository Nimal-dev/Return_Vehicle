import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import Sidebar from '../Component/Sidebar';
import Head from '../Component/Head';

function TruckGod() {
    const [truck,setTruck]=useState([]);
    const [refresh,setRefresh]=useState(0);
    useEffect(()=>{
        fetch('http://127.0.0.1:4000/truck/viewschedule').then((res)=>res.json()).then((result)=>{
            console.log(result);
            setTruck(result)
        })
    },[refresh]);
   

    
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
                                        <th scope="col">Staring time</th>
                                        <th scope="col">Ending time</th>
                                       
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
                                        <td>{truck.startingtym}</td>
                                        <td>{truck.endtym}</td>
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

export default TruckGod