import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const createProductThunk = createAsyncThunk(
  "addnewProduct",
  async (data) => {
    const response = await api.post("/products", data);
    return response.data;
  }
);

export const createProductSlice = createSlice({
  name: "addProduct",
  initialState: {
    status: "default",
    isLoading: false,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.status = "success";
        }
      })
      .addCase(createProductThunk.rejected, (state) => {
        state.status = "unsuccess";
        state.isLoading = false;
      });
  },
});

export const { setStatus } = createProductSlice.actions;
export default createProductSlice.reducer;
