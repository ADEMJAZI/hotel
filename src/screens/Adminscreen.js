import React from 'react';
import { Link } from 'react-router-dom';

function AdminScreen() {
  return (
    <div>
      {/* Navbar */}
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

      {/* Main Content */}
      <div className="container mt-4">
        <h2>Welcome to Admin Dashboard</h2>
        <p>Select an option from the navbar to manage the system.</p>
      </div>
    </div>
  );
}

export default AdminScreen;
