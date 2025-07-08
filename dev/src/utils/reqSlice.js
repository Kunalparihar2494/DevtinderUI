import { createSlice } from "@reduxjs/toolkit";

const reqSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newReq = state.filter((req) => req.fromUserId._id.toString() !== action.payload.toString());
      return newReq;
    },
  },
});

export const { addRequest, removeRequest } = reqSlice.actions;

export default reqSlice.reducer;
