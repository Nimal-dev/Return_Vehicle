import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Head from "./Head";
import { useLocation, useNavigate } from "react-router-dom";

function EditDriver() {
    const location = useLocation();
  const [drivername, setDrivername] = useState("");
  const [driverlicense, setLicenseno] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    let param = {
      id: location.state.id,
    };
    fetch("http://localhost:4000/truck/getDrivers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
    .then((res) => res.json()).then((result) => {
        setDrivername(result.drivername);
      setLicenseno(result.driverlicense);
     
    });
  }, []);
 
 
  const updateTruck = () => {
    let params = {
        id: location.state.id,
        drivername: drivername,
        driverlicense: driverlicense,
        
        
    };

    fetch("http://localhost:4000/truck/EditDriver", {
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
       navigate("/driverview");
    });
}
  return (
    <>
    <Sidebar />
    <div class="content">
      <Head />
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          <div class="col-sm-12 col-xl-10">
            <div class="bg-secondary rounded h-100 p-4">
              <h6 class="mb-4">Driver details</h6>
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Driver name
                  </label>
                  <input
                  name="name"
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(event) => setDrivername(event.target.value)}
                    value={drivername}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    License No
                  </label>
                  <input
                  name="license"
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    onChange={(event) => setLicenseno(event.target.value)}
                  value={driverlicense}
                  />
                </div>
                <button type="button" class="btn btn-success" onClick={updateTruck}>
                  Update Details <i className="fas fa-edit"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default EditDriver