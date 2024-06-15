import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Component/Login';
import Truckdetailsview from './Component/Truckdetailsview';
import Truckdetails from './Component/Truckdetails';
import Truckedit from './Component/Truckedit';
import Registration from './Component/Registration';
import Userregistration from './Goddown/Userregistration';
import { useState } from 'react';
import Truckshedule from './TruckShedule/Truckshedule';
import Truckscheduleview from './TruckShedule/Truckscheduleview';
import TruckSheduleEdit from './TruckShedule/TruckSheduleEdit';
import Truckview from './Component/Truckview';
import TruckGod from './Goddown/TruckGod';
import AddDriver from './Component/AddDriver';
import DriverView from './Component/DriverView';
import EditDriver from './Component/EditDriver';

function App() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  console.log("authenticated:", authenticated);

  return (
    <BrowserRouter>
      {authenticated == null ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/userregistration" element={<Userregistration />} />
        </Routes>
      ) : authenticated.userstatus === 0 ? (
        <Routes>
          <Route path="/" element={<Truckview />} />
        </Routes>
      ) : authenticated.userstatus === 1 ? (
        <Routes>
          <Route path="/" element={<Truckdetailsview />} />
          <Route path="/truckadd" element={<Truckdetails />} />
          <Route path="/truckedit" element={<Truckedit />} />
          <Route path="/addDriver" element={<AddDriver />} />
          <Route path="/truckview" element={<Truckdetailsview/>} />
          <Route path="/schedule" element={<Truckshedule/>} />
          <Route path="/scheduleview" element={<Truckscheduleview/>} />
          <Route path="/driverview" element={<DriverView/>} />
          <Route path="/scheduleedit" element={<TruckSheduleEdit/>} />
          <Route path="/EditDriver" element={<EditDriver />} />
          {/* <Route path="/truckview" element={<Truckdetailsview/>} />
          <Route path="/truckview" element={<Truckdetailsview/>} /> */}
        </Routes>
      ) : authenticated.userstatus === 2 ? (
        <Routes>
           <Route path="/" element={<TruckGod/>} />
          {/* Define routes for userstatus 2 */}
        </Routes>
      ) : (
        <Routes>
          {/* Define default routes */}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
