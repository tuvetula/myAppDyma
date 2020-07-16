import { Injectable } from "@angular/core";
import { Observable, Subscription, interval } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { State } from '../store';
import { Store } from '@ngrx/store';
import { TryRefreshToken } from '../store/actions/auth.actions';
import { CredentialModel } from '../models/credential.model';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public timerSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private store: Store<State>,
    ) {
  }

  //Fonction gérant le refresh-token
  public initTimer(){
    return interval(5000).pipe(
      tap(() => {
        this.store.dispatch(new TryRefreshToken());
      })
    )
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>("/api/auth/signup", user);
  }

  public signin(credentials: CredentialModel): Observable<string> {
    return this.http.post<string>("/api/auth/signin", credentials);
  }

  public refreshToken(): Observable<string> {
    return this.http.get<string>('api/auth/refresh-token');
  }
}
