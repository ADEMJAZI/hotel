import React, { useState, useEffect } from "react";
import "../profil.css";
import axios from "axios";
import { Link } from "react-router-dom";

function ProfileScreen() {
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch user data from localStorage or API on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
    // Alternatively, fetch from API if needed
    // axios.get('/api/user/profile').then(response => setCurrentUser(response.data));
  }, []);

  return (
     <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Admin Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
            aria-controls="adminNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/bookings">
                  Bookings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/affroom">
                  Rooms
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/rooms">
                  Add Room
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User Profile"
                        />
                      </div>
                      <h6 className="f-w-600">{currentUser ? currentUser.name : "Guest"}</h6>
                      <p>{currentUser ? "Member" : "Visitor"}</p>
                      <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">
                            {currentUser ? currentUser.email : "Loading..."}
                          </h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Name</p>
                          <h6 className="text-muted f-w-400">
                            {currentUser ? currentUser.name || "N/A" : "Loading..."}
                          </h6>
                        </div>
                      </div>
                      <div className="row">
                       
                      </div>
                      <ul className="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a href="#!" data-toggle="tooltip" title="Facebook">
                            <i className="mdi mdi-facebook feather icon-facebook facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!" data-toggle="tooltip" title="Twitter">
                            <i className="mdi mdi-twitter feather icon-twitter twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!" data-toggle="tooltip" title="Instagram">
                            <i className="mdi mdi-instagram feather icon-instagram instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
