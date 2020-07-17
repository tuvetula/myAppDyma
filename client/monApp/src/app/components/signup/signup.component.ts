import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { State } from "src/app/shared/store";
import { TrySignup } from "src/app/shared/store/actions/auth.actions";
import { authErrorSelector } from "src/app/shared/store/selectors/auth.selectors";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public errorSignup$: Observable<{ message: string }>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.errorSignup$ = this.store.pipe(select(authErrorSelector));
  }

  public submit(): void {
    this.errorSignup$ = of(null);
    //On verifie si les 2 mots de passes sont identiques
    if (
      this.signupForm.value.password === this.signupForm.value.confirmPassword
    ) {
      this.store.dispatch(
        new TrySignup({
          name: this.signupForm.value.name,
          firstName: this.signupForm.value.firstName,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
        })
      );
    } else {
      this.errorSignup$ = of<{ message: string }>({
        message: "Les 2 mots de passe ne sont pas identiques.",
      });
    }
  }
}
