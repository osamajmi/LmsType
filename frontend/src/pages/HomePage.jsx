import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            LMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Register">
                      Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-light text-center py-5">
        <div className="container">
          <h1>Welcome to LMS</h1>
          <p className="lead">
            A Complete Learning Management System for Students & Admins
          </p>
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center p-3">
              <i className="bi bi-book display-4 text-primary"></i>
              <h4>Learn Anytime</h4>
              <p>Access courses and study materials 24/7.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-3">
              <i className="bi bi-person-check display-4 text-primary"></i>
              <h4>Admin Control</h4>
              <p>Admins can manage courses and users efficiently.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-3">
              <i className="bi bi-camera-video display-4 text-primary"></i>
              <h4>Video Lessons</h4>
              <p>Learn through high-quality video content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3">
        <p>© 2025 LMS | All Rights Reserved</p>
      </footer>
    </div>
    );
}

export default HomePage;
