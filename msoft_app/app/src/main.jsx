import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-xixaidu4.us.auth0.com"; // Reemplaza con tu dominio Auth0
const clientId = "BSTpScSwngSGgrm7NvRU0oLmtz9TmtEA"; // Reemplaza con tu Client ID de Auth0

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
);
