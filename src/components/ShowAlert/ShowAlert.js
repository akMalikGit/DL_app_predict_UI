import React from "react";
import { Alert, Modal } from "react-bootstrap";
import "./ShowAlert.css";

export default function ShowAlert({
  alertVariant,
  alertTitle,
  alertMessage,
  setIsShowAlert,
}) {
  return (
    <div className="alert-overlay">
      <Alert
        variant={alertVariant}
        onClose={() => setIsShowAlert(false)}
        dismissible
      >
        <h3>Alert!</h3>
        <p>
          <b>{alertTitle}</b>
        </p>
        <p>{alertMessage}</p>
      </Alert>
    </div>
  );
}
