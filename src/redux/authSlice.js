// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage if token exists
const tokenFromStorage = localStorage.getItem("token") || null;
const usernameFromStorage = localStorage.getItem("username") || null;
const idFromStorage = localStorage.getItem("id") || null;
const role = localStorage.getItem("role") || null;
const loginTimeFromStorage = localStorage.getItem("loginTime") || null;

// Define initial state

const initialState = {
  token: tokenFromStorage, // Persisted token
  username: usernameFromStorage, // Persisted username
  id: idFromStorage,
  isAuthenticated: !!tokenFromStorage, // Check if authenticated
  role: role,
  loginTime: loginTimeFromStorage, // Persisted login time
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set token and user on login/register
    setCredentials: (state, action) => {
      const { token, username,id ,role} = action.payload;
      state.token = token;
      state.username = username;
      state.id= id;
      state.role=role
      state.isAuthenticated = true;

      const loginTime = new Date().getTime();
      state.loginTime = loginTime;

      // Save token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("id", id);
      localStorage.setItem("role", role);
      localStorage.setItem("loginTime", loginTime);

      
    },
    // Clear credentials on logout
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.id = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loginTime = null;

      // Remove token from localStorage
      localStorage.clear();
      //clear cookies
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
});

// Export actions and reducer
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
