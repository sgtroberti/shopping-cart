import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
