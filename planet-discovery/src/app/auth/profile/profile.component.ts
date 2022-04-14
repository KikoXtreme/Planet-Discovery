import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first, mergeMap, Observable } from 'rxjs';
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

  newProfilePicture?: File;

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

  updateProfile(editProfileForm: NgForm): void {
    this.userService.updateProfile$(editProfileForm.value).pipe().subscribe({
      next: (currentUser) => {
        this.currentUser = currentUser;
        this.isEdited = false;
        window.location.reload();
      },
      error: () => {
        this.router.navigate(['/home']);
      }
    })
  }

  // profilePictureChange(event: InputEvent) {
  //   const input: HTMLInputElement = event.target as HTMLInputElement;
  //   this.newProfilePicture = input.files[0];
  //   console.log(input)
  //   console.log(this.newProfilePicture)
  // }
}