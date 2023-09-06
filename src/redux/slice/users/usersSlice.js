import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetErrAction } from "../globalActions/globalActions";

//initialState
const initialState = {
  loading: false, //loading for all state
  error: null,
  users: [],
  user: null,
  profile: {},
  userAuth: {
    loading: false, //Loading for authentication state
    error: null,
    userInfo: {},
  },
};

//Login Action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      //make http request
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });

      //save the user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Registeration Action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { fullname, email, password },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //make http request
      const { data } = await axios.post(`${baseURL}/users/register`, {
        fullname,
        email,
        password,
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Users Slice

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //handle action

    //login  (pending)
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });

    //(fulfilled)
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });

    //(rejected)
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    ////

    //! Register  (pending)
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });

    //(fullfilled)
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

    //(rejected)
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ////

    //reset error action
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
  },
});

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
