import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { State } from "../store";
import { Store, select } from "@ngrx/store";
import { authTokenSelector } from "../store/selectors/auth.selectors";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string;
  constructor(private store: Store<State>) {
    this.store.pipe(
      select(authTokenSelector)
    ).subscribe((token: string) => this.token = token);
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token) {
      const authReq = req.clone({
        headers: req.headers.set("authorization", this.token),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
