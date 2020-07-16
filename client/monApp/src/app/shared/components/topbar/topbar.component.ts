import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { JwtToken } from "../../models/jwt-token.model";
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../../store';
import { authIsLoggedInSelector } from '../../store/selectors/auth.selectors';
import { Logout } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit , OnDestroy{
  public isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(
      select(authIsLoggedInSelector)
    )
  }

  public logout(){
    this.store.dispatch(new Logout());
  }

  ngOnDestroy(): void {
  }
}
