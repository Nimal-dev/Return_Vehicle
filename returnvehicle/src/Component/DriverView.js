import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Head from "./Head";
import { Link } from "react-router-dom";

function DriverView() {
  const [driver, setDriver] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    fetch("http://127.0.0.1:4000/truck/viewDrivers")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setDriver(result);
      });
  }, [refresh]);
  const deleteDriver = (iD) => {
    let params = {
      id: iD,
    };

    fetch("http://127.0.0.1:4000/truck/deleteDriver", {
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
        setRefresh((prev) => prev + 1);
      });
  };

  return (
    <>
      <Sidebar />
      <div class="content">
        <Head />
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
            <div class="col-sm-12 col-xl-12">
              <div class="bg-secondary rounded h-100 p-4">
                <h6 class="mb-4">Driver Details</h6>
                <Link to="/truckadd">
                  <button class=" btn btn-success mb-4">Add</button>
                </Link>
                <Link to="/addDriver">
                  <button class=" btn btn-primary mb-4 ms-2">Add Drivers</button>
                </Link>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">sl.no:</th>
                      <th scope="col">Driver name</th>
                      <th scope="col">License No</th>  
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {driver.map((driver, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{driver.drivername}</td>
                          <td>{driver.driverlicense}</td>
                          

                          <td>
                            <Link to="/EditDriver" state={{ id: driver._id }}>
                              <button class="btn btn-success mx-2">Edit</button>
                            </Link>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                deleteDriver(driver._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverView;
