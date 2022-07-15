import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
// import { AuthProvider } from "./context/context";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <Provider store={store}>
    {/* <AuthProvider> */}
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
    {/* </AuthProvider> */}
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById("root"));

// Call the element loader after the app has been rendered the first time
defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
