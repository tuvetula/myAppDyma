import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public errorSignup: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('' , [Validators.required , Validators.minLength(2)]),
      firstName: new FormControl('' , [Validators.required , Validators.minLength(2)]),
      email: new FormControl('' , [Validators.required , Validators.email]),
      password: new FormControl('' , [Validators.required , Validators.minLength(6)]),
      confirmPassword: new FormControl('' , [Validators.required , Validators.minLength(6)])
    })
  }

  public submit(): void {
    this.authService.signup(this.signupForm.value).subscribe(
      (user: User) => this.router.navigate(['/signin']),
      (error) => this.errorSignup = error.error
    );
  }

}
