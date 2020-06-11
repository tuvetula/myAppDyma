import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { JwtToken } from "../../models/jwt-token.model";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit , OnDestroy{
  public tokenSubscription: Subscription;
  public jwtToken: JwtToken;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.tokenSubscription = this.authService.jwtToken.subscribe(
      (jwtToken: JwtToken) => this.jwtToken = jwtToken
    )
  }

  public logout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if(this.tokenSubscription){
      this.tokenSubscription.unsubscribe();
    }
  }

}
