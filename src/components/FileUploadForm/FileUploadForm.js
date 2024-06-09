import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ColumnSelectionForm from "../ColumnSelectionForm/ColumnSelectionForm";
import errorPopUp from "../errorPopUp/errorPopUp";

axios.defaults.withCredentials = true;

export default function FileUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isColSelForm, setColSelForm] = useState(false);
  const [isErrorPop, setErrorPop] = useState(false);
  const [totalColumns, setTotalColumns] = useState([]);

  useEffect(() => {
    if (!isColSelForm) {
      setTotalColumns([]);
    }
  }, [isColSelForm]);

  const setColSelFormFalse = () => {
    setColSelForm(false);
  };

  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("backend_res: ");
      console.log(response);
      if (response.data.success) {
        setTotalColumns(response.data.columns);
        setColSelForm(true);
      } else {
        setErrorPop(true);
        console.error("Error response: ", response.data.error);
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      setErrorPop(true);
    }
  };
  return (
    <div>
      <h3>Upload CSV or Excel Files</h3>
      <form onSubmit={handleUpload}>
        <div className="row g-1 mb-5">
          <label>Upload File</label>
          <div className="col-5">
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {console.log(" return isColSelForm: ".concat(String(isColSelForm)))}
      {isColSelForm && (
        <ColumnSelectionForm
          setColSelFormFalse={setColSelFormFalse}
          totalColumns={totalColumns}
        />
      )}
    </div>
  );
}
