import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) { }

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

  editMode(): void {
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
    this.isEdited = false;
  }

}
