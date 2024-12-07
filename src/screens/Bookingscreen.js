import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { Modal } from "antd";  // Import Modal from Ant Design

function BookingScreen() {
  const { roomid } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);  // State to control modal visibility
  const [paymentId, setPaymentId] = useState(null);  // State for the payment ID

  const queryParams = new URLSearchParams(location.search);
  const fromDate = queryParams.get("fromDate");
  const toDate = queryParams.get("toDate");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("http://localhost:5000/api/rooms/getroombyid", { roomid });
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };

    fetchRoomDetails();
  }, [roomid]);

  if (loading) {
    return <Loader />;
  }

  if (error || !room) {
    return <Error message="Failed to fetch room details" />;
  }

  const totalDays = moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"), "days") + 1;
  const totalAmount = (totalDays * (room.rentperday || 0)).toFixed(2);

  const roomImage = room.imageurls && room.imageurls.length > 0 ? room.imageurls[0] : 'default-image-url.jpg';

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  function bookRoom(paymentId) {
    const bookingData = {
      room: room.name,
      roomid: room._id,
      userid: currentUser?._id,
      fromdate: fromDate,
      todate: toDate,
      totalamount: parseFloat(totalAmount),
      totaldays: totalDays,
      paymentId,  // From Stripe or your payment system
      trysectionid: "defaultTrySectionId"
    };

    console.log("Booking Data Sent:", bookingData);

    axios
      .post("http://localhost:5000/api/bookings", bookingData)
      .then((response) => {
        console.log("Booking successful:", response.data);
        setIsModalVisible(false);  // Close the modal on success
      })
      .catch((error) => {
        console.error("Error during booking:", error.response ? error.response.data : error.message);
      });
  }

  // Function to show the payment modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal closing
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle payment process (this would be linked to your payment system)
  const handlePayment = () => {
    const generatedPaymentId = "samplePaymentIdFromStripe";  // Replace with real payment ID
    setPaymentId(generatedPaymentId);
    bookRoom(generatedPaymentId);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 col-sm-12">
          <h2 className="text-primary mb-4">{room.name}</h2>
          <img
            src={roomImage}
            alt="Room"
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <div
            className="p-4 mb-4"
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 className="text-secondary">Booking Details</h3>
            <hr />
            <p>
              <strong>Name:</strong> {currentUser ? currentUser.name : "Guest"}
            </p>
            <p>
              <strong>From Date:</strong>{" "}
              {moment(fromDate).format("DD-MM-YYYY")}
            </p>
            <p>
              <strong>To Date:</strong>{" "}
              {moment(toDate).format("DD-MM-YYYY")}
            </p>
            <p>
              <strong>Max Occupancy:</strong> {room.maxcount}
            </p>
          </div>

          <div
            className="p-4"
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 className="text-secondary">Amount Details</h3>
            <hr />
            <p>
              <strong>Total Days:</strong> {totalDays}
            </p>
            <p>
              <strong>Rent Per Day:</strong> ${room.rentperday}
            </p>
            <p>
              <strong>Total Amount:</strong> ${totalAmount}
            </p>
          </div>

          <div className="text-end mt-4">
            <button
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: "#007bff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
              onClick={showModal}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        title="Payment Confirmation"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <button
            className="btn btn-danger"
            onClick={handleCancel}
          >
            Cancel
          </button>,
          <button
            className="btn btn-primary"
            onClick={handlePayment}
          >
            Confirm Payment
          </button>,
        ]}
      >
        <p>
          Are you sure you want to proceed with the payment of ${totalAmount} for this room booking?
        </p>
      </Modal>
    </div>
  );
}

export default BookingScreen;
