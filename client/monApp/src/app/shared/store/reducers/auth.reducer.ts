import { User } from '../../models/user.model';
import { Action } from '@ngrx/store';

export interface AuthState {
    user: User;
    token: string;
    error: string;
    isLoggedIn: boolean;
};

export function authReducer(state: AuthState , action: Action){
    return state;
}