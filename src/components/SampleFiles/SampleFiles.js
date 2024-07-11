import React from "react";
import { Dropdown } from "react-bootstrap";
import "./SampleFiles.css";

export default function SampleFiles() {
  return (
    <div className="sample_download_button">
      <Dropdown>
        <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
          Download Sample Files
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            href="https://www.kaggle.com/datasets/yasserh/housing-prices-dataset"
            target="_blank"
            rel="noopener noreferrer external"
          >
            Housing Prices Dataset
          </Dropdown.Item>
          <Dropdown.Item
            href="https://www.kaggle.com/datasets/deepayanthakur/asthma-disease-prediction"
            target="_blank"
            rel="noopener noreferrer external"
          >
            Asthma Disease Prediction
          </Dropdown.Item>
          <Dropdown.Item
            href="https://www.kaggle.com/datasets"
            target="_blank"
            rel="noopener noreferrer external"
          >
            Other Dataset
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
