import React from "react";

function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <div className="container-fluid bg-dark px-0">
      <div className="row gx-0">
        {/* Sidebar Section */}
        <div className="col-lg-3 bg-dark d-none d-lg-block">
          <a
            href="/home"
            className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
          >
            <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
          </a>
        </div>

        {/* Topbar Section */}
        <div className="col-lg-9">
          <div className="row gx-0 bg-white d-none d-lg-flex">
            <div className="col-lg-7 px-5 text-start">
              <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                <i className="fa fa-envelope text-primary me-2"></i>
                <p className="mb-0">
                  <b>ademjazi472@gmail.com 😒</b>
                </p>
              </div>
              <div className="h-100 d-inline-flex align-items-center py-2">
                <i className="fa fa-phone-alt text-primary me-2"></i>
                <p className="mb-0">
                  <b>+216 24871233 😁👍</b>{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-5 px-5 text-end">
              <div className="d-inline-flex align-items-center py-2">
                <a className="me-3" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="me-3" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="me-3" href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a className="me-3" href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a className="" href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Main Navbar Section */}
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
            <a href="/plan" className="navbar-brand d-block d-lg-none">
              <h1 className="m-0 text-primary text-uppercase">Gestion Hotel</h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto py-0">
                <a href="/plan" className="nav-item nav-link active">
                  Home
                </a>
                <a href="/about" className="nav-item nav-link">
                  About
                </a>
                <a href="/contact" className="nav-item nav-link">
                  Contact
                </a>
                <a href="/tean" className="nav-item nav-link">
                  Tean
                </a>
              </div>

              {/* Current User Section */}
              {currentUser ? (
                <div className="navbar-nav ml-auto py-0">
                  <div className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-user me-2"></i>
                      {currentUser.name}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="/profil">
                          Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/booking">
                          Booking
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            logout();
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="navbar-nav ml-auto py-0">
                  <a href="/register" className="nav-item nav-link">
                    Register
                  </a>
                  <a href="/login" className="nav-item nav-link">
                    Login
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
