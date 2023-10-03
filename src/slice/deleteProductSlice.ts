import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const deleteProductThunk = createAsyncThunk(
  "deleteProductThunk",
  async (data) => {
    const response = await api.delete(`/products/${data}`);
    return response.data;
  }
);

export const deleteProductSlice = createSlice({
  name: "removeProduct",
  initialState: {
    isLoading: false,
    statusDelete: "default",
  },
  reducers: {
    setStatusDelete: (state, action) => {
      state.statusDelete = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state) => {
        state.statusDelete = "success";
        state.isLoading = false;
      })
      .addCase(deleteProductThunk.rejected, (state) => {
        state.statusDelete = "unsuccess";
        state.isLoading = false;
      });
  },
});

export const { setStatusDelete } = deleteProductSlice.actions;
export default deleteProductSlice.reducer;
