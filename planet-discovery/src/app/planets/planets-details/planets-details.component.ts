import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, mergeMap, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPlanet, IPost, IUser } from 'src/app/core/interfaces';
import { PlanetService } from 'src/app/core/planet.service';

@Component({
  selector: 'app-planets-details',
  templateUrl: './planets-details.component.html',
  styleUrls: ['./planets-details.component.css']
})
export class PlanetsDetailsComponent implements OnInit {
  
  planet: IPlanet<IPost>;
  @Input() planetId: string;

  planetRequestUpdate$ = new BehaviorSubject(undefined);

  canSubscribe: boolean = false;
  currentUser?: IUser;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(private activatedRoute: ActivatedRoute,
    private planetService: PlanetService,
    private authService: AuthService) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            const planetId = params['planetId'];
            return this.planetRequestUpdate$.pipe(mergeMap(() => this.planetService.loadPlanetById(planetId)))
          })
        ),
      this.authService.currentUser$
    ])
      .subscribe(([planet, user]) => {
        this.currentUser = user
        this.planet = planet;
        this.canSubscribe = user && !this.planet.subscribers.includes(user?._id);
      });

  }

  public canLike(comment: IPost) {
    return this.currentUser && !comment.likes.includes(this.currentUser._id);
  }

  subscribe(): void {
    this.planetService.subscribeToPlanet(this.planet._id)
      .subscribe(() => this.planetRequestUpdate$.next(undefined));
  }

  unsubscribe(): void {
    this.planetService.unsubscribe(this.planet._id)
      .subscribe(() => this.planetRequestUpdate$.next(undefined));
  }

  like(comment: IPost): void {
    this.planetService.likePost(comment._id).subscribe(() => this.planetRequestUpdate$.next(undefined));
  }

  unlike(comment: IPost): void {
    this.planetService.dislikePost(comment._id).subscribe(() => this.planetRequestUpdate$.next(undefined));
  }

}