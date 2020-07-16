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
  TryRefreshToken,
  TRY_REFRESH_TOKEN,
} from "../actions/auth.actions";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { of, Subscription, empty } from "rxjs";
import { CredentialModel } from "../../models/credential.model";

@Injectable()
export class AuthEffects {
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

  //Effet suite au dispatch de l'action trySignin,
  //On tente la connexion, recupere le token et lance l'action signinSuccess
  @Effect() trySignin$ = this.actions$.pipe(
    ofType(TRY_SIGNIN),
    map((action: TrySignin) => action.payload),
    switchMap((credentials: CredentialModel) => {
      return this.authService.signin(credentials);
    }),
    map((token: string) => {
      localStorage.setItem("jwtToken", token);
      return new SigninSuccess(token);
    }),
    catchError((error: any) => {
      return of(new SigninError(error));
    })
  );

  //Effet suite au dispatch de l'action signinSuccess,
  //On lance le timer pour refreshToken si le timer n'est pas déja subscribe
  //On indique que cet effet ne lancera pas de nouvelle action
  @Effect({dispatch: false}) signinSuccess$ = this.actions$.pipe(
    ofType(SIGNIN_SUCCESS),
    tap(() => {
        if(!this.timerSubscription){
            this.timerSubscription = this.authService.initTimer().subscribe();
        }
        this.router.navigate(['/'])
    })
  );

  //Effet suite au dispatch de l'action tryRefreshToken,
  //On tente de refresh le token avec la requete http et lance l'action SigninSuccess
  @Effect() tryRefreshToken$ = this.actions$.pipe(
    ofType(TRY_REFRESH_TOKEN),
    switchMap(() => {
      return this.authService.refreshToken();
    }),
    map((token: string) => {
        localStorage.setItem("jwtToken", token);
        return new SigninSuccess(token);
      }),
      catchError((error: any) => {
          localStorage.removeItem('jwtToken');
          if(this.timerSubscription){
              this.timerSubscription.unsubscribe();
          }
          return empty();
      })
  );
  private timerSubscription: Subscription;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
