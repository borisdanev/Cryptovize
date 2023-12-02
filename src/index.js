import "./styles/style.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import App from "./App.js";
const rootEl = document.querySelector("#root");
const root = createRoot(rootEl);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
