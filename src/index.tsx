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

// @ts-ignore
import { registerObserver } from "react-perf-devtool";

let persists = persistStore(store);

const options = {
  shouldLog: true,
  port: 3000,
  timeout: 12000, // Load the extension after 12 sec.
  components: ["Letters", "Game"],
};

function callback(measures: any) {
  // do something with the measures
}

// assign the observer to the global scope, as the GC will delete it otherwise
registerObserver(options, callback);

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
