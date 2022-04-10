import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlanet, IPost } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private httpClient: HttpClient) { }

  addPlanet$(body: { planetName: string, postText: string }): Observable<IPlanet> {
    return this.httpClient.post<IPlanet>(`${apiUrl}/planets`, body, { withCredentials: true });
  }

  loadPlanetList$(searchValue: string = ''): Observable<IPlanet[]> {
    return this.httpClient.get<IPlanet[]>(`${apiUrl}/themes?title=${searchValue}`, {
      params: new HttpParams({
        fromObject: {

        }
      })
    });
  }
  
  // loadPlanetById(): Observable<IPlanet<IPost>> {
  //   return this.httpClient.get<IPlanet<IPost>>(`${apiUrl}/themes/${id}`);
  // }

}
