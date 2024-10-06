import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./global.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <Theme>
      <App />
      </Theme>
    </Provider>
  </StrictMode>
);
