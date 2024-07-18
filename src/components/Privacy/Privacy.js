import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Privacy() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        View Privacy Policy
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Privacy Policy</h1>
          <p>Effective Date: 16 JUL 2024</p>
          <h2>1. Introduction</h2>
          <p>
            Welcome to 'Predict from data' (the "Application"). We are committed
            to protecting your privacy and ensuring the security of the data you
            provide. This Privacy Policy outlines the types of information we
            collect, how we use it, and the measures we take to protect it.
          </p>
          <h2>2. Information We Collect</h2>
          <h3>a. Session Information</h3>
          <p>
            We collect session information to manage and track your activity on
            the Application. This information may include the pages you visit,
            the actions you take, and the time you spend on the App. We use
            cookies and similar technologies that help us recognize you during
            your visit.
          </p>
          <h3>b. Uploaded Files</h3>
          <p>
            When you upload CSV or Excel files for processing, these files are
            stored on our server or in a database. These files may contain
            personal information attached to the data, but we do not explicitly
            extract or store any personal information for our own purposes.
          </p>
          <h2>3. How We Use Your Information</h2>
          <h3>a. Session Management</h3>
          <p>
            Session information is used to maintain your activity within the
            Application, ensuring a smooth and personalized experience.
          </p>
          <h3>b. Data Processing</h3>
          <p>
            Uploaded files are used solely for the purpose of providing you with
            predictions and other services offered by the Application. We do not
            use your data for any other purposes.
          </p>
          <h2>4. Data Storage and Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information when you enter, submit, or access your
            personal information.
          </p>
          <h3>a. Data Retention</h3>
          <p>
            Uploaded files and session information are stored on our servers or
            in our databases. We retain this information for as long as
            necessary to provide you with the services and as required for our
            business operations.
          </p>
          <h3>b. Data Deletion</h3>
          <p>
            While there is currently no option to delete files directly from the
            UI, you can request the deletion of specific files by emailing us at
            akshaymalikmazra@gmail.com. Please provide details of the file you
            wish to delete, which we will supply upon your request. We will
            promptly delete the specified files from our server.
          </p>
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, and request the deletion of
            your data. To exercise these rights, please contact us at
            akshaymalikmazra@gmail.com.
          </p>
          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and the effective date will be updated
            accordingly. We encourage you to review this Privacy Policy
            periodically to stay informed about how we are protecting your
            information.
          </p>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at:
          </p>
          <p>akshaymalikmazra@gmail.com</p>
          <h2>8. Consent</h2>
          <p>By using our Application, you consent to our Privacy Policy.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
