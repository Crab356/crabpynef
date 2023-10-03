import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const removeUserThunk = createAsyncThunk(
  "removeUserThunk",
  async (id) => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  }
);

export const removeUserSlice = createSlice({
  name: "removeUsers",
  initialState: {
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(removeUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default removeUserSlice.reducer;
