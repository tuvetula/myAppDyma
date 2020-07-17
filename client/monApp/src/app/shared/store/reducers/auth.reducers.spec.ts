import * as authReducers from "./auth.reducer";
import * as authActions from "../actions/auth.actions";
import { User } from '../../models/user.model';

describe("AUTH REDUCERS", () => {
  it("should return initial state", () => {
    const initialState = authReducers.initialState;
    const action: any = {};
    expect(authReducers.authReducer(undefined, action)).toEqual(initialState);
  });
  it("should return SIGNUP_SUCCESS", () => {
    const initialState = authReducers.initialState;
    const action = new authActions.SignupSuccess({message:'succès'});
    const newState = authReducers.authReducer(initialState,action);
    expect(newState.success).toEqual({message:'succès'});
  });
  it("should return SIGNUP_ERROR", () => {
    const initialState = authReducers.initialState;
    const action = new authActions.SignupError({message:'error'});
    const newState = authReducers.authReducer(initialState,action);
    expect(newState.error).toEqual({message:'error'});
  });
  it("should return SIGNIN_SUCCESS", () => {
    const initialState = authReducers.initialState;
    const action = new authActions.SigninSuccess('token');
    const newState = authReducers.authReducer(initialState,action);
    expect(newState.token).toEqual('token');
  });
  it("should return SIGNIN_ERROR", () => {
    const initialState = authReducers.initialState;
    const action = new authActions.SigninError({message:'error'});
    const newState = authReducers.authReducer(initialState,action);
    expect(newState.error).toEqual({message:'error'});
  });
  it("should return LOGOUT", () => {
    const initialState = authReducers.initialState;
    const action = new authActions.Logout();
    const newState = authReducers.authReducer(initialState,action);
    expect(newState).toEqual({
        user: null,
        isLoggedIn: false,
        token: null,
        error: null,
        success: null
    });
  });
  it("should return SET_CURRENT_USER", () => {
    const initialState = authReducers.initialState;
    const user: User = {
        name: 'test',
        firstName: 'firstname',
        email:'test@test.fr',
        password: 'password'
    };
    const action = new authActions.SetCurrentUser(user);
    const newState = authReducers.authReducer(initialState,action);
    expect(newState.user).toEqual(user);
  });
});
