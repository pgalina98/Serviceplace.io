import { ACTION_TYPES } from "../actions/collaboration-actions";
import { SUCCESS } from "../utils/action-type-util";

const initialState = {
  selectedCollaboration: null,
};

const collaborationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.SET_COLLABORATION_DATA): {
      return { ...state, selectedCollaboration: { ...action.payload } };
    }

    default:
      return state;
  }
};

export default collaborationReducer;
