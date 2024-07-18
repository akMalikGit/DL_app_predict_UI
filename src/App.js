// import logo from "./logo.svg";
import "./App.css";
import FileUploadForm from "./components/FileUploadForm/FileUploadForm";
import UserModal from "./components/UserModal/UserModal";
import Pagefooter from "./components/Pagefooter/Pagefooter";
import React, { useState } from "react";
// import OutlineTypesExample from "./components/OutlineTypesExample";
// import ColumnSelector from "./test_examples/ColumnSelector";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalColumns, setTotalColumns] = useState([]);

  return (
    <div className="App">
      <div className="app-body">
        <FileUploadForm
          setIsModalVisible={setIsModalVisible}
          setTotalColumns={setTotalColumns}
        />

        <UserModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          totalColumns={totalColumns}
        />
      </div>
      {/* {console.log(" Viewing isModalVisible: ".concat(String(isModalVisible)))} */}
      <Pagefooter />
    </div>
  );
}

export default App;
