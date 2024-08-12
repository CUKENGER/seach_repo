import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { repoApi } from "../api/RepoService";

export const rootReducer = combineReducers({
  [repoApi.reducerPath]: repoApi.reducer
})

export type RootReducerState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(repoApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
