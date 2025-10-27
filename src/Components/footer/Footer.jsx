import React from "react";
import "./Footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/UVC.png";

const Footer = () => {
  const menuItems = ["HOME", "ABOUT", "CONTACT", "TERMS OF USE"];
  return (
    <div className="bg-black footer-height">
      <Container className="footer-container">
        <div className="">
          <img
            src={logo}
            width="90"
            height="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <span className="mona-sans-base fs-1 ">Uncanny Valley Comics</span>
        </div>
        <div className="footer-container">
          <Row className=" p-3">
            {menuItems.map((item, index) => (
              <Col s={4} md={2} lg={2} key={index} className="m-3 w-2">
                {item}
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <div className="">© 2025 UNCANNY VALLEY</div>
    </div>
  );
};

export default Footer;
