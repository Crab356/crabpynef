import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const getProductThunk = createAsyncThunk("getProductThunk", async () => {
  const response = await api.get(`/products`);
  return response.data;
});

export const getProductSlice = createSlice({
  name: "getProduct",
  initialState: {
    productsList: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          const value = action.payload;
          state.productsList = value.map((item) => item);
          state.isLoading = false;
        }
      });
  },
});

export const { setListProduct } = getProductSlice.actions;
export default getProductSlice.reducer;
