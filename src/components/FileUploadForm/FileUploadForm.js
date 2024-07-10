import React from "react";
import { useState, useRef } from "react";
import { Stack, Button, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import ShowAlert from "../ShowAlert/ShowAlert";
import SampleFiles from "../SampleFiles/SampleFiles";
import config from "../../config";

axios.defaults.withCredentials = true;

export default function FileUploadForm({ setIsModalVisible, setTotalColumns }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const controller = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData();
    if (selectedFile == null) {
      raiseAlert({
        variant: "primary",
        title: "No file selected.",
        message: "Please select a file.",
      });
      return;
    }
    formData.append("file", selectedFile);
    controller.current = new AbortController();
    try {
      const response = await axios.post(
        // "http://localhost:5000/upload",
        `${config.apiUrl}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          signal: controller.current.signal,
        }
      );
      // console.log("backend_res: ");
      // console.log(response);
      if (response.data.success) {
        setIsLoading(false);
        setTotalColumns(response.data.columns);
        setIsModalVisible(true);
        // console.log("Updating modal visiblity");
      } else {
        raiseAlert({
          variant: "danger",
          title: "Error while reading file.",
          message: response.data.message,
        });
        // console.error("Error response: ", response.data.error);
      }
    } catch (error) {
      // console.error("Error uploading file: ", error);
      raiseAlert({
        variant: "danger",
        title: "Failed to connect to server.",
        message: error.message,
      });
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    if (controller.current) {
      controller.current.abort();
    }
    setIsLoading(false);
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
        <form onSubmit={handleUpload}>
          <Container className="col-md-8 mx-auto">
            <Row className="mt-5">
              <h2 className="text-center">Upload CSV or Excel File</h2>
            </Row>
            <Row className="mb-5">
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control"
              />
            </Row>
          </Container>

          <Stack gap={2} className="col-md-4 mx-auto">
            <Button type="submit" variant="secondary" disabled={isLoading}>
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
            <Button
              type="reset"
              variant="outline-secondary"
              onClick={resetForm}
            >
              Cancel
            </Button>
            <SampleFiles />
          </Stack>
        </form>
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
