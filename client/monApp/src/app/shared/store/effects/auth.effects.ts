import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import {
  TRY_SIGNUP,
  TrySignup,
  SignupError,
  SignupSuccess,
  TRY_SIGNIN,
  TrySignin,
  SigninError,
  SigninSuccess,
  SIGNIN_SUCCESS,
  TRY_REFRESH_TOKEN,
  LOGOUT,
  TRY_FETCH_CURRENT_USER,
  SetCurrentUser,
  SET_CURRENT_USER,
} from "../actions/auth.actions";
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { of, Subscription, empty } from "rxjs";
import { CredentialModel } from "../../models/credential.model";
import { LOCAL_STORAGE_TOKEN } from "../../models/jwt-token.model";
import { Store, select } from "@ngrx/store";
import { State } from "..";
import { authTokenSelector } from "../selectors/auth.selectors";
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthEffects {
  //Effet suite au dispatch de l'action trySignup,
  //On tente l'enregistrement, redirige l'utilisateur et lance l'action SignupSuccess
  @Effect() trySignup$ = this.actions$.pipe(
    ofType(TRY_SIGNUP),
    map((action: TrySignup) => action.payload),
    switchMap((user: User) => {
      return this.authService.signup(user);
    }),
    switchMap(() => {
      this.router.navigate(["/signin"]);
      return of(new SignupSuccess("Inscription réussite"));
    }),
    catchError((error) => {
      return of(new SignupError(error));
    })
  );

  //TRY SIGNIN
  //Effet suite au dispatch de l'action trySignin,
  //On tente la connexion, recupere le token et lance l'action signinSuccess
  @Effect() trySignin$ = this.actions$.pipe(
    ofType(TRY_SIGNIN),
    map((action: TrySignin) => action.payload),
    switchMap((credentials: CredentialModel) => {
      return this.authService.signin(credentials);
    }),
    map((token: string) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      return new SigninSuccess(token);
    }),
    catchError((error: any) => {
      return of(new SigninError(error));
    })
  );

  //SIGNIN SUCCESS
  //Effet suite au dispatch de l'action signinSuccess,
  //On lance le timer pour refreshToken si le timer n'est pas déja subscribe
  //On indique que cet effet ne lancera pas de nouvelle action
  @Effect({ dispatch: false }) signinSuccess$ = this.actions$.pipe(
    ofType(SIGNIN_SUCCESS),
    tap(() => {
      if (!this.timerSubscription) {
        this.timerSubscription = this.authService.initTimer().subscribe();
        this.router.navigate(["/"]);
      }
    })
  );

  //TRY REFRESH TOKEN
  //Effet suite au dispatch de l'action tryRefreshToken,
  //On tente de refresh le token avec la requete http et lance l'action SigninSuccess
  @Effect() tryRefreshToken$ = this.actions$.pipe(
    ofType(TRY_REFRESH_TOKEN),
    withLatestFrom(this.store.pipe(select(authTokenSelector))),
    switchMap(([action, token]) => {
      if (token) {
        return this.authService.refreshToken().pipe(
          map((token: string) => {
            localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
            return new SigninSuccess(token);
          }),
          catchError((error: any) => {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN);
            if (this.timerSubscription) {
              this.timerSubscription.unsubscribe();
            }
            return empty();
          })
        );
      } else {
        return empty();
      }
    })
  );

  //Effet suite au dispatch de l'action logout,
  //On unsubscribe au timer, remove local storage et redirige sur page d'accueil
  @Effect({ dispatch: false }) logout$ = this.actions$.pipe(
    ofType(LOGOUT),
    tap(() => {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      this.router.navigate(["/"]);
    })
  );

  //Effet suite au dispatch de l'action fetchCurrentUser
  @Effect() fetchCurrentUser$ = this.actions$.pipe(
      ofType(TRY_FETCH_CURRENT_USER),
      switchMap(() => {
          return this.userService.getCurrentUser();
      }),
      map((user: User) => {
          return new SetCurrentUser(user);
      }),
      catchError((error: any) => {
          return of(error);
      })
  )
  
  private timerSubscription: Subscription;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {}
}
