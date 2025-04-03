import { createSlice } from "@reduxjs/toolkit";
import { loginUserAsync } from "./login.async";
import { createAsyncMatchers } from "redux/createAsyncMatchers";

interface RankerReducerState {
  loginLoader: boolean;
  user_info: Record<string, unknown>;
}

const initialState: RankerReducerState = {
  loginLoader: false,
  user_info: {},
};

const LoginReducer = createSlice({
  name: "LoginReducer",
  initialState,
  reducers: {
    onSetUserInformation: (state, action) => {
      state.user_info = action.payload;
    },
    onEmptyUserInformation: (state) => {
      state.user_info = {};
    },
  },
  extraReducers: (builder) => {
    createAsyncMatchers(builder, loginUserAsync, {
      onPending: (state) => {
        state.loginLoader = true;
      },
      onFulfilled: (state) => {
        state.loginLoader = false;
      },
      onRejected: (state) => {
        state.loginLoader = false;
      },
    });
  },
});

export const { onSetUserInformation, onEmptyUserInformation } =
  LoginReducer.actions;

export default LoginReducer.reducer;
