import React from "react";
import "./Footer.css"; // Optional: For custom styling

const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section" onClick={() => onNavigate("Home")}>
          <h4>Home</h4>
        </div>
        <div className="footer-section" onClick={() => onNavigate("Groups")}>
          <h4>Groups</h4>
        </div>
        <div className="footer-section" onClick={() => onNavigate("Discovery")}>
          <h4>Discovery</h4>
        </div>
        <div className="footer-section" onClick={() => onNavigate("Leaderboard")}>
          <h4>Leaderboard</h4>
        </div>
        <div className="footer-section" onClick={() => onNavigate("Wallet")}>
          <h4>Wallet</h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;