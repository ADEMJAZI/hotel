import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  async function loginform(e) {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const result = (await axios.post("http://localhost:5000/api/users/login", user)).data;

      // Store user data in localStorage
      localStorage.setItem("currentUser", JSON.stringify(result));

      // Redirect based on user type
      if (result.isadmin === true) {
        setAlert({ message: "Admin login successful!", type: "success" });
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        setAlert({ message: "Login successful!", type: "success" });
        setTimeout(() => {
          navigate("/plan");
        }, 1000);
      }
    } catch (error) {
      setAlert({ message: "Login failed. Please check your credentials.", type: "danger" });
      console.error(error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "28rem" }}>
        <div className="card-body">
          <h3 className="text-center text-primary mb-4">Welcome Back!</h3>

          {alert.message && (
            <div className={`alert alert-${alert.type} text-center`} role="alert">
              {alert.message}
            </div>
          )}

          <form onSubmit={loginform}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <a href="#" className="text-decoration-none">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <hr className="my-4" />

          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-primary me-2">
              <i className="bi bi-facebook"></i> Facebook
            </button>
            <button className="btn btn-outline-danger me-2">
              <i className="bi bi-google"></i> Google
            </button>
            <button className="btn btn-outline-info">
              <i className="bi bi-twitter"></i> Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
