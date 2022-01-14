import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { Notifications } from "./components";
import { store } from "./state-mgmt";
import Routes from "./routing";
import "./theme/_style.scss";

let persists = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persists}>
      <Notifications />
      <Router>
        <Routes />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
