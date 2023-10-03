import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const getIdProductThunk = createAsyncThunk(
  "getIdProductThunk",
  async (data) => {
    const response = await api.get(`/products/${data}`);
    return response.data;
  }
);
export const getIdProductSlice = createSlice({
  name: "getIdProduct",
  initialState: {
    product: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIdProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIdProductThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.product = action.payload;
          state.isLoading = false;
        } else state.isLoading = false;
      });
  },
});

export const { product, isLoading } = getIdProductSlice.actions;
export default getIdProductSlice.reducer;
