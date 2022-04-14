import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlanet, IPost } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class PlanetService {

  constructor(private httpClient: HttpClient) { }

  addPlanet$(body: { planetName: string, postText: string }): Observable<IPlanet> {
    return this.httpClient.post<IPlanet>(`${apiUrl}/planets`, body, { withCredentials: true });
  }

  loadPlanetList$(searchValue: string = ''): Observable<IPlanet[]> {
    return this.httpClient.get<IPlanet[]>(`${apiUrl}/planets?title=${searchValue}`, {
      params: new HttpParams({
        fromObject: {

        }
      })
    });
  }
  // TODO with credential true???
  loadPlanetById(id: string): Observable<IPlanet<IPost>> {
    return this.httpClient.get<IPlanet<IPost>>(`${apiUrl}/planets/${id}`);
  }

  //TODO for subscribe and like
  likePost(postId: string): Observable<void> {
    return this.httpClient.put<void>(`${apiUrl}/likes/${postId}`, {}, { withCredentials: true });
  }

  dislikePost(postId: string): Observable<void> {
    return this.httpClient.put<void>(`${apiUrl}/dislikes/${postId}`, {}, { withCredentials: true });
  }


  subscribeToPlanet(planetId: string): Observable<IPlanet> {
    return this.httpClient.put<IPlanet>(`${apiUrl}/planets/${planetId}`, {}, { withCredentials: true });
  }

  unsubscribe(planetId: string): Observable<IPlanet> {
    return this.httpClient.put<IPlanet>(`${apiUrl}/planets/${planetId}/unsubscribe`, {}, { withCredentials: true });
  }

}