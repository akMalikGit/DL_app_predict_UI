import React, { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ShowAlert from "../ShowAlert/ShowAlert";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function ColumnSelectionForm({
  selectedColumns,
  targetColumn,
  learningRate,
  isCategorical,
  setIsCategorical,
  totalColumns,
  setSelectedColumns,
  setTargetColumn,
  setLearningRate,
  triggerColSelFormSubmit,
  setTriggerColSelFormSubmit,
  setIsColumnSelForm,
  setSelectedValueUq,
  isLoading,
  setIsLoading,
}) {
  const [selectedRadio, setSelectedRadio] = useState(targetColumn);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(selectedColumns);
  const [rangeValue, setRangeValue] = useState(Math.log10(learningRate));
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (triggerColSelFormSubmit) {
      handleFormSubmit();
      setTriggerColSelFormSubmit(false);
    }
  }, [triggerColSelFormSubmit]);

  const submitModelTrain = async () => {
    const payload = {
      selectedColumns: selectedCheckboxes,
      targetColumn: selectedRadio,
      learningRate: Math.pow(10, rangeValue).toFixed(5),
      isCategorical: isCategorical,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/train",
        payload,
        {
          headers: { "Contenet-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setSelectedValueUq(response.data.d_str_selected_uq);
        setIsColumnSelForm(false);
        setIsLoading(false);
      } else {
        raiseAlert({
          variant: "danger",
          title: "Failed to learn from data.",
          message: response.data.message,
        });
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
      raiseAlert({
        variant: "danger",
        title: "Failed to connect to server.",
        message: error.message,
      });
    }
  };

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
    setSelectedCheckboxes((prev) => prev.filter((item) => item !== value));
  };

  const handleCheckboxChange = (value) => {
    setSelectedCheckboxes((prev) => {
      let updatedCheckboxes;
      if (prev.includes(value)) {
        updatedCheckboxes = prev.filter((item) => item !== value);
      } else {
        updatedCheckboxes = [...prev, value];
      }
      return totalColumns.filter((column) =>
        updatedCheckboxes.includes(column)
      );
    });
    // if (selectedRadio === value) {
    //   setSelectedRadio(null);
    // }
  };

  const isValidFormSubmittion = () => {
    return selectedCheckboxes.length > 0 && selectedRadio.length > 0;
  };

  const handleFormSubmit = (event) => {
    // event.preventDefault();
    if (isValidFormSubmittion()) {
      setSelectedColumns(selectedCheckboxes);
      setTargetColumn(selectedRadio);
      setLearningRate(Math.pow(10, rangeValue).toFixed(5));

      submitModelTrain();
    } else {
      raiseAlert({
        variant: "primary",
        title: "Input is Missing.",
        message:
          "Please Select atleast one Inupt column and the Target column.",
      });
    }
  };
  const raiseAlert = ({ variant, title, message }) => {
    setAlertVariant(variant);
    setAlertTitle(title);
    setAlertMessage(message);
    setIsShowAlert(true);
    setIsLoading(false);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Row className="mb-3">
          <Col>
            <h3>Input Columns</h3>
            {totalColumns.map((column) => (
              <div key={column} className="mb-2">
                <Form.Check
                  type="switch"
                  id={`switch-${column}`}
                  label={column}
                  checked={selectedCheckboxes.includes(column)}
                  onChange={() => handleCheckboxChange(column)}
                  disabled={selectedRadio === column || isLoading}
                />
              </div>
            ))}
          </Col>
          <Col>
            <h3>Target Column</h3>
            {totalColumns.map((column) => (
              <div key={column} className="mb-2">
                <Form.Check
                  type="radio"
                  name="targetColumn"
                  label={column}
                  id={`radio-${column}`}
                  checked={selectedRadio === column}
                  onChange={() => handleRadioChange(column)}
                  disabled={selectedCheckboxes.includes(column) || isLoading}
                />
              </div>
            ))}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Check
                label="output is categorical value?"
                type="checkbox"
                checked={isCategorical}
                onChange={() => setIsCategorical(!isCategorical)}
                disabled={isLoading}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>
                Learning Rate: {Math.pow(10, rangeValue).toFixed(5)}
              </Form.Label>
              <Form.Control
                type="range"
                min={Math.log10(0.00001)}
                max={Math.log10(10)}
                step={(Math.log10(10) - Math.log10(0.00001)) / 100}
                value={rangeValue}
                onChange={handleRangeChange}
                disabled={isLoading}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* <button type="submit" style={{ display: "none" }}></button> */}
      </Form>
      {isShowAlert && (
        <ShowAlert
          alertVariant={alertVariant}
          alertTitle={alertTitle}
          alertMessage={alertMessage}
          setIsShowAlert={setIsShowAlert}
        />
      )}
    </>
  );
}
