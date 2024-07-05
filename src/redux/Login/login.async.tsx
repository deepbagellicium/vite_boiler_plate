import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosClient } from "redux/AxiosClient";
import { API_PATHS } from "redux/Enums/apis.path";
import { RequestMethods } from "redux/Enums/request.methods";

export const loginUserAsync = createAsyncThunk(
  "accuhire/loginUserAsync",
  async (payload:any, toolkit) => {
    return await AxiosClient(
      RequestMethods.POST,
      API_PATHS.LOGIN_USER,
      payload,
      toolkit,
      // "multipart/form-data"
    );
  }
);
