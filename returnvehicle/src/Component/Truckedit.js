import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Head from "./Head";
import { useLocation, useNavigate } from "react-router-dom";

function Truckedit() {
  const location = useLocation();
  const [truckname, setTruckname] = useState("");
  const [licenseno, setLicenseno] = useState("");
  const [vehicleno, setVehicleno] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    let param = {
      id: location.state.id,
    };
    fetch("http://localhost:4000/truck/gettruck", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
    .then((res) => res.json()).then((result) => {
      setTruckname(result.truckname);
      setLicenseno(result.licenseno);
      setVehicleno(result.vehicleno);
     
    });
  }, []);
 
 
  const updateTruck = () => {
    let params = {
        id: location.state.id,
        truckname: truckname,
        licenseno: licenseno,
        vehicleno: vehicleno,
        
    };

    fetch("http://localhost:4000/truck/edittruck", {
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
       navigate("/truckview");
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
                <h6 class="mb-4">Truck details</h6>
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Truck name
                    </label>
                    <input
                    name="name"
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(event) => setTruckname(event.target.value)}
                      value={truckname}
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
                    value={licenseno}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">
                      Vehicle No
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      onChange={(event) => setVehicleno(event.target.value)}
                      aria-describedby="emailHelp"
                      value={vehicleno}
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
  );
}

export default Truckedit;
