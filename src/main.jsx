import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { StyledEngineProvider } from '@mui/material/styles';

import  "./global.css";
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});
const cache = createCache({
  key: "css",
  prepend: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
    <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
      </ThemeProvider>
      </CacheProvider>
      </StyledEngineProvider>
  </StrictMode>
);
