import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
// import "./ModelBodyForm.css";
import OverlayMessage from "../OverlayMessage/OverlayMessage";

export default function ModelBodyForm({
  totalColumns,
  handleModelBodyData,
  changeFooterVisible,
}) {
  const [availableColumns, setAvailableColumns] = useState(totalColumns);
  const [availableSelColumns, setAvailableSelColumns] = useState(totalColumns);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [targetColumn, setTargetColumn] = useState("");
  const [learningRate, setLearningRate] = useState(0.001);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setAvailableSelColumns(totalColumns.filter((col) => col !== targetColumn));
  }, [targetColumn]);

  const handleColumnSelection = (column) => {
    if (!selectedColumns.includes(column)) {
      setSelectedColumns([...selectedColumns, column]);
      setAvailableColumns(availableColumns.filter((col) => col !== column));
    } else {
      setAvailableColumns([...availableColumns, column]);
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    }
  };

  // const handleTargetColumn = (event) => {
  //   setTargetColumn(event.target.value);
  // };
  const handleTargetColumn = (column) => {
    setTargetColumn(column);
  };

  const handleLearningRateChange = (event) => {
    setLearningRate(event.target.value);
  };
  const isValidFormSubmittion = () => {
    return selectedColumns.length > 0 && targetColumn.length > 0;
  };

  const handleFormSubmit = (event) => {
    if (isValidFormSubmittion()) {
      event.preventDefault();
      changeFooterVisible();
      handleModelBodyData(selectedColumns, targetColumn, learningRate);
    } else {
      setShowOverlay(true);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Row className="mb-3">
        <Col>
          <h3>Input Columns</h3>
          {availableSelColumns.map((column) => (
            <div key={column} className="mb-2">
              <Form.Check
                type="switch"
                label={column}
                // value={column}
                // checked={true}
                onChange={() => handleColumnSelection(column)}
              />
            </div>
          ))}
        </Col>
        <Col>
          <h3>Target Column</h3>
          {availableColumns.map((column) => (
            <div key={column} className="mb-2">
              <Form.Check
                type="radio"
                name="targetColumn"
                label={column}
                // value={column}
                // onChange={(e) => handleTargetColumn(e)}
                onChange={() => handleTargetColumn(column)}
              />
            </div>
          ))}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Learning Rate: {learningRate}</Form.Label>
            <Form.Control
              // input type="range"
              type="range"
              min="0.00001"
              max="0.1"
              step="0.00001"
              value={learningRate}
              onChange={handleLearningRateChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button className="float-end" type="submit" variant="info">
        Next
      </Button>
      {/* {showOverlay && (<p>Please provide Valid input</p>)} */}
      {/* {showOverlay && (
        <OverlayMessage message="At least one field has to be selected" onClose={() => setShowOverlay(false)} />
      )} */}
    </Form>
  );
}
