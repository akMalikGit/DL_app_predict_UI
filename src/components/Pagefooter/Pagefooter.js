import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Privacy from "../Privacy/Privacy";
import "./Pagefooter.css";

export default function Pagefooter() {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-4">
          <Col md={4} className="contact-details">
            <h5>Contact Details</h5>
            <p>
              Email:{" "}
              <a href="mailto:akshaymalikmazra@gmail.com">
                akshaymalikmazra@gmail.com
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/akshay-malik-b02379153/"
                target="_blank"
                rel="noopener noreferrer external"
              >
                akshay-malik-b02379153
              </a>
            </p>
          </Col>

          <Col md={4} className="source-code">
            <h5>Source code</h5>

            <p>
              Frontend:{" "}
              <a
                href="https://github.com/akMalikGit/DL_app_predict_UI"
                target="_blank"
                rel="noopener noreferrer external"
              >
                github.com/akMalikGit/DL_app_predict_UI
              </a>
            </p>

            <p>
              Backend:{" "}
              <a
                href="https://github.com/akMalikGit/DL_app_predict_backend"
                target="_blank"
                rel="noopener noreferrer external"
              >
                github.com/akMalikGit/DL_app_predict_backend
              </a>
            </p>
          </Col>

          <Col md={4} className="privacy-policy">
            <h5>Privacy Policy</h5>
            <Privacy />
          </Col>
        </Row>

        <Row>
          <h5>Note</h5>
          <ListGroup>
            <ListGroup.Item>
              Supported file extensions: csv, xlsx, xlsm, xls
            </ListGroup.Item>
            <ListGroup.Item>
              This application may make mistakes; please use it responsibly.
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Container>
    </footer>
  );
}
