import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../core/interfaces';

export interface IUpdateUserData extends Pick<IUser, 'username' | 'email' | 'country'> {
  profilePicture?: File;
}


@Injectable()
export class UserService {
  
  constructor(private httpClient: HttpClient) { }
  //TODO /user/profile ???
  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true });
  }

  //TODO UPDATE?
  updateProfile$(newUser: IUpdateUserData, params: IUser): Observable<IUser> {
    const formData = new FormData();
    formData.set('username', newUser.username);
    formData.set('email', newUser.email);
    formData.set('country', newUser.country);

    if (newUser.profilePicture){
      formData.append('profilePicture', newUser.profilePicture);
    }

    return this.httpClient.put<IUser>(`${environment.apiUrl}/users/profile`, formData, { withCredentials: true })
  }
}
