import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPlanet } from 'src/app/core/interfaces';

@Component({
  selector: 'app-planets-list-item',
  templateUrl: './planets-list-item.component.html',
  styleUrls: ['./planets-list-item.component.css']
})
export class PlanetsListItemComponent implements OnChanges {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  canSubscribe: boolean = false;

  @Input() planet: IPlanet;

  constructor(private authService: AuthService) { }

  ngOnChanges(): void {
    // TODO user currentUser$
    this.canSubscribe = !this.planet.subscribers.includes('5fa64b162183ce1728ff371d');
  }

}
