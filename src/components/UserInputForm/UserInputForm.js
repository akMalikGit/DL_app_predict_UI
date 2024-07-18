import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ShowAlert from "../ShowAlert/ShowAlert";
import CustomDropdown from "./CustomDropdown";
import axios from "axios";
import config from "../../config";
import "./UserInputForm.css";

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

  const handleInputChange = (e, item) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, [item]: value }));
    // console.log("updated form:");
    // console.log(formData);
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
              <CustomDropdown
                key={index}
                item={item}
                formData={formData}
                handleInputChange={handleInputChange}
                selectedValuesUq={selectedValuesUq}
                isLoading={isLoading}
              />
            </Form.Group>
          ))}
        </Form>
        {predictedValue && (
          <div className="predict-label">
            <div>
              <h3>Predicted {targetColumn} Value: </h3>
            </div>
            <div className="predict-value">
              <h3>{predictedValue}</h3>
            </div>
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
