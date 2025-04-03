import { createSlice } from "@reduxjs/toolkit";

interface MessageState {
  errorMessage: string;
  successMesssage: string;
  warningMessage: string;
}

const initialState: MessageState = {
  errorMessage: "",
  successMesssage: "",
  warningMessage: "",
};

const MessageReducer = createSlice({
  name: "MessageReducer",
  initialState,
  reducers: {
    setErrorMessageRedux: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessageRedux: (state, action) => {
      state.successMesssage = action.payload;
    },
    setWarningMessageRedux: (state, action) => {
      state.warningMessage = action.payload;
    },
    emptyMessageReducer: (state) => {
      state.errorMessage = "";
      state.successMesssage = "";
      state.warningMessage = "";
    },
  },
});

export const {
  setErrorMessageRedux,
  emptyMessageReducer,
  setSuccessMessageRedux,
} = MessageReducer.actions;

export default MessageReducer.reducer;
