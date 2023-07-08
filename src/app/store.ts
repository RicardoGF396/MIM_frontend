import { configureStore } from "@reduxjs/toolkit";
import filterExhibtionSlice from "./slices/ExhibitionSlice";

export const store = configureStore({
  reducer: {
    exhibition: filterExhibtionSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
