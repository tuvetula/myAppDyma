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
      if (authState && authState.success) {
        return authState.success;
      }
    }
  );
  export const authTokenSelector = createSelector(
    authSelector,
    (authState: AuthState) => {
      if (authState) {
        return authState.token;
      }
    }
  );
  export const authIsLoggedInSelector = createSelector(
    authSelector,
    (authState: AuthState) => {
      if (authState) {
        return authState.isLoggedIn;
      }
    }
  );

