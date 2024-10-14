import { configureStore } from "@reduxjs/toolkit";
import { authenticationApi } from "./authentication.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./authSlice.js";
import { userApi } from "./userApi.js";
import { clientApi } from "./clientApi.js";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, //rtk
    [userApi.reducerPath]: userApi.reducer, //rtk query
    [clientApi.reducerPath]: clientApi.reducer, //rtk query
    [authenticationApi.reducerPath]: authenticationApi.reducer, //rtk query
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationApi.middleware,
      userApi.middleware,
      clientApi.middleware
    ),
});

// to listen redux query on refecthing
// handlinfg refetches
setupListeners(store.dispatch);
