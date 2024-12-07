import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";


function BookScreen() {
  const [bookedRooms, setBookedRooms] = useState([]); // State for booked rooms
  const [currentUser, setCurrentUser] = useState(null); // State for the current user
  const [error, setError] = useState(null); // State for errors

  // Fetch user and booked rooms on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser")); // Get logged-in user from localStorage
    setCurrentUser(user);

    if (user && user.id) {
      fetchBookedRooms(user.id); // Fetch rooms booked by this user
    }
  }, []);

  // Fetch booked rooms from the server for the logged-in user
  const fetchBookedRooms = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bookedRooms`); // Fetch all booked rooms
      // Filter rooms for the logged-in user
      const userBookings = response.data.filter((booking) => booking.userid === userId); 
      setBookedRooms(userBookings); // Set the filtered rooms
    } catch (error) {
      console.error("Error fetching booked rooms:", error);
      setError("Failed to load booked rooms. Please try again later.");
    }
  };

  // Handle the deletion of a booked room
  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookedRooms/${roomId}`); // API call to delete the room
      // Update state by filtering out the deleted room
      setBookedRooms(bookedRooms.filter((room) => room._id !== roomId)); 
    } catch (error) {
      console.error("Error deleting booked room:", error);
      setError("Failed to delete the room. Please try again later.");
    }
  };

  return (
    <div>
    <div className="container mt-4">
      <h2 className="text-center">Your Booked Rooms</h2>
      {currentUser ? (
        <div className="text-center mb-4">
          <h5>Welcome, {currentUser.name}</h5>
        </div>
      ) : (
        <p className="text-danger">You are not logged in.</p>
      )}

      {error && <p className="text-danger">{error}</p>}

      {bookedRooms.length > 0 ? (
        <div className="row">
          {bookedRooms.map((room) => (
            <div className="col-md-6" key={room._id}> {/* Use _id as unique key */}
              <div className="card mb-4">
                <div className="card-header text-white bg-primary">
                  Room Name: {room.room} {/* Ensure correct field for room name */}
                </div>
                <div className="card-body">
                  <p><strong>Location:</strong> {room.location || "N/A"}</p> {/* Optional fields handled */}
                  <p><strong>Price:</strong> ${room.price || "N/A"}</p>
                  <p><strong>Booking Date:</strong> {moment(room.bookingDate).format("MMMM Do YYYY, h:mm a")}</p>
                  <p><strong>Status:</strong> {room.status}</p>
                  <p><strong>Guests:</strong> {room.guests || "N/A"}</p>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(room._id)} // Use _id for deletion
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No rooms booked yet.</p>
      )}
    </div>
    </div>
  );
}

export default BookScreen;
