import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const getUserThunk = createAsyncThunk("getUserThunk", async () => {
  const response = await api.get("/user");
  return response.data;
});

const getUserSlice = createSlice({
  name: "getUsers",
  initialState: {
    userList: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.userList = action.payload.map((item) => item);
          state.isLoading = false;
        } else {
          state.isLoading = false;
        }
      });
  },
});

export default getUserSlice.reducer;
