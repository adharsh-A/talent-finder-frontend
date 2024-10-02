import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value = Math.max(state.value - 1, 0);
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
