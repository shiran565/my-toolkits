import { StricMode } from "react";
import { createRoot } from "react-dom";
import App from "./App.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StricMode>
    <App />
  </StricMode>
);