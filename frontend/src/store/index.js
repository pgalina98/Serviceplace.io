import { createStore, combineReducers } from "redux";

import serviceReducer from "reducers/service-reducer";

const initializeDispatchWithLogger = (store) => {
  const dispatch = store.dispatch;

  return (action) => {
    console.group(action.type);
    console.log("[DISPATCHED ACTION]:", action);
    console.log("[PREVIOUS STATE]:", store.getState());
    const dispatchedAction = dispatch(action);
    console.log("[NEW STATE]:", store.getState());
    console.groupEnd(action.type);

    return dispatchedAction;
  };
};

const initializeStore = () => {
  const combinedReducers = combineReducers({
    serviceState: serviceReducer,
  });

  const store = createStore(
    combinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.dispatch = initializeDispatchWithLogger(store);

  return store;
};

export default initializeStore;
