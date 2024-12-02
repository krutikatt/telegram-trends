import React from "react";
import CommunityManagementPage from "./communitymanagement/index"; // Adjust the path based on your folder structure
import "./App.css"; // Optional: Global styles
import { PermissionsProvider } from "./context/PermissionsContext"; // Import the PermissionsProvider

const App = () => {
  return (
    <PermissionsProvider>
      <div className="app">
        <div className="card-wrapper">
          <CommunityManagementPage />
        </div>
      </div>
    </PermissionsProvider>
  );
};

export default App;
