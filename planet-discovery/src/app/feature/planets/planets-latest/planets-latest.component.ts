import { Component, OnInit } from '@angular/core';
import { IPlanet } from 'src/app/core/interfaces';
import { PlanetService } from 'src/app/core/planet.service';

@Component({
  selector: 'app-planets-latest',
  templateUrl: './planets-latest.component.html',
  styleUrls: ['./planets-latest.component.css']
})
export class PlanetsLatestComponent implements OnInit {

  planetList: IPlanet[];

  constructor(private planetService: PlanetService) { }

  ngOnInit(): void {
    this.planetService.loadPlanetList$()
      .subscribe(planetList => {
        this.planetList = planetList;
      });
  }

}
