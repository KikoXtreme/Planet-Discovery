import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlanet, IPost } from 'src/app/core/interfaces';
import { PlanetService } from 'src/app/core/planet.service';

@Component({
  selector: 'app-planets-latest',
  templateUrl: './planets-latest.component.html',
  styleUrls: ['./planets-latest.component.css']
})
export class PlanetsLatestComponent implements OnInit {

  @Input() planet: IPlanet;
  planetList: IPlanet[];

  constructor(private planetService: PlanetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.planetService.loadPlanetList$()
      .subscribe(planetList => {
        this.planetList = planetList.reverse();
      });
  }

}
