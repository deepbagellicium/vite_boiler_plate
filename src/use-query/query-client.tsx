import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { setErrorMessageRedux } from "redux/Message/message.slice";
import store from "redux/store";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: { message: string }) => {
      store.dispatch(setErrorMessageRedux(error.message));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: { message: string }) => {
      store.dispatch(setErrorMessageRedux(error.message));
    },
  }),
});
