import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import ColumnSelectionForm from "../ColumnSelectionForm/ColumnSelectionForm";
import UserInputForm from "../UserInputForm/UserInputForm";
import "./UserModal.css";

export default function UserModal({
  isModalVisible,
  setIsModalVisible,
  totalColumns,
}) {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [targetColumn, setTargetColumn] = useState("");
  const [learningRate, setLearningRate] = useState(0.001);
  const [isCategorical, setIsCategorical] = useState(true);
  const [isColSelForm, setIsColumnSelForm] = useState(true);
  const [selectedValuesUq, setSelectedValueUq] = useState(null);
  const [triggerColSelFormSubmit, setTriggerColSelFormSubmit] = useState(false);
  const [triggerUserInFormSubmit, setTriggerUserInFormSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleColSelFormSubmit = () => {
    setTriggerColSelFormSubmit(true);
    setIsLoading(true);
  };
  const handleUserInFormSubmit = () => {
    setTriggerUserInFormSubmit(true);
    setIsLoading(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedColumns([]);
    setTargetColumn("");
    setLearningRate(0.001);
    setIsColumnSelForm(true);
    setIsLoading(false);
    setIsCategorical(true);
  };

  return (
    <div>
      <>
        <Modal
          show={isModalVisible}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          className="custom-modal"
        >
          <Modal.Header closeButton className="modal-header-custom">
            <Modal.Title>Predict Value From Data</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-custom">
            {isColSelForm ? (
              <ColumnSelectionForm
                selectedColumns={selectedColumns}
                targetColumn={targetColumn}
                learningRate={learningRate}
                isCategorical={isCategorical}
                setIsCategorical={setIsCategorical}
                totalColumns={totalColumns}
                setSelectedColumns={setSelectedColumns}
                setTargetColumn={setTargetColumn}
                setLearningRate={setLearningRate}
                triggerColSelFormSubmit={triggerColSelFormSubmit}
                setTriggerColSelFormSubmit={setTriggerColSelFormSubmit}
                setIsColumnSelForm={setIsColumnSelForm}
                setSelectedValueUq={setSelectedValueUq}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ) : (
              <UserInputForm
                selectedColumns={selectedColumns}
                targetColumn={targetColumn}
                triggerUserInFormSubmit={triggerUserInFormSubmit}
                setTriggerUserInFormSubmit={setTriggerUserInFormSubmit}
                selectedValuesUq={selectedValuesUq}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleClose}>
              Close
            </Button>

            {isColSelForm ? (
              <>
                <Button
                  variant="success"
                  onClick={handleColSelFormSubmit}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      variant="primary"
                    />
                  )}
                  Submit
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-warning"
                  onClick={() => {
                    setIsColumnSelForm(true);
                  }}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  variant="success"
                  onClick={handleUserInFormSubmit}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      variant="primary"
                    />
                  )}
                  Submit
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
