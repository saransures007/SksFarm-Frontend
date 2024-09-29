// reducer.js
import * as actionTypes from './types';

export const initialState = {
  isNavMenuClose: false,
  currentApp: 'default',
  scanning: false,  // Added property to manage scanning state
  scanResult: null, // Added property to store the result of the scan
};

export function contextReducer(state, action) {
  switch (action.type) {
    case actionTypes.OPEN_NAV_MENU:
      return {
        ...state,
        isNavMenuClose: false,
      };
    case actionTypes.CLOSE_NAV_MENU:
      return {
        ...state,
        isNavMenuClose: true,
      };
    case actionTypes.COLLAPSE_NAV_MENU:
      return {
        ...state,
        isNavMenuClose: !state.isNavMenuClose,
      };
    case actionTypes.CHANGE_APP:
      return {
        ...state,
        currentApp: action.payload, // Fixed typo from 'playload' to 'payload'
      };
    case actionTypes.DEFAULT_APP:
      return {
        ...state,
        currentApp: 'default',
      };
    case actionTypes.SCAN_ACTION:
      return {
        ...state,
        scanning: true,
        scanResult: null, // Clear previous scan result
      };
    case actionTypes.SCAN_RESULT:
      return {
        ...state,
        scanning: false, // Reset scanning state
        scanResult: action.payload, // Store the result of the scan
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
