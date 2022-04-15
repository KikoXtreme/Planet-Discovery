import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ICreateUserData } from 'src/app/core/interfaces';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  //no get!, make pass and repass in separate FormControl
  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'country': new FormControl(),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [passwordMatch(this.passwordControl)]),
    }),
  })


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleRegister(): void {
    const { username, email, passwords, country } = this.registerFormGroup.value;

    const body: ICreateUserData = {
      username: username,
      email: email,
      password: passwords.password,
      country: country,
    }

    this.authService.register$(body).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

  // navigateToLogin(): void {
  //   this.router.navigate(['/user/login']);
  // }


  //could be used in html ->
  // shouldShowFormControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup) {
  //   return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  // }

}
