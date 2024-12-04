import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunityManagementPage from "./communitymanagement/index"; // Adjust the path based on your folder structure
import "./App.css"; // Optional: Global styles
import { PermissionsProvider } from "./context/PermissionsContext"; // Import the PermissionsProvider
import PermissionForm from "./components/PermissionForm"; // Import the PermissionForm
import  MainApp  from "./components/LandinPage";
import GroupsPage from "./components/GroupsPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConsentFormFilled, setIsConsentFormFilled] = useState(false);
  return (
      <PermissionsProvider>
        <div className="app">
          <div className="card-wrapper">
            {/* <MainApp/ > */}
            {/* {!isAuthenticated && <PermissionForm isConsentFormFilled={isConsentFormFilled} setIsConsentFormFilled={setIsConsentFormFilled} />}  */}
            {<CommunityManagementPage setIsAuthenticated={setIsAuthenticated}  />}
          </div>
        </div>
      </PermissionsProvider>
  );
};

export default App;