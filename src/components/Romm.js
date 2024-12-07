import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Check if room.imageUrls exists and has elements, otherwise use a default image
  const roomImage = (room && room.imageUrls && room.imageUrls.length > 0)
    ? room.imageUrls[0]
    : 'default-image-url.jpg';

  // Create the booking link with dates if they exist
  const bookingLink = fromDate && toDate ? `/book/${room._id}?fromDate=${fromDate}&toDate=${toDate}` : "#";

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <img src={roomImage} className="smallimg" alt={room ? room.name : 'Room'} />
        </div>
        <div className="col-md-7">
          <h3>{room ? room.name : 'Loading...'}</h3>
          <b>
            <p>Max Count: {room ? room.maxcount : 'N/A'}</p>
            <p>Phone Number: {room ? room.phonenumber : 'N/A'}</p>
            <p>Type: {room ? room.type : 'N/A'}</p>
          </b>
          <div style={{ float: 'right' }}>
            {fromDate && toDate && (
              <Link to={bookingLink}>
                <button className="btn btn-primary m-2">Book Now</button>
              </Link>
            )}
            <button className="btn btn-primary" onClick={handleShow}>
              View Details
            </button>
          </div>
        </div>

        {/* Modal for viewing details */}
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{room ? room.name : 'Room Details'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {room && room.imageUrls && room.imageUrls.length > 0 ? (
              <Carousel data-bs-theme="dark">
                {room.imageUrls.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100 bigimg" src={url} alt={`Slide ${index + 1}`} />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div>
                <img className="d-block w-100 bigimg" src={roomImage} alt="Default Room" />
                <p>No description available for this room.</p>
              </div>
            )}
            <p>{room ? room.description : 'Description not available.'}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Room;
