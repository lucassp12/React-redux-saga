import React from "react";
import { Provider } from "react-redux";
import "./config/ReactotronConfig";

import store from "./store/index";

import Routes from "./routes/index";

import "./styles.scss";
console.tron.log("Testando");

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
