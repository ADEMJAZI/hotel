import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings/getallbookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        setError("Failed to fetch bookings.");
      }
    }

    fetchBookings();
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
    <div className="container mt-4">
      <h1 className="text-center">Bookings</h1>

      {/* Show loader */}
      {loading && <Loader />}

      {/* Show error message */}
      {error && <p className="text-danger">{error}</p>}

      {/* Display total bookings */}
      {!loading && bookings.length > 0 && (
        <h4 className="text-center">There are a total of {bookings.length} bookings</h4>
      )}

      {/* Display table of bookings */}
      {!loading && bookings.length > 0 && (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Room Name</th>
              <th>Room ID</th>
              <th>User ID</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Total Days</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.room}</td>
                <td>{booking.roomid}</td>
                <td>{booking.userid}</td>
                <td>{new Date(booking.fromdate).toLocaleDateString()}</td>
                <td>{new Date(booking.todate).toLocaleDateString()}</td>
                <td>{booking.totaldays}</td>
                <td>${booking.totalamount.toFixed(2)}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Display message if no bookings are found */}
      {!loading && bookings.length === 0 && (
        <p className="text-center">No bookings available.</p>
      )}
    </div>
    </div>
  );
}

export default AdminBooking;
