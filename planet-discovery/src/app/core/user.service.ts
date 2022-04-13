import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../core/interfaces';

export interface IUpdateUserDto extends Pick<IUser, 'username' | 'email' | 'country'> {
  profilePicture?: File;
}

@Injectable()
export class UserService {

  currentUser: IUser | null | undefined;

  constructor(private httpClient: HttpClient) { }
  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true });
  }

  updateProfile$(userData: IUpdateUserDto): Observable<IUser> {
    const formData = new FormData();
    formData.set('username', userData.username);
    formData.set('email', userData.email);
    formData.set('country', userData.country);

    if (userData.profilePicture) {
      formData.append('profilePicture', userData.profilePicture);
    }

    return this.httpClient
      .put<IUser>(`${environment.apiUrl}/users/profile`, /*userData*/ formData, { withCredentials: true, observe: 'response' })
      .pipe(map(response => response.body));
    // .pipe(tap((currentUser) => this.currentUser = currentUser));
  }

}
