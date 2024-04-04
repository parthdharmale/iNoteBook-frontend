import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setIsSignedUp }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match");
    } else {
      e.preventDefault();

      const response = await fetch(
        `http://localhost:5000/api/auth/createuser`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        setIsSignedUp(true);
        navigate("/");
      }
    }
  };
  const onChange = (e) => {
    console.log("Onchange");
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="email" className="form-label">
            What should we call you?
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            value={credentials.name}
            name="name"
            autoComplete="username"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            autoComplete="username"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            autoComplete="new-password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            autoComplete="new-password"
            value={credentials.confirmPassword}
            onChange={onChange}
            id="confirmPassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link
          className="btn btn-outline-success mx-2"
          to="/login"
          role="button"
        >
          Already have an account? Log In instead!
        </Link>
      </form>
    </div>
  );
};

export default Signup;
