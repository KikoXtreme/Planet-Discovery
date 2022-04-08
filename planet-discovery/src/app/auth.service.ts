import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IUser } from './core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser = new BehaviorSubject<IUser>({} as any | undefined);
  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this._currentUser.pipe(map(user => !!user));

  constructor(private httpClient: HttpClient) { }
}
