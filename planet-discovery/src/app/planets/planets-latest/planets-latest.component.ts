import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlanet } from 'src/app/core/interfaces';
import { PlanetService } from 'src/app/core/planet.service';


@Component({
  selector: 'app-planets-latest',
  templateUrl: './planets-latest.component.html',
  styleUrls: ['./planets-latest.component.css']
})
export class PlanetsLatestComponent implements OnInit {

  planetList!: IPlanet[];
  index: number = 0;

  constructor(private planetService: PlanetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Last 5 pages with correct time
    this.planetService.loadPlanetList$()
      .subscribe(planetList => {
        this.planetList = planetList.reverse();
        // console.log(planetList[0].created_at)
      });
  }

}
