import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

export const authSelector = createFeatureSelector("auth");
export const authErrorSelector = createSelector(
  authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.error;
    } else {
      return null;
    }
  }
);
export const authSuccessSelector = createSelector(
  authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.success;
    } else {
      return null;
    }
  }
);
export const authTokenSelector = createSelector(
  authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.token;
    } else {
      return null;
    }
  }
);
export const authIsLoggedInSelector = createSelector(
  authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.isLoggedIn;
    } else {
      return false;
    }
  }
);
export const authCurrentUserSelector = createSelector(
  authSelector,
  (authState: AuthState) => {
    if (authState) {
      return authState.user;
    } else {
      return null;
    }
  }
);
