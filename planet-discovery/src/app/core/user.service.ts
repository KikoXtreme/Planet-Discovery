import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../core/interfaces';


@Injectable()
export class UserService {

  currentUser: IUser | null | undefined;

  constructor(private httpClient: HttpClient) { }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true });
  }

  updateProfile$(userData: { username: string, email: string, country: string }): Observable<IUser> {
    return this.httpClient
      .put<IUser>(`${environment.apiUrl}/users/profile`, userData, { withCredentials: true, observe: 'response' })
      .pipe(map(response => response.body));
    // .pipe(tap((currentUser) => this.currentUser = currentUser));
  }

}
