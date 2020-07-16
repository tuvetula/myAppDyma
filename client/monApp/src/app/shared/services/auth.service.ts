import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subscription, interval } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { JwtToken } from "../models/jwt-token.model";
import { tap } from "rxjs/operators";
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { State } from '../store';
import { Store } from '@ngrx/store';
import { TryRefreshToken } from '../store/actions/auth.actions';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    token: null,
  });
  public timerSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private store: Store<State>,
    private router: Router) {
    // this.initToken();
  }

  //Fonction gérant le refresh-token
  public initTimer(){
    return interval(2000).pipe(
      tap(() => {
        this.store.dispatch(new TryRefreshToken());
      })
    )
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if(token){
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      })
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>("/api/auth/signup", user);
  }

  public signin(credentials: {
    email: string;
    password: string;
  }): Observable<string> {
    return this.http.post<string>("/api/auth/signin", credentials);
  }

  public refreshToken(): Observable<string> {
    return this.http.get<string>('api/auth/refresh-token');
  }

  public logout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
  }
}
