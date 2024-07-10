import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ShowAlert from "../ShowAlert/ShowAlert";
import axios from "axios";
import config from "../../config";

axios.defaults.withCredentials = true;

export default function UserInputForm({
  selectedColumns,
  targetColumn,
  triggerUserInFormSubmit,
  setTriggerUserInFormSubmit,
  selectedValuesUq,
  isLoading,
  setIsLoading,
}) {
  const [predictedValue, setPredictedValue] = useState(null);
  const [formData, setFormData] = useState(
    selectedColumns.reduce((acc, col) => {
      acc[col] = "";
      return acc;
    }, {})
  );
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (triggerUserInFormSubmit) {
      handleFormSubmit();
      setTriggerUserInFormSubmit(false);
    }
  }, [triggerUserInFormSubmit]);

  const handleInputChange = (e, column) => {
    setFormData({
      ...formData,
      [column]: e.target.value,
    });
  };
  const isValidFormSubmittion = () => {
    const empty = selectedColumns.filter((item) => !formData[item]);
    // console.log("empty=");
    // console.log(empty);
    if (empty.length > 0) {
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    // console.log("Submitted form data:", formData);
    if (!isValidFormSubmittion()) {
      raiseAlert({
        variant: "primary",
        title: "Input is Missing.",
        message: "Please provide the input values for all provided fields.",
      });
      return;
    }
    try {
      const response = await axios.post(
        // "http://localhost:5000/test",
        `${config.apiUrl}/test`,
        formData
      );
      setIsLoading(false);
      if (response.data.success) {
        setPredictedValue(response.data.message);
        // console.log(response.data);
      } else {
        raiseAlert({
          variant: "danger",
          title: "Error while predicting output.",
          message: response.data.message,
        });
      }
    } catch (error) {
      // console.error("Error submitting form data:", error);
      raiseAlert({
        variant: "danger",
        title: "Failed to connect to server.",
        message: error.message,
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
      <div>
        <Form onSubmit={handleFormSubmit}>
          {selectedColumns.map((item, index) => (
            <Form.Group key={index} className="mb-2">
              <Form.Label>{item}</Form.Label>

              {selectedValuesUq[item] ? (
                <Form.Control
                  as="select"
                  value={formData[item] || ""}
                  onChange={(e) => handleInputChange(e, item)}
                  disabled={isLoading}
                >
                  <option value="">Select {item}</option>
                  {selectedValuesUq[item].map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                <Form.Control
                  type="text"
                  value={formData[item]}
                  onChange={(e) => handleInputChange(e, item)}
                  disabled={isLoading}
                />
              )}
            </Form.Group>
          ))}
        </Form>
        {predictedValue && (
          <div>
            <h3>Preducted {targetColumn} Value: </h3>
            <h3>{predictedValue}</h3>{" "}
          </div>
        )}
      </div>

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
