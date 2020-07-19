import { User } from "../../models/user.model";
import {
  AuthActions,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  LOGOUT,
  SET_CURRENT_USER,
  SIGNIN_RESET_ERROR_SUCCESS,
} from "../actions/auth.actions";
import { LOCAL_STORAGE_TOKEN } from '../../models/jwt-token.model';

export interface AuthState {
  user: User;
  isLoggedIn: boolean;
  token: string;
  error: string;
  success: {message:string};
}

export const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    token: localStorage.getItem(LOCAL_STORAGE_TOKEN),
    error: null,
    success: null
}

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
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
    case SIGNIN_RESET_ERROR_SUCCESS: {
      return { ...state, error: null , success: null}
    }
    case LOGOUT: {
      return {
        user: null,
        isLoggedIn: false,
        token: null,
        error: null,
        success: null
      };
    }
    case SET_CURRENT_USER: {
        return {
            ...state,
            user: action.payload
        }
    }
  }
  return state;
}
