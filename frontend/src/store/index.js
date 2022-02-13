import { createStore, combineReducers } from "redux";

import {
  initializeDispatchWithLoggerMiddleware,
  applyMiddlewares,
} from "../config/dispatch-middlewares";

import serviceReducer from "reducers/service-reducer";

const initializeStore = () => {
  const middlewares = [];

  const combinedReducers = combineReducers({
    servicesState: serviceReducer,
  });

  const store = createStore(
    combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  if (process.env.NODE_ENV === "development") {
    middlewares.push(initializeDispatchWithLoggerMiddleware);
  }

  applyMiddlewares(store, middlewares);

  return store;
};

export default initializeStore;
