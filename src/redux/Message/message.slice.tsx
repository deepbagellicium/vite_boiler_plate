import { createSlice } from "@reduxjs/toolkit";
interface MessageState {
  errormessage: string;
  successmesssage: string;
  unauth: string;
}
const initialState: MessageState = {
  errormessage: "",
  successmesssage: "",
  unauth: "",
};
const MessageReducer = createSlice({
  name: "MessageReducer",
  initialState,
  reducers: {
    setErrorMessageRedux: (state, action) => {
      state.errormessage = action.payload;
    },
    setSuccessMessageRedux: (state, action) => {
      state.successmesssage = action.payload;
    },
    setUnAuthMessageRedux: (state, action) => {
      state.unauth = action.payload;
    },
    emptyMessageReducer: (state) => {
      state.errormessage = "";
      state.successmesssage = "";
      state.unauth = "";
    },
  },
});
export const {
  setErrorMessageRedux,
  emptyMessageReducer,
  setSuccessMessageRedux,
  setUnAuthMessageRedux,
} = MessageReducer.actions;
export default MessageReducer.reducer;
