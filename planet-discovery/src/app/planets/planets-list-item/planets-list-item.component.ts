import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, mergeMap, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPlanet, IPost, IUser } from 'src/app/core/interfaces';
import { PlanetService } from 'src/app/core/planet.service';

@Component({
  selector: 'app-planets-list-item',
  templateUrl: './planets-list-item.component.html',
  styleUrls: ['./planets-list-item.component.css']
})
export class PlanetsListItemComponent implements OnChanges {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  canSubscribe$: Observable<boolean>;

  @Input() planet: IPlanet;

//TODO subscribe

  newPlanetReq$ = new BehaviorSubject(undefined);
  canSubscribe: boolean = false;
  currentUser?: IUser;
  isUserOwner: boolean = false;
  currentUser$: Observable<IUser> = this.authService.currentUser$;


  constructor(private authService: AuthService, public router: Router, private planetService: PlanetService,private activatedRoute: ActivatedRoute) { }

  ngOnChanges(): void {
    // TODO this.canSubscribe = !this.planet.subscribers.includes('5fa64b162183ce1728ff371d');
    this.canSubscribe$ = this.authService.currentUser$.pipe(map((currentUser) => {
      if (!currentUser || !this.planet) {
        return false;
      }

      return !this.planet.subscribers.includes(currentUser._id);
    }))
    // combineLatest([
    //   this.activatedRoute.params
    //     .pipe(
    //       mergeMap(params => {
    //         const planetId = params['planetId'];
    //         return this.newPlanetReq$.pipe(mergeMap(() => this.planetService.loadPlanetById(planetId)))
    //       })
    //     ),
    //   this.authService.currentUser$
    // ])
    //   .subscribe(([planet, user]) => {
    //     this.currentUser = user
    //     this.planet = planet;
    //     this.canSubscribe = user && !this.planet.subscribers.includes(user?._id);
    //   });
  }

  // public canLike(comment: IPost) {
  //   return this.currentUser && !comment.likes.includes(this.currentUser._id);
  // }

  // subscribe(): void {
  //   this.planetService.subscribeToPlanet(this.planet._id)
  //     .subscribe(() => this.newPlanetReq$.next(undefined));
  // }

  // unsubscribe(): void {
  //   this.planetService.unsubscribe(this.planet._id)
  //     .subscribe(() => this.newPlanetReq$.next(undefined));
  // }

}