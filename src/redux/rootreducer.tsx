import { combineReducers } from "@reduxjs/toolkit";
import MessageReducer from "redux/Message/message.slice";
import LoginReducer from "redux/Login/login.slice";

const rootReducer = combineReducers({
  MessageReducer,
  LoginReducer,
});

export { rootReducer };
