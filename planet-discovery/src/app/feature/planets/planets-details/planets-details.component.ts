import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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

  canSubscribe: boolean = false;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  currentUser$: Observable<IUser> = this.authService.currentUser$;

  constructor(private activatedRoute: ActivatedRoute, private planetService: PlanetService, private authService: AuthService) { }

  ngOnInit(): void {
    const planetId = this.activatedRoute.snapshot.params['planetId'];
    this.planetService.loadPlanetById(planetId).subscribe(planet=>{
      this.planet = planet;
      this.canSubscribe = !this.planet.subscribers.includes('5fa64b162183ce1728ff371d');
    });
  }

  canLike(comment: IPost){
    return !comment.likes.includes('5fa64b162183ce1728ff371d');
  }

}
