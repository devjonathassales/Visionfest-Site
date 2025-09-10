import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/* define tema antes de montar o app */
(() => {
  try {
    const stored = localStorage.getItem("vf-theme");
    if (stored) document.documentElement.setAttribute("data-theme", stored);
    else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  } catch {}
})();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
