import { RootState } from "../../types";
import systemReducer from "./system/slice";
import notificationReducer from "./notification/slice";

/* persist the data */
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { ISystemState } from "./system";
import {
  connectRouter,
  routerMiddleware,
  RouterState, // @ts-ignore
} from "connected-react-router";

//@ts-ignore
export const history = createBrowserHistory<RouterState<ISystemState>>();

export const rootReducer = combineReducers({
  router: connectRouter<RouterState<ISystemState>>(history),
  system: systemReducer,
  notifications: notificationReducer,
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
    //@ts-ignore
    reducer: persistedReducer,
    //@ts-ignore
    middleware: middlewares,
    preloadedState: initialState,
  });
}

export const store = configureAppStore();

export * from "./system";
export * from "./notification";
