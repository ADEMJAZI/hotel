import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import { Footer } from 'antd/es/layout/layout';
import Foot from './screens/Foot';


function Avew() {
  // State hooks for form data
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('');

  return (
    <div className="container-fluid p-0 mb-5">
      {/* Carousel */}
      <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* First Slide */}
          <div className="carousel-item active">
            <img
              className="w-100"
              src="./assets/img/carousel-1.jpg"
              alt="Luxury Living 1"
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: '700px' }}>
                <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                  Luxury Living
                </h6>
                <h1 className="display-3 text-white mb-4 animated slideInDown">
                  Discover A Brand Luxurious Hotel
                </h1>
                <a
                  href="#"
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Our Rooms
                </a>
                <a
                  href="#"
                  className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                >
                  Book A Room
                </a>
              </div>
            </div>
          </div>

          {/* Second Slide */}
          <div className="carousel-item">
            <img
              className="w-100"
              src="./assets/img/carousel-1.jpg"
              alt="Luxury Living 2"
            />
            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div className="p-3" style={{ maxWidth: '700px' }}>
                <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                  Luxury Living
                </h6>
                <h1 className="display-3 text-white mb-4 animated slideInDown">
                  Discover A Brand Luxurious Hotel
                </h1>
                <a
                  href="#"
                  className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                >
                  Our Rooms
                </a>
                <a
                  href="#"
                  className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                >
                  Book A Room
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


      <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h6 className="section-title text-start text-primary text-uppercase">About Us</h6>
            <h1 className="mb-4">Welcome to <span className="text-primary text-uppercase">Hotelier</span></h1>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
            </p>
            <div className="row g-3 pb-4">
              <div className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                <div className="border rounded p-1">
                  <div className="border rounded text-center p-4">
                    <i className="fa fa-hotel fa-2x text-primary mb-2"></i>
                    <h2 className="mb-1" data-toggle="counter-up">1234</h2>
                    <p className="mb-0">Rooms</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 wow fadeIn" data-wow-delay="0.3s">
                <div className="border rounded p-1">
                  <div className="border rounded text-center p-4">
                    <i className="fa fa-users-cog fa-2x text-primary mb-2"></i>
                    <h2 className="mb-1" data-toggle="counter-up">1234</h2>
                    <p className="mb-0">Staffs</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 wow fadeIn" data-wow-delay="0.5s">
                <div className="border rounded p-1">
                  <div className="border rounded text-center p-4">
                    <i className="fa fa-users fa-2x text-primary mb-2"></i>
                    <h2 className="mb-1" data-toggle="counter-up">1234</h2>
                    <p className="mb-0">Clients</p>
                  </div>
                </div>
              </div>
            </div>
            <a className="btn btn-primary py-3 px-5 mt-2" href="">Explore More</a>
          </div>
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-end">
                <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.1s" src="assets/img/about-1.jpg" style={{ marginTop: '25%' }} />
              </div>
              <div className="col-6 text-start">
                <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.3s" src="assets/img/about-2.jpg" />
              </div>
              <div className="col-6 text-end">
                <img className="img-fluid rounded w-50 wow zoomIn" data-wow-delay="0.5s" src="assets/img/about-3.jpg" />
              </div>
              <div className="col-6 text-start">
                <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.7s" src="assets/img/about-4.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HomeScreen></HomeScreen>
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title text-center text-primary text-uppercase">Our Services</h6>
          <h1 className="mb-5">Explore Our <span className="text-primary text-uppercase">Services</span></h1>
        </div>
        <div className="row g-4">
          {[
            {
              icon: "fa-hotel",
              title: "Rooms & Appartment",
              description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
              delay: "0.1s"
            },
            {
              icon: "fa-utensils",
              title: "Food & Restaurant",
              description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
              delay: "0.2s"
            },
            {
              icon: "fa-spa",
              title: "Spa & Fitness",
              description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
              delay: "0.3s"
            },
            {
              icon: "fa-swimmer",
              title: "Sports & Gaming",
              description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
              delay: "0.4s"
            },
            {
              icon: "fa-glass-cheers",
              title: "Event & Party",
              description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
              delay: "0.5s"
            },
            {
              icon: "fa-dumbbell",
              title: "GYM & Yoga",
              description: "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.",
              delay: "0.6s"
            }
          ].map((service, index) => (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={service.delay} key={index}>
              <a className="service-item rounded" href="">
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className={`fa ${service.icon} fa-2x text-primary`}></i>
                  </div>
                </div>
                <h5 className="mb-3">{service.title}</h5>
                <p className="text-body mb-0">{service.description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className='bg-light text-center p-3'><Foot></Foot></div>
    
    </div>
  );
}

export default Avew;
