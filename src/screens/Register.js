import axios from "axios";
import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  async function registerform(event) {
    event.preventDefault();

    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
      };

      try {
        const result = (await axios.post("http://localhost:5000/api/users/register", user)).data;
        console.log(result);
        setAlert({ message: "User registered successfully!", type: "success" });
      } catch (error) {
        setAlert({ message: "Registration failed. Please try again.", type: "danger" });
      }
    } else {
      setAlert({ message: "Passwords do not match!", type: "danger" });
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "28rem" }}>
        <div className="card-body">
          <h3 className="text-center text-primary mb-4">Create Your Account</h3>

          {/* Alert Message */}
          {alert.message && (
            <div className={`alert alert-${alert.type} text-center`} role="alert">
              {alert.message}
            </div>
          )}

          <form onSubmit={registerform}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                className="form-control"
                placeholder="Confirm your password"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <hr className="my-4" />

          <p className="text-center mb-0">
            Already have an account?{" "}
            <a href="/login" className="text-primary text-decoration-none">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
