import * as authActions from "./auth.actions";

describe("AUTH ACTIONS", () => {
  describe("TrySignup action", () => {
    it("should create trySignup action", () => {
      const payload = {
        name: "name",
        firstName: "firstname",
        email: "test@test.fr",
        password: "testpassword",
      };
      const action = new authActions.TrySignup(payload);
      expect({ ...action }).toEqual({
        type: authActions.TRY_SIGNUP,
        payload: payload,
      });
    });
  });
  describe("SignupSuccess action", () => {
    it("should create SignupSuccess action", () => {
      const payload = { message: "signup succès" };
      const action = new authActions.SignupSuccess(payload);
      expect({ ...action }).toEqual({
        type: authActions.SIGNUP_SUCCESS,
        payload: payload,
      });
    });
  });
  describe("SignupError action", () => {
    it("should create SignupError action", () => {
      const payload = "signup error";
      const action = new authActions.SignupError(payload);
      expect({ ...action }).toEqual({
        type: authActions.SIGNUP_ERROR,
        payload: payload,
      });
    });
  });
  describe("TrySignin action", () => {
    it("should create trySignin action", () => {
      const payload = {
        email: "test@test.fr",
        password: "testpassword",
      };
      const action = new authActions.TrySignin(payload);
      expect({ ...action }).toEqual({
        type: authActions.TRY_SIGNIN,
        payload: payload,
      });
    });
  });
  describe("SigninSuccess action", () => {
    it("should create SigninSuccess action", () => {
      const payload = "token";
      const action = new authActions.SigninSuccess(payload);
      expect({ ...action }).toEqual({
        type: authActions.SIGNIN_SUCCESS,
        payload: payload,
      });
    });
  });
  describe("SigninError action", () => {
    it("should create SigninError action", () => {
      const payload = "signin error";
      const action = new authActions.SigninError(payload);
      expect({ ...action }).toEqual({
        type: authActions.SIGNIN_ERROR,
        payload: payload,
      });
    });
  });
  describe("TryRefreshToken action", () => {
    it("should create TryRefreshToken action", () => {
      const action = new authActions.TryRefreshToken();
      expect({ ...action }).toEqual({
        type: authActions.TRY_REFRESH_TOKEN,
      });
    });
  });
  describe("Logout action", () => {
    it("should create Logout action", () => {
      const action = new authActions.Logout();
      expect({ ...action }).toEqual({
        type: authActions.LOGOUT,
      });
    });
  });
  describe("TryFetchCurrentUser action", () => {
    it("should create TryFetchCurrentUser action", () => {
      const action = new authActions.TryFetchCurrentUser();
      expect({ ...action }).toEqual({
        type: authActions.TRY_FETCH_CURRENT_USER,
      });
    });
  });
  describe("SetCurrentUser action", () => {
    it("should create SetCurrentUser action", () => {
      const payload = {
        name: "name",
        firstName: "firstname",
        email: "test@test.fr",
        password: "testpassword",
      };
      const action = new authActions.SetCurrentUser(payload);
      expect({ ...action }).toEqual({
        type: authActions.SET_CURRENT_USER,
        payload: payload,
      });
    });
  });
});
