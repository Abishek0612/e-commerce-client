import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
import axios from "axios";

//initial state
const initialState = {
  coupons: [],
  coupon: null,
  loading: false,
  error: false,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//! create coupon action
export const createCouponAction = createAsyncThunk(
  "coupons/create",
  async (
    { code, discount, startDate, endDate },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //Token -Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/coupons`,
        {
          code,
          discount,
          startDate,
          endDate,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//? Fetch coupons action
export const fetchCouponAction = createAsyncThunk(
  "coupons/fetch-All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/coupons`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Fetch single coupon action
export const fetchSingleCouponAction = createAsyncThunk(
  "coupons/fetch-single",
  async (code, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseURL}/coupons/single?code=${code}`,
        { code }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice

const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  extraReducers: (builder) => {
    //! create coupon (pending)
    builder.addCase(createCouponAction.pending, (state) => {
      state.loading = true;
    });

    //! (fullfilled)
    builder.addCase(createCouponAction.fulfilled, (state, action) => {
      state.coupon = action.payload;
      state.loading = false;
      state.isAdded = true;
    });

    //! (rejected)
    builder.addCase(createCouponAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAdded = false;
      state.coupon = null;
    });

    //? Fetch all coupon (pending)

    builder.addCase(fetchCouponAction.pending, (state) => {
      state.loading = true;
    });

    //? (fullfilled)
    builder.addCase(fetchCouponAction.fulfilled, (state, action) => {
      state.coupons = action.payload;
      state.loading = false;
      state.isAdded = true;
    });

    //? (rejected)
    builder.addCase(fetchCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.coupons = null;
      state.error = action.payload;
    });

    //! Fetch single coupon (rejected)
    builder.addCase(fetchSingleCouponAction.pending, (state) => {
      state.loading = true;
    });

    //! (fullfilled)
    builder.addCase(fetchSingleCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
      state.isAdded = true;
    });

    //! (rejected)
    builder.addCase(fetchSingleCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.coupon = false;
      state.isAdded = false;
    });

    //reset error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });

    //reset success action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

//generate reducer
const couponsReducer = couponsSlice.reducer;

export default couponsReducer;
