import { ACTION_TYPES } from "actions/service-actions";
import { SUCCESS } from "utils/action-type-util";

const initialState = {
  services: [],
  selectedService: null,
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.GET_SERVICES_STATE): {
      return { ...state, services: [...action.payload] };
    }

    case SUCCESS(ACTION_TYPES.GET_SERVICE_STATE): {
      return { ...state, selectedService: { ...action.payload } };
    }

    default:
      return state;
  }
};

export default serviceReducer;
