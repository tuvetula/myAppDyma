// Modules natifs
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

//Modules
import { LayoutModule } from './shared/layout/layout.module';

//Routing
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { TopbarComponent } from './shared/components/topbar/topbar.component';

//Services
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomepageComponent,
    SignupComponent,
    SigninComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
