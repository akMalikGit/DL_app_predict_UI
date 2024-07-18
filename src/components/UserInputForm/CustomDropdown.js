import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./UserInputForm.css";

export default function CustomDropdown({
  item,
  formData,
  handleInputChange,
  selectedValuesUq,
  isLoading,
}) {
  const handleTypeaheadChange = (selected) => {
    // console.log("selected=" + selected);
    if (typeof selected[0] == "object") {
      handleInputChange({ target: { value: selected[0]["label"] } }, item);
    } else {
      handleInputChange({ target: { value: selected[0] } }, item);
    }
  };

  return (
    <Form.Group>
      <Row className={`modal-form-row ${isLoading ? "disabled" : ""}`}>
        <Col sm="4">
          <Form.Label>{item}</Form.Label>
        </Col>
        <Col>
          <Typeahead
            id={item}
            allowNew
            newSelectionPrefix={`Custom:  ${item}: `}
            options={selectedValuesUq[item] ? selectedValuesUq[item] : []}
            selected={formData[item] ? [formData[item]] : []}
            onChange={handleTypeaheadChange}
            placeholder={`Select or type value for ${item}`}
            disabled={isLoading}
            isInvalid={!formData[item]}
          />
          <Form.Control.Feedback type="invalid">
            {/* Please select or type a value. */}
          </Form.Control.Feedback>
        </Col>
      </Row>
    </Form.Group>
  );
}
