import axios, { GenericAbortSignal } from "axios";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { config } from "config";
import {
  setErrorMessageRedux,
  setSuccessMessageRedux,
} from "./Message/message.slice";

/*
 * Axios Api Call Component
 * @type : GET POST PATCH DELETE
 * @api : Api config.path
 * @payload : Payload that need to be sent to server
 * @toolkit: dispatch, fulfillWithValue, rejectWithValue
 */
interface AxiosTypeStringType {
  get: string;
  post: string;
  put: string;
  patch: string;
  delete: string;
}
interface AxiosConfigType {
  method: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: Record<string, any>;
  signal?: GenericAbortSignal;
}

const AxiosClient = async (
  type: "get" | "post" | "put" | "patch" | "delete",
  api: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>,
  toolkit: {
    dispatch?: ThunkDispatch<unknown, unknown, Action>;
    getState?: () => unknown;
    extra?: unknown;
    requestId?: string;
    signal?: AbortSignal;
    abort?: (reason?: string | undefined) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rejectWithValue: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fulfillWithValue: any;
  },
  content = "application/json"
) => {
  const start = Date.now();

  const _accesstoken: string | null = null;

  const AxiosTypeString: AxiosTypeStringType = {
    get: "get",
    post: "post",
    put: "put",
    patch: "patch",
    delete: "delete",
  };
  if (config.AXIOS_LOGS) {
    console.log(
      "\x1b[1m\x1b[36m%s\x1b[0m",
      `axios client payload ===> ${JSON.stringify(payload)} ${api}`
    );
  }
  const axiosconfig: AxiosConfigType = {
    method: AxiosTypeString[type],
    url: `${config.API_URL}/${api}`,
    data: payload,
    params: payload,
    headers: {
      "Content-Type": content,
      ...(typeof _accesstoken === "string"
        ? { authorization: `Bearer ${_accesstoken}` }
        : {}),
    },
  };
  if (config.AXIOS_LOGS) {
    console.log(`Bearer ${_accesstoken}`);
  }
  if (AxiosTypeString[type] === "get" && payload) {
    delete axiosconfig.data;
  }
  if (config.AXIOS_LOGS) {
    console.log(`${JSON.stringify(axiosconfig)}`);
  }
  return await axios(axiosconfig)
    .then((response) => {
      const end = Date.now();
      const time = end - start;
      if (config.AXIOS_LOGS) {
        console.log(
          "\x1b[1m\x1b[33m%s\x1b[0m",
          `axios client success ===> ${api}\n`
        );
        console.log("\x1b[32m%s\x1b[0m", JSON.stringify(response.data));
      }
      if (AxiosTypeString[type] !== "get" && response?.data?.message) {
        if (toolkit.dispatch)
          toolkit.dispatch(setSuccessMessageRedux(response.data.message));
      }
      return toolkit.fulfillWithValue({
        ...response.data,
        success: true,
        executionTime: time,
      });
    })
    .catch((error) => {
      if (config.AXIOS_LOGS) {
        console.log(
          "\x1b[1m\x1b[31m%s\x1b[0m",
          `axios client error ===> ${api}\n`
        );
        console.log(
          "\x1b[1m\x1b[31m%s\x1b[0m",
          `axios client error ===> ${error}\n${config.API_URL}/${api}`
        );
      }
      if (error.response) {
        if (config.AXIOS_LOGS && axios.isCancel(error)) {
          console.log("\x1b[31m%s\x1b[0m", error.message);
        }
        if (config.AXIOS_LOGS) {
          console.log("\x1b[31m%s\x1b[0m", error.response.data);
        }
        if (error.response.data.status === 401) {
          if (toolkit.dispatch)
            toolkit.dispatch(setErrorMessageRedux("Session Expired!"));
        } else {
          if (toolkit.dispatch)
            toolkit.dispatch(setErrorMessageRedux(error.response.data.message));
        }
      } else if (error.request) {
        if (error?.includes("canceled")) {
          console.log("request canceled");
        } else if (toolkit.dispatch)
          toolkit.dispatch(setErrorMessageRedux("Internet Connection Issues"));
      } else {
        if (toolkit.dispatch)
          toolkit.dispatch(setErrorMessageRedux(error.message));
      }
      return toolkit.rejectWithValue(error.response.data.message);
    });
};
export { AxiosClient };
