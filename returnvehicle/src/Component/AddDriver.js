import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Head from "./Head";
import { useNavigate } from "react-router-dom";

function AddDriver() {
    
      const [drivername, setDrivername] = useState("");
      const [driverlicense, setDriverLicense] = useState("");
      const navigate = useNavigate();
    
      const save = () => {
        let params = {
          drivername: drivername,
          driverlicense: driverlicense,
        };
        fetch("http://localhost:4000/truck/addDriver", {
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
      };
  return (
    <>
    <Sidebar />
    <div class="content">
      <Head />
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          <div class="col-sm-12 col-xl-10">
            <div class="bg-secondary rounded h-100 p-4">
              <h6 class="mb-4">Add Driver Details</h6>
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(event) => setDrivername(event.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Driver License
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleInputPassword1"
                    onChange={(event) => setDriverLicense(event.target.value)}
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
  )
}

export default AddDriver