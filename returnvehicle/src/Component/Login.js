import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    let param = {
      email: email,
      password: password,
    };
    fetch("http://localhost:4000/truck/login", {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log("data", data);
        if (data !== "invalid") {
          localStorage.setItem("userdata", JSON.stringify(data));
          window.location.href = "/";
        } else {
          console.log("error occured");
        }
      });
    });
  };

  return (
    <div className="background1">
      <div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-5">
            <div className="glassmorphic rounded p-4 p-sm-5 my-4 mx-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <a href="index.html" className="">
                  <h5 className="text-primary">RETURN VEHICLE</h5>
                </a>
                <h6>Sign In</h6>
              </div>
              <div className="form-floating mb-3">
                <input
                style={{color:'black'}}
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(event) => { setEmail(event.target.value) }}
                />
                <label style={{color:"black"}} htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                style={{color:'black'}}
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(event) => { setPassword(event.target.value) }}
                />
                <label style={{color:"black"}} htmlFor="floatingPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4" onClick={login}>Sign In</button>
              <Link to="/registration">
                <button
                  type="button"
                  className="btn btn-primary btn-sm py-2 w-100 mb-2"
                >
                  Login as truckowners
                </button>
              </Link>
              <Link to="/userregistration">
                <button
                  type="button"
                  className="btn btn-primary btn-sm py-2 w-100 mb-2"
                >
                  Login as goddowns
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
