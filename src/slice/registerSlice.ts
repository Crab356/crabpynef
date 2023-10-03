import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";
import { useEffect } from "react";

export const createUser = createAsyncThunk("createUser", async (data) => {
  const response = await api.post("/user", data);
  return response.data;
});

export const registerSlice = createSlice({
  name: "regisSlice",
  initialState: {
    statusRegis: "default",
  },
  reducers: {
    setStatusRegis: (state, action) => {
      state.statusRegis = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.statusRegis = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.statusRegis = "success";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.statusRegis = "false";
      });
  },
});

export const { setStatusRegis } = registerSlice.actions;
export default registerSlice.reducer;
