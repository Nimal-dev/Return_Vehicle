import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Head from "./Head";
import { Link } from "react-router-dom";

function Truckdetailsview() {
  const [truck, setTruck] = useState([]);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    fetch("http://127.0.0.1:4000/truck/viewtruck")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTruck(result);
      });
  }, [refresh]);
  const deletetruck = (iD) => {
    let params = {
      id: iD,
    };

    fetch("http://127.0.0.1:4000/truck/deltruck", {
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
                <h6 class="mb-4">Truckdetails</h6>
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
                      <th scope="col">Truck name</th>
                      <th scope="col">License No</th>
                      <th scope="col">Vehicle No</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {truck.map((truck, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{truck.truckname}</td>
                          <td>{truck.licenseno}</td>
                          <td>{truck.vehicleno}</td>

                          <td>
                            <Link to="/truckedit" state={{ id: truck._id }}>
                              <button class="btn btn-success mx-2">Edit</button>
                            </Link>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                deletetruck(truck._id);
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

export default Truckdetailsview;
