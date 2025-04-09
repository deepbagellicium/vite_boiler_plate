import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_PATHS, RequestMethods } from "config/enums";
import { AxiosClient } from "redux/AxiosClient";

export const loginUserAsync = createAsyncThunk(
  "boiler/loginUserAsync",
  async (payload: any, toolkit) => {
    return await AxiosClient(
      RequestMethods.POST,
      API_PATHS.LOGIN_USER,
      payload,
      toolkit
      // "multipart/form-data"
    );
  }
);
