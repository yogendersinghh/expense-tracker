import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { SpeechProvider } from "@speechly/react-client";
import { Provider } from "./context/Context";
import "./index.css";
ReactDom.render(
  <SpeechProvider appId="7c4aee08-1073-4a32-b862-ebe1850e0732" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
