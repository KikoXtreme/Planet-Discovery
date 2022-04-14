import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPlanet, IPost, IUser } from 'src/app/core/interfaces';
import { PlanetService } from 'src/app/core/planet.service';

// import { PlanetsDetailsComponent } from 'src/app/feature/planets/planets-details/planets-details.component'

@Component({
  selector: 'app-planets-list-item',
  templateUrl: './planets-list-item.component.html',
  styleUrls: ['./planets-list-item.component.css']
})
export class PlanetsListItemComponent implements OnChanges {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  canSubscribe$: Observable<boolean>;

  @Input() planet: IPlanet;


  // refreshThemeRequest$ = new BehaviorSubject(undefined);
  // currentUser?: IUser;

  constructor(private authService: AuthService, public router: Router, private planetService: PlanetService) { }

  ngOnChanges(): void {
    // TODO this.canSubscribe = !this.planet.subscribers.includes('5fa64b162183ce1728ff371d');
    this.canSubscribe$ = this.authService.currentUser$.pipe(map((currentUser) => {
      if (!currentUser || !this.planet) {
        return false;
      }

      return !this.planet.subscribers.includes(currentUser._id);
    }))
  }

  // canLike(comment: IPost) {
  //   return this.currentUser && !comment.likes.includes(this.currentUser._id);
  // }


  // like(comment: IPost): void {
  //   this.planetService.likePost(comment._id).subscribe(() => this.refreshThemeRequest$.next(undefined));
  // }

  // unlike(comment: IPost): void {
  //   this.planetService.dislikePost(comment._id).subscribe(() => this.refreshThemeRequest$.next(undefined));
  // }

}