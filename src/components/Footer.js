import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="black-bg py-2 text-light">
      <div className="footer-container">
        <p>&copy; Copyright {date.getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
