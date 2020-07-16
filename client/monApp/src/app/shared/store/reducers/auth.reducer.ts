import { User } from "../../models/user.model";
import { Action } from "@ngrx/store";
import {
  AuthActions,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  LOGOUT,
} from "../actions/auth.actions";

export interface AuthState {
  user: User;
  isLoggedIn: boolean;
  token: string;
  error: string;
  success: string;
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
      return { ...state, token: action.payload, isLoggedIn: true, error: null };
    }
    case SIGNIN_ERROR: {
      return { ...state, error: action.payload };
    }
    case LOGOUT: {
      return {
        user: null,
        isLoggedIn: false,
        token: null,
        error: null,
        success: null,
      };
    }
  }
  return state;
}
