import { createStore, combineReducers } from "redux";

import serviceReducer from "reducers/service-reducer";

const initializeStore = () => {
  const combinedReducers = combineReducers({
    serviceState: serviceReducer,
  });

  const store = createStore(
    combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};

export default initializeStore;
