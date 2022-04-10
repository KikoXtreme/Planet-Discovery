import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../core/interfaces';

// export interface CreateUserData {
//   username: string, email: string, country?: string, password: string;
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //TODO
  constructor(private httpClient: HttpClient) { }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true });
  }
}
