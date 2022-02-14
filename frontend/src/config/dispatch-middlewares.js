export const initializeDispatchWithLogger =
  (store) => (dispatch) => (action) => {
    console.group(action.type);
    console.log("[DISPATCHED ACTION]:", action);
    console.log("[PREVIOUS STATE]:", store.getState());
    const dispatchedAction = dispatch(action);
    console.log("[NEW STATE]:", store.getState());
    console.groupEnd(action.type);

    return dispatchedAction;
  };

export const initializeDispatchWithPromiseSupport =
  (store) => (dispatch) => (action) => {
    if (typeof action.then === "function") {
      return action.then(dispatch);
    }

    return dispatch(action);
  };

export const applyMiddlewares = (store, middlewares) => {
  middlewares.forEach((middleware) => {
    store.dispatch = middleware(store)(store.dispatch);
  });
};
