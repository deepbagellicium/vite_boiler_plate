import { combineReducers } from "@reduxjs/toolkit";
import MessageReducer from "redux/Message/message.slice";

const rootReducer = combineReducers({
  MessageReducer,
});
export { rootReducer };
