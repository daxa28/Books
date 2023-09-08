import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/booksSlice";
import bookReducer from "./slices/bookSlice";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "./saga/index";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  booksReduser: booksReducer,
  bookReduser: bookReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
