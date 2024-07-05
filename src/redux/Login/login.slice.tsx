import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { loginUserAsync } from "./login.async";

interface RankerReducerState {
  loginLoader: boolean;
  login: { [key: string]: any };
  accessToken: string;
  user_info: { [key: string]: any };
}

const initialState: RankerReducerState = {
  loginLoader: false,
  login: {},
  accessToken: "",
  user_info: {},
};

const LoginReducer = createSlice({
  name: "LoginReducer",
  initialState,
  reducers: {
    setAccessTokenRedux: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfoRedux: (state, action) => {
      state.user_info = action.payload;
    },
    emptyLoginReducer: (state) => {},
  },
  extraReducers: (builder) => {
    // login user
    builder.addMatcher(isAnyOf(loginUserAsync.pending), (state) => {
      state.loginLoader = true;
    });
    builder.addMatcher(
      isAnyOf(loginUserAsync.fulfilled),
      (state, action: PayloadAction<{ data: any; executionTime: number }>) => {
        state.loginLoader = false;
        state.login = action.payload.data;
      }
    );
    builder.addMatcher(isAnyOf(loginUserAsync.rejected), (state) => {
      state.loginLoader = false;
    });
  },
});

export const { emptyLoginReducer, setAccessTokenRedux, setUserInfoRedux } =
  LoginReducer.actions;
export default LoginReducer.reducer;
