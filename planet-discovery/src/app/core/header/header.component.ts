import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  message: string;
  isMessageError: boolean;

  private isLoggedOut: boolean = false;

  private subscription: Subscription;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.subscription = this
  }

  logoutHandler(): void {
    if (this.isLoggedOut) {
      return;
    }
    this.isLoggedOut = true;

    this.authService.logout$().subscribe({
      complete: () => {
        this.isLoggedOut = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoggedOut = false;
      }
    })
  }
}
