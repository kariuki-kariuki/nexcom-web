import React from "react";
import './BusinessCard.css';
export const BusinessCard = () => {
  return (
    <div className="card-container">
      <div className="business-card">
        <div className="profile-pic">
          <span className="initials">JD</span>
        </div>
        <div className="card-details">
          <h2 className="name">John Doe</h2>
          <p className="title">Fashion Designer</p>
          <p className="contact">john.doe@example.com</p>
          <p className="contact">+123 456 7890</p>
        </div>
        <div className="social-links">
          <a href="#" className="social-link twitter">Twitter</a>
          <a href="#" className="social-link linkedin">LinkedIn</a>
          <a href="#" className="social-link github">GitHub</a>
        </div>
      </div>
    </div>
  );
};
