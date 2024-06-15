import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Head from "../Component/Head";
import Sidebar from "../Component/Sidebar";

function TruckSheduleEdit() {
    const [authenticated, setAuthenticated] = useState(
        JSON.parse(localStorage.getItem("userdata"))
    );
    const [trucks, setTrucks] = useState([]);
    const [truckname, setTruckname] = useState("");
    const [locationfrom, setLocationfrom] = useState("");
    const [locationto, setLocationto] = useState("");
    const [startingtym, setStartingtym] = useState("");
    const [endtym, setEndtym] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let param = { id: location.state.id };
        fetch("http://localhost:4000/truck/getschedule", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(param),
        })
            .then((res) => res.json())
            .then((result) => {
                setTruckname(result.truckname._id); // Assuming truckname is an object
                setLocationfrom(result.locationfrom);
                setLocationto(result.locationto);
                setStartingtym(result.startingtym);
                setEndtym(result.endtym);
                console.log("Schedule details fetched:", result);
            })
            .catch((error) => console.error('Error fetching schedule details:', error));
    }, [location.state.id]);

    useEffect(() => {
        fetch('http://localhost:4000/truck/viewtruck')
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setTrucks(result);
            })
            .catch((error) => console.error('Error fetching trucks:', error));
    }, []);

    const save = () => {
        let params = {
            id: location.state.id,
            truckname: truckname,
            locationfrom: locationfrom,
            locationto: locationto,
            startingtym: startingtym,
            endtym: endtym,
            truckownerid: authenticated._id
        };
        fetch("http://localhost:4000/truck/updateschedule", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                navigate("/scheduleview");
            })
            .catch((error) => console.error('Error updating schedule:', error));
    };

    return (
        <>
            <Sidebar />
            <div className="content">
                <Head />
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-10">
                            <div className="bg-secondary rounded h-100 p-4">
                                <h6 className="mb-4">Truck Schedule Edit</h6>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="truckname" className="form-label">Truck name</label>
                                        <select
                                            className="form-select mb-3"
                                            aria-label="Default select example"
                                            value={truckname}
                                            onChange={(event) => setTruckname(event.target.value)}
                                        >
                                            <option selected>Select Truck</option>
                                            {trucks.map((truck) => (
                                                <option key={truck._id} value={truck._id}>{truck.truckname}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="locationfrom" className="form-label">Location from</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="locationfrom"
                                            value={locationfrom}
                                            onChange={(event) => setLocationfrom(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="locationto" className="form-label">Location to</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="locationto"
                                            value={locationto}
                                            onChange={(event) => setLocationto(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="startingtym" className="form-label">Starting time</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="startingtym"
                                            value={startingtym}
                                            onChange={(event) => setStartingtym(event.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="endtym" className="form-label">Ending time</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="endtym"
                                            value={endtym}
                                            onChange={(event) => setEndtym(event.target.value)}
                                        />
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={save}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TruckSheduleEdit;
