import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";
import "./styles/theme.css";
import App from "./app.jsx";
import { initApp } from "./integration.js";

initApp(); // module level pe, render se pehle, sirf ek baar

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
