import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [activePage, setActivePage] = useState("");
  const location = useLocation();
  let navigate = useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  useEffect(() => {
    // Extract the pathname from the location object
    const pathname = location.pathname;
    // Set the active page based on the pathname
    setActivePage(pathname);
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-outline-success mx-2"
                  to="/login"
                  role="button"
                >
                  Log In
                </Link>
                <Link
                  className="btn btn-outline-success mxx-2"
                  to="/signup"
                  role="button"
                >
                  Sign Up
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary" onClick={handleLogOut}> Log Out </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
