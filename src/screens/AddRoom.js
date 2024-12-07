import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function AddRoom() {
  const [roomData, setRoomData] = useState({
    name: "",
    maxCount: "",
    phoneNumber: "",
    rentPerDay: "",
    imageUrls: [],
    type: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is `imageUrls`, split the value by commas and store it as an array
    if (name === "imageUrls") {
      setRoomData({
        ...roomData,
        [name]: value.split(',').map(url => url.trim())
      });
    } else {
      setRoomData({
        ...roomData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/rooms/addRoom", roomData);
      setMessage("Room added successfully!");
      setRoomData({
        name: "",
        maxCount: "",
        phoneNumber: "",
        rentPerDay: "",
        imageUrls: [],
        type: "",
        description: ""
      });
    } catch (error) {
      console.error("Error adding room:", error);
      setMessage("Failed to add room.");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Add New Room</h5>
          </div>
          <div className="card-body">
            {loading && <div className="text-center"><div className="spinner-border text-primary" role="status"></div></div>}
            {message && <div className="alert alert-info" role="alert">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Room Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={roomData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="maxCount" className="form-label">Max Count</label>
                <input
                  type="number"
                  className="form-control"
                  id="maxCount"
                  name="maxCount"
                  value={roomData.maxCount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={roomData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rentPerDay" className="form-label">Rent Per Day</label>
                <input
                  type="number"
                  className="form-control"
                  id="rentPerDay"
                  name="rentPerDay"
                  value={roomData.rentPerDay}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imageUrls" className="form-label">Image URLs (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrls"
                  name="imageUrls"
                  value={roomData.imageUrls.join(', ')}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  value={roomData.type}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={roomData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Add Room</button>
            </form>
          </div>
        </div>

        {/* Display image previews */}
        {roomData.imageUrls.length > 0 && (
          <div className="mt-4">
            <h4>Uploaded Images</h4>
            <div className="d-flex flex-wrap">
              {roomData.imageUrls.map((url, index) => (
                <div key={index} className="m-2">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRoom;
