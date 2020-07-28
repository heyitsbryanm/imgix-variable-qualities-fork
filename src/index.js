import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("app");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

const dprContainer = document.querySelector("#dprContainer");

let dpr = window.devicePixelRatio;

ReactDOM.render(
  <React.StrictMode>
    <div class="test">
      Your device's device pixel resolution is: {window.devicePixelRatio}
    </div>
  </React.StrictMode>,
  dprContainer
);
