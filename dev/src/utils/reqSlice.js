import { createSlice } from "@reduxjs/toolkit";

const reqSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: () => null,
  },
});

export const { addRequest, removeRequest } = reqSlice.actions;

export default reqSlice.reducer;
