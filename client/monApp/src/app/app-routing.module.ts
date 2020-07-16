import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//Components
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

//Guards
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: "", component: HomepageComponent, pathMatch: "full" },
  { path: "signin" , component: SigninComponent },
  { path: "signup" , component: SignupComponent },
  { path: "profile" , component: ProfileComponent , canActivate:[AuthGuard]},
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

