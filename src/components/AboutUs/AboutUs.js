import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <>
      <div className="about-us-section">
        <h2>About Us</h2>
        <Container>
          <Row>
            <Col>
              <Row>
                <h4>Contact Information</h4>
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

            <Col>
              <Row>
                <h4>Source code</h4>
              </Row>

              <Row>
                <Row className="info-label">Frontend:</Row>
                <Row className="info-value">
                  <a
                    href="https://github.com/akMalikGit/DL_app_predict_UI"
                    target="_blank"
                    rel="noopener noreferrer external"
                  >
                    github.com/akMalikGit/DL_app_predict_UI
                  </a>
                </Row>
              </Row>
              <Row>
                <Row className="info-label">Backend:</Row>
                <Row className="info-value">
                  <a
                    href="https://github.com/akMalikGit/DL_app_predict_backend"
                    target="_blank"
                    rel="noopener noreferrer external"
                  >
                    github.com/akMalikGit/DL_app_predict_backend
                  </a>
                </Row>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
