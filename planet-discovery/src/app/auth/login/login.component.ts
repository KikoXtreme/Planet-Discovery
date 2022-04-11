import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { emailValidator } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  loginFormGroup: FormGroup = this.formBuilder.group({
    // 'email': new FormControl(null, [Validators.required, emailValidator]),
    email: ['', [Validators.required, emailValidator, /*Validators.pattern(/.{6,}@gmail\.(bg|com)/)*/]],
    // 'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    password: ['', [Validators.required, Validators.minLength(5)]]
  })

  ngOnInit(): void {
  }

  handleLogin(): void {
    this.errorMessage = '';
    this.authService.login$(this.loginFormGroup.value).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      complete: () => {
        console.log('Login Completed!')
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/user/register']);
  }
}
