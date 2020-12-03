import { User } from "../models";
import { StateContext } from "./state";
import OneSignal from 'react-native-onesignal'; // Import package from node modules

export enum ActionType {
  SIGN_IN = 'Log out',
  SIGN_OUT = 'Sign out',
  SET_WHO_LIKES_ME = 'Who Likes Me',
  SET_MATCHES = "Set Matches",
  MY_PROFILE = "My Profile",
  SET_USER_DATA = "Set USER DATA",
  SET_COMPLETED = "SET COMPLETED",

}

export type Action =
  | { type: ActionType.SIGN_IN, payload: { completed: boolean, token: string } }
  | { type: ActionType.SIGN_OUT }
  | { type: ActionType.SET_USER_DATA, payload: { UserData: User } }
  | { type: ActionType.SET_COMPLETED, payload: { completed: boolean } }

  | { type: ActionType.SET_MATCHES, payload: { Matches: [User] } }
  | {
    type: ActionType.SET_WHO_LIKES_ME, payload: { whoLikesMe: [User] }

  };

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return { ...state, isAuthenticated: true, isCompletedRegister: action.payload.completed, token: action.payload.token }
    case ActionType.SIGN_OUT:
      OneSignal.removeExternalUserId()
      return { ...state, isAuthenticated: false }
    case ActionType.SET_COMPLETED:
      return { ...state, isCompletedRegister: action.payload.completed }
    case ActionType.SET_WHO_LIKES_ME:
      return { ...state, WhoLikesMe: action.payload.whoLikesMe }
    case ActionType.SET_USER_DATA:
      OneSignal.setExternalUserId(action.payload.UserData.id);
      return { ...state, UserData: action.payload.UserData }
    case ActionType.SET_MATCHES:
      return { ...state, Matches: action.payload.Matches }
    default:
      throw new Error('Not among actions');
  }
}