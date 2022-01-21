// @ts-nocheck
import { RootState } from "../../types";
import systemReducer from "./system/slice";

/* persist the data */
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { ISystemState } from "./system";
import {
  connectRouter,
  routerMiddleware,
  RouterState,
} from "connected-react-router";

export const history = createBrowserHistory<RouterState<ISystemState>>();

export const rootReducer = combineReducers({
  router: connectRouter<RouterState<ISystemState>>(history),
  system: systemReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureAppStore(initialState?: any) {
  /* configure middlewares */
  const middlewares = [routerMiddleware(history)];
  /* create store */
  return configureStore<RootState>({
    reducer: persistedReducer,
    middleware: middlewares,
    preloadedState: initialState,
  });
}

export const store = configureAppStore();

export * from "./system";
