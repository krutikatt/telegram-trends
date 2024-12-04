import React, { useState } from 'react';
import { usePermissions } from '../context/PermissionsContext';
import './PermissionForm.css';

const PermissionForm = ({isConsentFormFilled, setIsConsentFormFilled}) => {
  const { state, dispatch } = usePermissions();
  const [permissions, setPermissions] = useState({
    readMessages: state.readMessages,
    addMembers: state.addMembers,
    sendMessages: state.sendMessages,
    inviteViaLink: state.inviteViaLink,
    adminPermissions: state.adminPermissions,
    disableBotPrivacyMode: state.disableBotPrivacyMode,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [permissionsAccepted, setPermissionsAccepted] = useState(false);

  const handleChange = (e) => {
    setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_PERMISSIONS', payload: permissions });
    //setShowPopup(true);
    setPermissionsAccepted(true);
    setIsConsentFormFilled(true)
  };

  const allPermissionsGranted = Object.values(permissions).every((value) => value === true);

  const closePopup = () => {
    setShowPopup(false);
  };


  return (
    <div className="permission-form">
      {!permissionsAccepted ? (
        <>
          <h1>Terms And Condition</h1>
          <form onSubmit={handleSubmit}>
            {Object.keys(permissions).map((key) => (
              <div key={key} className="permission-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    name={key}
                    checked={permissions[key]}
                    onChange={handleChange}
                  />
                  <span className="slider round"></span>
                </label>
                <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              </div>
            ))}
            <button type="submit" disabled={!allPermissionsGranted}>Accept Permissions</button>
          </form>
        </>
      ) : (
        showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Permissions Accepted</h2>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PermissionForm;