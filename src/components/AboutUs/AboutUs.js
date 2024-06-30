import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <>
      <div className="about-us-section">
        <h2>About Us</h2>
        <Container>
          <Col>
            <Row>
              <h4>Contact Information</h4>
            </Row>
            <Row>
              <Row className="info-label">Name:</Row>
              <Row className="info-value">Akshay Malik</Row>
            </Row>
            <Row>
              <Row className="info-label">Email:</Row>
              <Row className="info-value">
                <a href="mailto:akshaymalikmazra@gmail.com">
                  akshaymalikmazra@gmail.com
                </a>
              </Row>
            </Row>
            <Row>
              <Row className="info-label">LinkedIn:</Row>
              <Row className="info-value">
                <a
                  href="https://www.linkedin.com/in/akshay-malik-b02379153/"
                  target="_blank"
                  rel="noopener noreferrer external"
                >
                  linkedin.com/in/akshay-malik-b02379153/
                </a>
              </Row>
            </Row>
          </Col>
        </Container>
      </div>
    </>
  );
}
