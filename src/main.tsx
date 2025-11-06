import "modern-normalize";
import React from "react";
import { createRoot } from "react-dom/client";
//import ReactDOM from "react-dom/client";
import App from "./components/App/App";

const root = createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
