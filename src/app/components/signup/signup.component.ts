import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccount } from '../../models/UserAccount';
import { CustomValidators } from './custom-validators';
import { UserAccountService } from '../../services/user-account.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userAccountService: UserAccountService,
    private router: Router
  ) { }
  ngOnInit(): void { }

  error?: string;
  newUser: UserAccount = new UserAccount();

  signupForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required]),
    role: new FormControl(null)

  },
    { validators: CustomValidators.confirmPasswords })



  // registrationErrors: false;
  // registraionErrMsg: "There were problems registering this user.";

  signup() {
    if (this.signupForm.valid) {

      this.newUser.email = this.email.value;
      this.newUser.username = this.username.value
      this.newUser.password = this.password.value;
      this.newUser.role = 'user';
      // console.log(this.newUser)

      this.userAccountService.create(
        this.newUser
      //   {
      //   // email: this.email.value,
      //   // username: this.username.value,
      //   // password: this.password.value,
      //   // role: 'user'
      // }
      ).pipe(
        tap(() => this.router.navigate(['landing', 'login']))
      ).subscribe({
        next:x=>{
          // console.log(x)

        },
        error:c=>console.log(c)
      });
    }
  }

  get email(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }
  get username(): FormControl {
    return this.signupForm.get('username') as FormControl;
  }
  get password(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }
  get confirmPassword(): FormControl {
    return this.signupForm.get('confirmPassword') as FormControl;
  }
  get role(): FormControl {
    return this.signupForm.get('role') as FormControl;
  }



}
