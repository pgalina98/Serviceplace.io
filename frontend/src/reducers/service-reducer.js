import { ACTION_TYPES } from "../actions/service-actions";
import { SUCCESS } from "../utils/action-type-util";

const initialState = {
  items: [],
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.GET_SERVICES_DATA): {
      return {
        ...state,
        items: action.payload,
      };
    }

    default:
      return state;
  }
};

export default serviceReducer;
