import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const forgotPassThunk = createAsyncThunk(
  "forgotPassThunk",
  async (data) => {
    const reponse = await api.get(`/user?email=${data.mail}`).then((res) => {
      const item = res.data[0];
      const changepass = api.put(`/user/${item.id}`, {
        ...item,
        password: data.pass,
      });
      return changepass;
    });

    return reponse.data;
  }
);

export const forgotPassSlice = createSlice({
  name: "forgotpass",
  initialState: {
    statusForgot: "default",
    isLoadingForgot: false,
  },
  reducers: {
    setStatusForgot: (state, action) => {
      state.statusForgot = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(forgotPassThunk.pending, (state) => {
        state.isLoadingForgot = true;
      })
      .addCase(forgotPassThunk.fulfilled, (state) => {
        state.isLoadingForgot = false;
        state.statusForgot = "success";
      })
      .addCase(forgotPassThunk.rejected, (state) => {
        state.isLoadingForgot = false;
        state.statusForgot = "unsuccess";
      });
  },
});

export const { setStatusForgot } = forgotPassSlice.actions;
export default forgotPassSlice.reducer;
