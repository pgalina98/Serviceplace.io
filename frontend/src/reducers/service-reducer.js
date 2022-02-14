import { ACTION_TYPES } from "../actions/service-actions";
import { SUCCESS } from "../utils/action-type-util";

const initialState = {
  services: [],
  selectedService: {},
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.GET_SERVICES_DATA): {
      return { ...state, services: [...action.payload] };
    }

    case SUCCESS(ACTION_TYPES.GET_SERVICE_DATA): {
      return { ...state, selectedService: { ...action.payload } };
    }

    default:
      return state;
  }
};

export default serviceReducer;
