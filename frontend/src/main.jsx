import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initLenis } from "./utils/lenis.js";

initLenis();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
