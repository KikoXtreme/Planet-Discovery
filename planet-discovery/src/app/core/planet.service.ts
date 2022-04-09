import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlanet } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http: HttpClient) { }

  addPlanet$(body: { plametName: string, postText: string }): Observable<IPlanet> {
    return this.http.post<IPlanet>(`${apiUrl}/planets`, body, { withCredentials: true });
  }

}
