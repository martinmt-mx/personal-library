import React from "react";
import { store } from "./store";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloWrapper } from "./apolloClient";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  </Provider>
);
