import { User } from "../../models/user.model";
import { Action } from "@ngrx/store";
import {
  AuthActions,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
} from "../actions/auth.actions";

export interface AuthState {
  user: User;
  token: string;
  error: string;
  success: string;
  isLoggedIn: boolean;
}

export function authReducer(state: AuthState, action: AuthActions) {
  switch (action.type) {
    case SIGNUP_SUCCESS: {
      return { ...state, success: action.payload };
    }
    case SIGNUP_ERROR: {
      return { ...state, error: action.payload };
    }
    case SIGNIN_SUCCESS: {
        return { ...state , token: action.payload , isLoggedIn: true , error: null}
    }
    case SIGNIN_ERROR: {
      return { ...state, error: action.payload };
    }
  }
  return state;
}
