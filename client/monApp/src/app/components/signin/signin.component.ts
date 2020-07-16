import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
import { Store, select } from '@ngrx/store';
import { State } from '../../shared/store/index';
import { TrySignin } from 'src/app/shared/store/actions/auth.actions';
import { Observable } from 'rxjs';
import { authErrorSelector } from 'src/app/shared/store/selectors/auth.selectors';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;
  public errorsForm: { email: string; password: string } = {
    email: "",
    password: "",
  };
  public errorsMessage: {} = {
    email: {
      required: "Ce champ est requis.",
      email: "Rentrez une adresse email valide.",
    },
    password: {
      minlength: "Le mot de passe est composé d'au moins 8 caractères.",
    },
  };
  public signinError$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<State> 
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.minLength(8)],
    });
    this.signinError$ = this.store.pipe(
      select(authErrorSelector)
    )
  }

  public submit(): void {
   this.store.dispatch(new TrySignin(this.signinForm.value));
  }

  private changeStatusForm(): Boolean {
    if (!this.signinForm) {
      return false;
    }
    const form = this.signinForm;
    for (const field in this.errorsForm) {
      this.errorsForm[field] = "";
      const control = form.get(field);

      if (control && control.dirty && control.invalid) {
        const messages = this.errorsMessage[field];
        for (const key in control.errors) {
          this.errorsForm[field] += messages[key] + " ";
        }
      }
    }
    if (this.errorsForm.email || this.errorsForm.password) {
      return true;
    } else {
      return false;
    }
  }
}
