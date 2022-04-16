import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPlanet, IUser } from 'src/app/core/interfaces';

@Component({
  selector: 'app-planets-list-item',
  templateUrl: './planets-list-item.component.html',
  styleUrls: ['./planets-list-item.component.css']
})
export class PlanetsListItemComponent implements OnChanges {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  canSubscribe$: Observable<boolean>;

  @Input() planet: IPlanet;

  canSubscribe: boolean = false;
  currentUser?: IUser;
  currentUser$: Observable<IUser> = this.authService.currentUser$;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnChanges(): void {
    this.canSubscribe$ = this.authService.currentUser$.pipe(map((currentUser) => {
      if (!currentUser || !this.planet) {
        return false;
      }

      return !this.planet.subscribers.includes(currentUser._id);
    }))

  }

}