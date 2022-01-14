import { RouterState } from "connected-react-router";
import { Reducer } from "redux";
import { History } from "history";
import { ISystemState, INotifications, rootReducer } from "../state-mgmt";

export interface IState {
  system: ISystemState;
  notifications: INotifications;
  router: (
    history: History<RouterState<ISystemState>>
  ) => Reducer<RouterState<RouterState<ISystemState>>>;
}

export type RootState = ReturnType<typeof rootReducer>;
