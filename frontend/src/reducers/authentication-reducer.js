import { ACTION_TYPES } from "../actions/authentication-actions";
import { SUCCESS } from "../utils/action-type-util";

const initialState = {
  loggedUser: {},
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.SET_USER_DATA): {
      return { ...state, loggedUser: { ...action.payload } };
    }

    default:
      return state;
  }
};

export default authenticationReducer;
