import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileModule } from './profile/profile.module';
//Components
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomepageComponent } from './components/homepage/homepage.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

//Guards
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: "", component: HomepageComponent, pathMatch: "full" },
  { path: "signin" , component: SigninComponent },
  { path: "signup" , component: SignupComponent },
  { path: "profile" , canActivate:[AuthGuard] , loadChildren: () => ProfileModule},
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

