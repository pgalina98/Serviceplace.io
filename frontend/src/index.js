import React from "react";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import initializeStore from "./store";

const store = initializeStore();

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider autoDismiss={true} autoDismissTimeout={4000}>
      <App />
    </ToastProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
