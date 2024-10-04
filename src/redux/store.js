import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice.js";
import { authenticationApi } from "./authentication.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./authSlice.js";
import { userApi } from "./userApi.js";
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [counterApi.reducerPath]: counterApi.reducer
    counter: counterSlice.reducer, //rtk
    auth: authSlice.reducer, //rtk
    [userApi.reducerPath]: userApi.reducer, //rtk query
    [authenticationApi.reducerPath]: authenticationApi.reducer, //rtk query
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticationApi.middleware),
});

// to listen redux query on refecthing
// handlinfg refetches
setupListeners(store.dispatch);
