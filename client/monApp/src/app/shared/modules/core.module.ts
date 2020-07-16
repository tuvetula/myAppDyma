//Modules
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './layout.module';
//Services
import { AuthService } from '../services/auth.service';
//Interceptors
import { AuthInterceptor } from '../interceptors/auth.interceptor';
//Components
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { SigninComponent } from 'src/app/components/signin/signin.component';
import { TopbarComponent } from '../components/topbar/topbar.component';

const COMPONENTS = [
  PageNotFoundComponent,
  HomepageComponent,
  SignupComponent,
  SigninComponent,
  TopbarComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    LayoutModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: COMPONENTS,
  providers:[
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule { }
