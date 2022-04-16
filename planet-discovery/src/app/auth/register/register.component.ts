import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ICreateUserData } from 'src/app/core/interfaces';
import { emailValidator, passMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // get not needed if  pass and repass in separate FormControl
  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }
  
  passControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'country': new FormControl(),
    'passwords': new FormGroup({
      'password': this.passControl,
      'repass': new FormControl(null, [passMatch(this.passControl)]),
    }),
  })


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleRegister(): void {
    // const { username, email, passwords, country } = this.registerFormGroup.value;
    const body: ICreateUserData = {
      username: this.registerFormGroup.value.username,
      email: this.registerFormGroup.value.email,
      password: this.registerFormGroup.value.passwords.password,
      country: this.registerFormGroup.value.country,
    }

    this.authService.register$(body).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

}
