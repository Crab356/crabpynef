import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const checkLogin = createAsyncThunk("checkLogin", async (data) => {
  const response = await api.get(
    `/user?email=${data.emailU}&&password=${data.passU}`
  );
  return response.data;
});

export const loginSlice = createSlice({
  name: "logSlice",
  initialState: {
    account: null,
    isLogin: "",
    loadingLogin: false,
  },
  reducers: {
    setGetLocalStore: (state, action) => {
      state.account = action.payload;
      state.isLogin = "success";
    },
    logOutAccount: (state) => {
      state.isLogin = "";
      localStorage.removeItem("localAccount");
      state.account = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkLogin.pending, (state) => {
        state.loadingLogin = true;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.account = action.payload[0];
          state.isLogin = "success";
          localStorage.setItem(
            "localAccount",
            JSON.stringify(action.payload[0])
          );
        } else {
          state.isLogin = "unsuccess";
        }
        state.loadingLogin = false;
      });
    // .addCase(checkLogin.rejected, (state) => {});
  },
});

export const { setGetLocalStore, logOutAccount } = loginSlice.actions;
export default loginSlice.reducer;
