import { createAsyncThunk } from "@reduxjs/toolkit";

//reset error action
export const resetErrAction = createAsyncThunk("resetErr-Action", () => {
  return {};
});

//reset success action
export const successErrAction = createAsyncThunk("resetSuccess-Action", () => {
  return {};
});
