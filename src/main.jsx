import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { StoreProvider } from "./store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter><StoreProvider><App /></StoreProvider></BrowserRouter>
);
