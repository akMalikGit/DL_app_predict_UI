import React from "react";
import { Row, Col } from "react-bootstrap";

export default function ModelBodyReview({
  selectedColumns,
  targetColumn,
  learningRate,
}) {
  return (
    <Row className="mb-3">
      <Col>
        <h3>Selected Columns:</h3>
        {selectedColumns.map((column) => (
          <div key={column}>
            <label>{column}</label>
          </div>
        ))}
      </Col>
      <Col>
        <Row className="mb-3">
          <h3>Target Column:</h3>
          <label>{targetColumn}</label>
        </Row>

        <Row className="mb-3">
          <h3>Learning Rate: </h3>
          <label>{learningRate}</label>
        </Row>
      </Col>
    </Row>
  );
}
