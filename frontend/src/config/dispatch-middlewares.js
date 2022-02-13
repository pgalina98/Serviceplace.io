export const initializeDispatchWithLoggerMiddleware = (store) => {
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

export const applyMiddlewares = (store, middlewares) => {
  middlewares.forEach((middleware) => {
    store.dispatch = middleware(store);
  });
};
