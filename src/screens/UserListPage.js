import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

export function UserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:5000/api/users/getAllUsers");
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
                setError("Failed to load users.");
            }
        }
        fetchUsers();
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
            <h1>All Users</h1>
            {loading && <p>Loading users...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && users.length === 0 && <p>No users available.</p>}
            
            {!loading && users.length > 0 && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
}

export default UserPage;
