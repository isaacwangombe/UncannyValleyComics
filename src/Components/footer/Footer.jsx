import React from "react";
import "./Footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../assets/UVC.png";
import { FaInstagram, FaWhatsapp, FaTiktok, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const menuItems = ["HOME", "ABOUT", "CONTACT", "TERMS OF USE"];

  const socialLinks = [
    { icon: <FaInstagram />, url: "https://www.instagram.com" },
    { icon: <FaWhatsapp />, url: "https://wa.me/254700000000" },
    { icon: <FaTiktok />, url: "https://www.tiktok.com/@yourusername" },
    { icon: <FaFacebookF />, url: "https://www.facebook.com/yourpage" },
  ];

  return (
    <div className="bg-black text-white text-center footer-height py-4">
      <Container>
        {/* ✅ Social Icons */}
        <div className="d-flex justify-content-center mb-3 gap-4 fs-3">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover-glow"
              style={{ transition: "0.3s" }}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* ✅ Logo and Title */}
        <div className="mb-3">
          <img
            src={logo}
            width="90"
            height="60"
            className="d-inline-block align-top"
            alt="Uncanny Valley Comics"
          />
          <span className="mona-sans-base fs-1 ms-2">
            Uncanny Valley Comics
          </span>
        </div>

        {/* ✅ Menu */}
        <Row className="justify-content-center p-3">
          {menuItems.map((item, index) => (
            <Col xs="auto" key={index} className="text-uppercase mx-3">
              {item}
            </Col>
          ))}
        </Row>

        {/* ✅ Footer Note */}
        <div className="mt-3 small text-secondary">© 2025 UNCANNY VALLEY</div>
      </Container>
    </div>
  );
};

export default Footer;
