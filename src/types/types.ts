import { RouterState } from "connected-react-router";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import { Reducer } from "redux";
import { History } from "history";
import { ISystemState, rootReducer } from "../state-mgmt";

export interface IState {
  system: ISystemState;
  router: (
    history: History<RouterState<ISystemState>>
  ) => Reducer<RouterState<RouterState<ISystemState>>>;
}

export type RootState = ReturnType<typeof rootReducer>;

export type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
