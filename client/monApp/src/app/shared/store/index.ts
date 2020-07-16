import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "./reducers/auth.reducer";

export interface State {
  auth: AuthState;
}

//Déclaration de tous nos reducers
export const reducersMap: ActionReducerMap<State> = {
  auth: authReducer,
};
