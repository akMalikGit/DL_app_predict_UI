import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModelBodyForm from "./ModelBodyForm";
import ModelBodyReview from "./ModelBodyReview";
import axios from "axios";

axios.defaults.withCredentials = true;

function ColumnSelectionForm({ setColSelFormFalse, totalColumns }) {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [targetColumn, setTargetColumn] = useState("");
  const [learningRate, setLearningRate] = useState(0.001);
  const [isFooterVisible, setFooterVisible] = useState(false);

  const changeFooterVisible = () => {
    setFooterVisible(!isFooterVisible);
  };

  const submitModelTrain = async () => {
    const payload = {
      selectedColumns,
      targetColumn,
      learningRate,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        "http://localhost:5000/train",
        payload,
        { headers: { "Contenet-Type": "application/json" } }
      );
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleModelBodyData = (
    bodySelectedColumns,
    bodyTargetColumn,
    bodyLearningRate
  ) => {
    setSelectedColumns(bodySelectedColumns);
    setTargetColumn(bodyTargetColumn);
    setLearningRate(bodyLearningRate);
  };

  return (
    <>
      <Modal
        show={true}
        onHide={setColSelFormFalse}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isFooterVisible ? (
            <ModelBodyReview
              selectedColumns={selectedColumns}
              targetColumn={targetColumn}
              learningRate={learningRate}
            />
          ) : (
            <ModelBodyForm
              totalColumns={totalColumns}
              handleModelBodyData={handleModelBodyData}
              changeFooterVisible={changeFooterVisible}
            />
          )}
        </Modal.Body>
        {isFooterVisible && (
          <Modal.Footer>
            <Button variant="danger" onClick={setColSelFormFalse}>
              Close
            </Button>
            <Button variant="warning" onClick={changeFooterVisible}>
              Back
            </Button>
            <Button variant="success" onClick={submitModelTrain}>
              Submit
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default ColumnSelectionForm;
