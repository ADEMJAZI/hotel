import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Romm";
import "antd/dist/reset.css";
import Loader from "../components/Loader";
import Error from "../components/Error";
import "../Home.css";

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [roomName, setRoomName] = useState(""); // For searching by name
  const [roomType, setRoomType] = useState(""); // For filtering by type
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Fetch rooms data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/rooms/getAllRooms"
        );
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching rooms");
        setLoading(false);
        console.error("Error fetching rooms:", error);
      }
    };
    fetchData();
  }, []);

  // Filter rooms based on multiple criteria
  const filterRooms = () => {
    let filtered = rooms;

    // Filter by availability
    if (fromDate && toDate) {
      filtered = filtered.filter((room) => {
        return room.currentBookings.every((booking) => {
          const bookingFromDate = new Date(booking.fromdate);
          const bookingToDate = new Date(booking.todate);
          const selectedFromDate = new Date(fromDate);
          const selectedToDate = new Date(toDate);

          return (
            selectedToDate <= bookingFromDate ||
            selectedFromDate >= bookingToDate
          );
        });
      });
    }

    // Filter by room name
    if (roomName) {
      filtered = filtered.filter((room) =>
        room.name.toLowerCase().includes(roomName.toLowerCase())
      );
    }

    // Filter by room type
    if (roomType) {
      filtered = filtered.filter((room) => room.type === roomType);
    }

    setFilteredRooms(filtered);
  };

  // Trigger filtering whenever criteria change
  useEffect(() => {
    filterRooms();
  }, [fromDate, toDate, roomName, roomType, rooms]);

  return (
    
    <div className="container">
     <div className="container-fluid booking pb-5 wow fadeIn" data-wow-delay="0.1s">
  <div className="container">
    <div className="bg-white shadow" style={{ padding: '35px' }}>
      <div className="row g-2">
        {/* Date Input for Check-in */}
        <div className="col-md-3">
          <div className="date" id="date1" data-target-input="nearest">
            <input
              type="date"
              className="form-control datetimepicker-input"
              placeholder="Check in"
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
        </div>
        {/* Date Input for Check-out */}
        <div className="col-md-3">
          <div className="date" id="date2" data-target-input="nearest">
            <input
              type="date"
              className="form-control datetimepicker-input"
              placeholder="Check out"
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        {/* Search by Name */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        {/* Room Type Selector */}
        <div className="col-md-3">
          <select
            className="form-select"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="single">Delux</option>
            <option value="double">Non-Delux</option>
          </select>
        </div>
        {/* Submit Button */}
      </div>
    </div>
  </div>
</div>

      <div className="room-grid">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error message={error} />
        ) : (
          (filteredRooms.length > 0 ? filteredRooms : rooms).map((room) => (
            <div className="room-card" key={room._id}>
              <Room room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
