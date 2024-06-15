import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
    <div class="container-fluid">
    <div class="row h-100 align-items-center justify-content-center" style={{minHeight: '100vh'}}>
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div class="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <a href="index.html" class="">
                        <h5 class="text-primary">RETURN VEHICLE</h5>
                    </a>
                    <h6>Sign In</h6>
                </div>
                <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(event)=>{setEmail(event.target.value)}}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-4">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(event)=>{setPassword(event.target.value)}}
              />
              <label for="floatingPassword">Password</label>
            </div>
              
                <button type="submit" class="btn btn-primary py-3 w-100 mb-4" onClick={login}>Sign In</button>
                <Link to="/registration">
              <button
                type="button"
                class="btn btn-primary btn-sm py-2 w-100 mb-2"
              >
                Login as truckowners
              </button>
            </Link>
            <Link to="/userregistration">
              <button
                type="button"
                class="btn btn-primary btn-sm py-2 w-100 mb-2"
              >
                Login as goddowns
              </button>
              </Link>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login