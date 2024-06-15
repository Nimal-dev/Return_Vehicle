import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Head from "../Component/Head";
import Sidebar from "../Component/Sidebar";

function Truckshedule() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const[trucks,settrucks]=useState([]);
  const [truckname,setTruckname]=useState("");
  const [locationfrom, setLocationfrom] = useState("");
  const [locationto, setLocationto] = useState("");
  const [startingtym, setStartingtym] = useState("");
  const [endtym, setEndtym] = useState("");
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  const save = () => {
    let params = {
        truckname:truckname,
        locationfrom: locationfrom,
        locationto: locationto,
        startingtym: startingtym,
        endtym:endtym,
        truckname:truckname,
      truckownerid:authenticated._id
    };
    fetch("http://localhost:4000/truck/schedule", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // navigate("/truckview");
      });
  };

  useEffect(()=>{
    fetch('http://127.0.0.1:4000/truck/viewtruck').then((res)=>res.json()).then((result)=>{
        console.log(result);
        settrucks(result)
    })
},[refresh]);

  return (
    <>
      <Sidebar/>
      <div class="content">
        <Head/>
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
            <div class="col-sm-12 col-xl-10">
              <div class="bg-secondary rounded h-100 p-4">
                <h6 class="mb-4">Truck details</h6>
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Truck name
                    </label>
                    <select
                                            class="form-select mb-3"
                                            aria-label="Default select example"
                                            onChange={(event) => { setTruckname(event.target.value) }}
                                        >
                                            <option selected>Trucks</option>
                                            {
                                                trucks.map((trucks) => {
                                                    return (
                                                        <option value={trucks._id}>{trucks.truckname}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Location from
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      onChange={(event) => setLocationfrom(event.target.value)}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Location to
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      onChange={(event) => setLocationto(event.target.value)}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                    Starting time:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      onChange={(event) => setStartingtym(event.target.value)}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Ending time:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      onChange={(event) => setEndtym(event.target.value)}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <button type="button" class="btn btn-primary" onClick={save}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Truckshedule;
