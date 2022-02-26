import { ACTION_TYPES } from "../actions/authentication-actions";
import { SUCCESS } from "../utils/action-type-util";

const initialState = {
  loggedUser: {},
  isAuthenticated: false,
  isAuthenticationResolved: false,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.SET_AUTHENTICATION_STATE): {
      return {
        ...state,
        loggedUser: { ...action.payload },
        isAuthenticated: true,
        isAuthenticationResolved: true,
      };
    }

    case SUCCESS(ACTION_TYPES.CLEAR_AUTHENTICATION_STATE): {
      return {
        loggedUser: {},
        isAuthenticated: false,
        isAuthenticationResolved: true,
      };
    }

    case SUCCESS(ACTION_TYPES.RESET_AUTHENTICATION_STATE): {
      return { ...state, isAuthenticationResolved: false };
    }

    default:
      return state;
  }
};

export default authenticationReducer;
