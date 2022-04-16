import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPage, IPlanet, IPost } from './interfaces';

const apiUrl = environment.apiUrl;

@Injectable()
export class PlanetService {

  constructor(private httpClient: HttpClient) { }

  addPlanet$(body: { planetName: string, postText: string }): Observable<IPlanet> {
    return this.httpClient.post<IPlanet>(`${apiUrl}/planets`, body, { withCredentials: true });
  }

  loadPlanetList$(searchValue: string = ''): Observable<IPlanet[]> {
    return this.httpClient.get<IPlanet[]>(`${apiUrl}/planets?title=${searchValue}`, {});
  }

  // Pagination
  loadPlanetPageList$(/*searchValue: string = '',*/ startIndex: number, limit: number): Observable<IPage<IPlanet>> {
    return this.httpClient.get<IPage<IPlanet>>(`${apiUrl}/planets/list`, {
      params: new HttpParams({ fromObject: { startIndex, limit } })
    });
  }

  loadPlanetById(id: string): Observable<IPlanet<IPost>> {
    return this.httpClient.get<IPlanet<IPost>>(`${apiUrl}/planets/${id}`);
  }

  // Subscribe and Like
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

  // getPost$(planetId: string, postId: string): Observable<IPost> {
  //   return this.httpClient.get<IPost>(`${apiUrl}/planets/${planetId}/posts/${postId}`, { withCredentials: true });
  // }
  // editPost$(planetId: string, postId: string, planetData: { text: string }): Observable<IPost> {
  //   return this.httpClient
  //     .put<IPost>(`${apiUrl}/planets/${planetId}/posts/${postId}`, planetData, { withCredentials: true, observe: 'response' })
  //     .pipe(map(response => response.body));
  // .pipe(tap((currentUser) => this.currentUser = currentUser));
  // }
}