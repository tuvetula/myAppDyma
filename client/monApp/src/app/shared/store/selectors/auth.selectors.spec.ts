import * as authSelectors from "./auth.selectors";
import { State } from "..";

const state: State = {
  auth: {
    user: null,
    isLoggedIn: false,
    token: null,
    error: null,
    success: { message: null },
  },
};

describe("AUTH SELECTORS", () => {
  //SUCCESS
  describe("authSuccessSelector", () => {
    it("should return state.auth.success", () => {
      const mockState: State = {
        ...state,
        auth: {
          ...state.auth,
          success: { message: "success" },
        },
      };
      expect(authSelectors.authSuccessSelector(mockState)).toEqual(
        mockState.auth.success
      );
    });
    it("should return null", () => {
      const mockState: State = state;
      expect(authSelectors.authSuccessSelector(mockState)).toEqual({
        message: null,
      });
    });
  });
  //ERROR
  describe("authErrorSelector", () => {
    it("should return state.auth.error", () => {
      const mockState: State = {
        ...state,
        auth: {
          ...state.auth,
          error: "error"
        },
      };
      expect(authSelectors.authErrorSelector(mockState)).toEqual(
        mockState.auth.error
      );
    });
    it("should return null", () => {
      const mockState: State = state;
      expect(authSelectors.authErrorSelector(mockState)).toEqual(null);
    });
  });
  // TOKEN
  describe("authTokenSelector", () => {
    it("should return state.auth.token", () => {
      const mockState: State = {
        ...state,
        auth: {
          ...state.auth,
          token: "token",
        },
      };
      expect(authSelectors.authTokenSelector(mockState)).toEqual(
        mockState.auth.token
      );
    });
    it("should return null", () => {
      const mockState: State = state;
      expect(authSelectors.authTokenSelector(mockState)).toEqual(null);
    });
  });
  // ISLOGGEDIN
  describe("authIsLoggedInSelector", () => {
    it("should return state.auth.isLoggedIn", () => {
      const mockState: State = {
        ...state,
        auth: {
          ...state.auth,
          isLoggedIn: true,
        },
      };
      expect(authSelectors.authIsLoggedInSelector(mockState)).toEqual(
        mockState.auth.isLoggedIn
      );
    });
    it("should return false", () => {
      const mockState: State = state;
      expect(authSelectors.authIsLoggedInSelector(mockState)).toEqual(false);
    });
  });
  // USER
  describe("authCurrentUserSelector", () => {
    it("should return state.auth.user", () => {
      const mockState: State = {
        ...state,
        auth: {
          ...state.auth,
          user: {
            name: "name",
            firstName: "firstName",
            email: "test@test.fr",
            password: "password",
          },
        },
      };
      expect(authSelectors.authCurrentUserSelector(mockState)).toEqual(
        mockState.auth.user
      );
    });
    it("should return false", () => {
      const mockState: State = state;
      expect(authSelectors.authCurrentUserSelector(mockState)).toEqual(null);
    });
  });
});
