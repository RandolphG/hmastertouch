import { IState } from "../../../types";

export const selectSystemState = (state: IState) => {
  return state.system;
};
