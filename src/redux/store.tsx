import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "redux/rootreducer";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import encryptor from "./persist-encryptor";

// const persistConfig = {
//   key: "root",
//   storage,
//   transforms: [encryptor],
// };

// const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
//   persistConfig,
//   rootReducer
// );

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// export const persistor = persistStore(store);
export default store;
// export const onPurgePersist = () => {
//   persistStore(store).purge();
// };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
