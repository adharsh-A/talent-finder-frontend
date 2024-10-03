// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage if token exists
const tokenFromStorage = localStorage.getItem("token") || null;
const usernameFromStorage = localStorage.getItem("username") || null;
const idFromStorage = localStorage.getItem("id") || null;
const role = localStorage.getItem("role") || null;

// Define initial state

const initialState = {
  token: tokenFromStorage, // Persisted token
  user: null, // User info
  isAuthenticated: !!tokenFromStorage, // Check if authenticated
  role: role,
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

      // Save token to localStorage
      localStorage.setItem("token", token);
    },
    // Clear credentials on logout
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.id = null;
      state.role = null;
      state.isAuthenticated = false;

      // Remove token from localStorage
      localStorage.removeItem("token");
    },
  },
});

// Export actions and reducer
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
