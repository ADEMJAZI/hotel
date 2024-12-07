import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function RoomPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/rooms/getAllRooms"
        );
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
        setError("Failed to load rooms.");
      }
    }
    fetchRooms();
  }, []);

  const handleModify = (roomId) => {
    const room = rooms.find((r) => r._id === roomId);
    setCurrentRoom(room);
    setModalData(room);
    setShowModal(true);
  };

  const handleDelete = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        axios
          .delete(`http://localhost:5000/api/rooms/${roomId}`)
          .then((response) => console.log("Room deleted:", response.data))
          .catch((error) => console.error("Error deleting room:", error));

        setRooms(rooms.filter((room) => room._id !== roomId));
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Failed to delete the room.");
      }
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData({
      ...modalData,
      [name]: value,
    });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use currentRoom._id as the room ID for updating
      const roomId = currentRoom._id;
  
      // Make the PUT request with updated data
      const response = await axios.put(
        `http://localhost:5000/api/rooms/${roomId}`,
        modalData
      );
  
      // Update the state with the response data
      const updatedRooms = rooms.map((room) =>
        room._id === roomId ? response.data : room
      );
      setRooms(updatedRooms);
  
      // Close the modal after the update
      setShowModal(false);
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Failed to update the room.");
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
      <div className="container mt-4">
        <h1>All Rooms</h1>
        {loading && <p>Loading rooms...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && rooms.length === 0 && <p>No rooms available.</p>}

        {!loading && rooms.length > 0 && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Max Count</th>
                <th>Phone Number</th>
                <th>Rent Per Day</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.name}</td>
                  <td>{room.maxCount}</td>
                  <td>{room.phoneNumber}</td>
                  <td>{room.rentPerDay}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleModify(room._id)}
                    >
                      Modify
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(room._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal */}
        {showModal && (
          <div
            className="modal show"
            style={{ display: "block" }}
            aria-labelledby="exampleModalLabel"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Room
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleModalSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={modalData.name || ""}
                        onChange={handleModalChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="maxCount" className="form-label">
                        Max Count
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="maxCount"
                        name="maxCount"
                        value={modalData.maxCount || ""}
                        onChange={handleModalChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={modalData.phoneNumber || ""}
                        onChange={handleModalChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="rentPerDay" className="form-label">
                        Rent Per Day
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="rentPerDay"
                        name="rentPerDay"
                        value={modalData.rentPerDay || ""}
                        onChange={handleModalChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomPage;
