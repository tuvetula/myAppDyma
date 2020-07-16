import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, timer, EMPTY, Subscription } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { JwtToken } from "../models/jwt-token.model";
import { tap, switchMap } from "rxjs/operators";
import { UserService } from './user.service';
import { Router } from '@angular/router';

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
    private router: Router) {
    this.initToken();
    this.timerSubscription = this.initTimer();
  }

  //Fonction gérant le refresh-token
  private initTimer(){
    return timer(2000 , 20000).pipe(
      switchMap(() => {
        if(localStorage.getItem('jwt')){
          console.log('try refresh token');
          return this.http.get<string>('api/auth/refresh-token').pipe(
            tap((token: string) => {
              this.jwtToken.next({isAuthenticated: true , token: token});
              localStorage.setItem('jwt',token);
            })
          )
        } else {
          console.log('no token to refresh');
          this.timerSubscription.unsubscribe();
          return EMPTY;
        }
      })
    ).subscribe(
      () => {},
      error => {
        this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
      localStorage.removeItem('jwt');
      this.timerSubscription.unsubscribe();
    }
    );
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
    return this.http.post<string>("/api/auth/signin", credentials).pipe(
      tap((token: string) => {
        this.jwtToken.next({
          isAuthenticated: true,
          token: token,
        });
        localStorage.setItem("jwt", token);
        this.timerSubscription = this.initTimer();
      })
    );
  }

  public logout(){
    this.jwtToken.next({
      isAuthenticated: false,
      token: null
    });
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
    this.userService.currentUser.next(null);
  }
}
