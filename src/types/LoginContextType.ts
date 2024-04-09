import { Dispatch, SetStateAction } from "react";
import { InitialStateType } from "./LoginContextType";
export enum LoginActionKind {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SEARCH = "SEARCH",
}

export interface InitialStateType {
  isLogin: boolean;
  searchItem: string;
}

export interface ActionType {
  type: LoginActionKind;
  payload: any;
}

export interface loginContextType {
  stateValue: InitialStateType;
  dispatch: Dispatch<SetStateAction<ActionType>>;
}
