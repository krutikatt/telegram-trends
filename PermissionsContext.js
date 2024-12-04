import React, { createContext, useReducer, useContext } from 'react';

const PermissionsContext = createContext();

const initialState = {
  readMessages: false,
  addMembers: false,
  sendMessages: false,
  inviteViaLink: false,
  adminPermissions: false,
  disableBotPrivacyMode: false,
  userLevel: 1,
  userPoints: 0,
  userBadges: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PERMISSIONS':
      return { ...state, ...action.payload };
    case 'UPDATE_LEVEL':
      return { ...state, userLevel: action.payload.level, userPoints: action.payload.points };
    case 'ADD_BADGE':
      return { ...state, userBadges: [...state.userBadges, action.payload] };
    default:
      return state;
  }
};

export const PermissionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PermissionsContext.Provider value={{ state, dispatch }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);