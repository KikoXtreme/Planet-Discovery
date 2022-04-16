import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateUserData, IUser } from './core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<IUser>(undefined);
  currentUser$ = this.user.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));

  constructor(private httpClient: HttpClient) { }

  register$(userData: ICreateUserData): Observable<IUser> {
    return this.httpClient.post<IUser>(`${environment.apiUrl}/register`, userData, { withCredentials: true });
  }

  login$(userData: { email: string, password: string }): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${environment.apiUrl}/login`, userData, { withCredentials: true, observe: 'response' })
      .pipe(map(response => response.body));
  }

  logout$(): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/logout`, {}, { withCredentials: true });
  }

  authenticate$(): Observable<IUser> {
    return this.httpClient
      .get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
      .pipe(
        tap(currentProfile => this.handleLogin(currentProfile)),
        catchError((err) => {
          return EMPTY;
        }));
  }

  handleLogin(newUser: IUser) {
    this.user.next(newUser);
  }

  handleLogout() {
    this.user.next(undefined);
  }

}