import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import {
  setErrorMessageRedux,
  setSuccessMessageRedux,
} from "redux/Message/message.slice";
import store from "redux/store";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onSuccess: (data: any) => {
    //   store.dispatch(setSuccessMessageRedux("Query success 🎉"));
    // },
    onError: (error: { message: string }) => {
      store.dispatch(setErrorMessageRedux(error.message));
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data: any) => {
      store.dispatch(setSuccessMessageRedux("Mutation success 🎉"));
    },
    onError: (error: { message: string }) => {
      store.dispatch(setErrorMessageRedux(error.message));
    },
  }),
});
