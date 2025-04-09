import {
  isAnyOf,
  AsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

/**
 * Generates matchers for handling async thunks' states (pending, fulfilled, rejected)
 * and directly registers them in the Redux builder.
 */
export function createAsyncMatchers<T>(
  builder: ActionReducerMapBuilder<any>,
  asyncThunk: AsyncThunk<T, any, any>,
  handlers: {
    onPending: (state: any) => void;
    onFulfilled: (state: any, action: PayloadAction<T>) => void;
    onRejected: (state: any) => void;
  }
): void {
  builder.addMatcher(isAnyOf(asyncThunk.pending), handlers.onPending);
  builder.addMatcher(isAnyOf(asyncThunk.fulfilled), handlers.onFulfilled);
  builder.addMatcher(isAnyOf(asyncThunk.rejected), handlers.onRejected);
}
