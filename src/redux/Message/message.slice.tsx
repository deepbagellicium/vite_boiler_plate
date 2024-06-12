import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

interface MessageInitialInterface {
  message: string;
}

const initialState: MessageInitialInterface = {
  message: "",
};

const MessageReducer = createSlice({
  name: "MessageReducer",
  initialState,
  reducers: {},
});

export const {} = MessageReducer.actions;
export default MessageReducer.reducer;
