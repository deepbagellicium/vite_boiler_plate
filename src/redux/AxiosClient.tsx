import axios, { GenericAbortSignal } from "axios";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { config } from "config";
import {
  setErrorMessageRedux,
  setSuccessMessageRedux,
  setUnAuthMessageRedux,
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
  data?: {
    [key: string]: any;
  };
  params?: {
    [key: string]: any;
  };
  headers: {
    [key: string]: any;
  };
  signal: GenericAbortSignal;
}

let ongoingRequests: Record<string, any> = {};

export const cancelRequest = (apiName: string) => {
  if (ongoingRequests[apiName]) {
    console.log(ongoingRequests[apiName]);
    ongoingRequests[apiName].abort();
    delete ongoingRequests[apiName];
    console.log(`${apiName} aborted`);
  }
};

const AxiosClient = async (
  type: "get" | "post" | "put" | "patch" | "delete",
  api: string,
  payload: {
    [key: string]: any;
  },
  toolkit: {
    dispatch?: ThunkDispatch<unknown, unknown, AnyAction>;
    getState?: () => unknown;
    extra?: unknown;
    requestId?: string;
    signal?: AbortSignal;
    abort?: (reason?: string | undefined) => void;
    rejectWithValue: any;
    fulfillWithValue: any;
  },
  content = "application/json"
) => {
  const start = Date.now();
  // axios manually abort method axios
  const abort = new AbortController();
  ongoingRequests[api] = abort;
  if (!ongoingRequests[api]) cancelRequest(api);

  const _accesstoken = null;
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
  let axiosconfig: AxiosConfigType = {
    method: AxiosTypeString[type],
    url: `${config.API_URL}/${api}`,
    data: payload,
    params: payload,
    headers: {
      "Content-Type": content,
      ...(_accesstoken && { authorization: `Bearer ${_accesstoken}` }),
    },
    signal: abort.signal,
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
      delete ongoingRequests[api];
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
            toolkit.dispatch(setUnAuthMessageRedux("Session Expired!"));
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
      delete ongoingRequests[api];
      return toolkit.rejectWithValue(error.response.data.message);
    });
};
export { AxiosClient };
