import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const editProductThunk = createAsyncThunk(
  "editProductThunk",
  async (data) => {
    const response = await api.put(`/products/${data.id}`, data);

    return response.data;
  }
);

export const editProductSlice = createSlice({
  name: "uploadProduct",
  initialState: {
    statusEdit: "default",
    isLoadingEdit: false,
  },
  reducers: {
    setStatus: (state, action) => {
      state.statusEdit = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(editProductThunk.pending, (state) => {
        state.isLoadingEdit = true;
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.statusEdit = "success";
          state.isLoadingEdit = false;
        }
      })
      .addCase(editProductThunk.rejected, (state) => {
        state.isLoadingEdit = false;
        state.statusEdit = "unsuccess";
      });
  },
});

export const { setStatus } = editProductSlice.actions;
export default editProductSlice.reducer;
