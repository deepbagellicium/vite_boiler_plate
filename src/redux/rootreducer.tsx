import { combineReducers } from "@reduxjs/toolkit";
import MessageReducer from "./Message/message.slice";

const rootReducer = combineReducers({
  MessageReducer,
});
export { rootReducer };
