import React, { createContext, useReducer, useContext } from 'react';

const PermissionsContext = createContext();

const initialState = {
  readMessages: false,
  addMembers: false,
  sendMessages: false,
  inviteViaLink: false,
  adminPermissions: false,
  disableBotPrivacyMode: false
};

const permissionsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PERMISSIONS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const PermissionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(permissionsReducer, initialState);
  
  return (
    <PermissionsContext.Provider value={{ state, dispatch }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
