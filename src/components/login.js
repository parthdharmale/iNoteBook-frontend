import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsSignedUp }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // const [password, setPassword] = useState("")

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch("http://localhost:5000/api/auth/login")

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the authtoken and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userName", json.name);

      setIsSignedUp(true);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    console.log("Onchange");
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            id="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link
          className="btn btn-outline-success mx-2"
          to="/signup"
          role="button"
        >
          New? Sign Up instead
        </Link>
      </form>
    </div>
  );
};

export default Login;
