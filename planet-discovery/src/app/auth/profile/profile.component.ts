import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm

  currentUser: IUser;
  isEdited: boolean = false;
  currentUser$: Observable<IUser> = this.authService.currentUser$;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/home']);
      }
    })
  }

  editMode(currentUser: IUser): void {
    this.isEdited = true;

    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        username: this.currentUser.username,
        email: this.currentUser.email,
        country: this.currentUser.country,
      })
    });

  }

  updateProfile(): void {
    // TODO continue
    console.log(this.editProfileForm.value);
    console.log(this.currentUser);
    this.isEdited = false;


    this.userService.updateProfile$(this.currentUser, this.editProfileForm.value).pipe(first()).subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/home']);
      }
    })
  }
  
}

// this.store.dispatch(updateProfileStarted({
//   user: {
  // this.authService.currentUser$ = { 
  //   // username: this.editProfileForm.value.username,
  //   email: this.editProfileForm.value.email,
  //   country: this.editProfileForm.value.country,
    // profilePicture: this.newProfilePicture,

  // }
  // }
// }));