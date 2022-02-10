import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/react-demo.css";

const store = createStore();
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
