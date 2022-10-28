import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NFT from "./NFT";
import WalletApp from "./WalletApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NFT />
  </React.StrictMode>
);

// reportWebVitals();
