import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

import initializeStore from "./store";

import Sidebar from "./components/sidebar/sidebar";
import Navbar from "components/navbar/navbar";
import Routes from "./router/routes";

const store = initializeStore();

function App() {
  // const authenticationState = useSelector((state) => state.authenticationState);

  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true} autoDismissTimeout={4000}>
        <Router>
          <Navbar id="navbar" />
          <Navbar id="navbar-clone" />
          <Sidebar />
          <Routes />
        </Router>
      </ToastProvider>
    </Provider>
  );
}

export default App;
