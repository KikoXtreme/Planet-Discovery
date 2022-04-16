import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { IPlanet } from 'src/app/core/interfaces';
import { PlanetService } from 'src/app/core/planet.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.css']
})
export class PlanetsListComponent implements OnInit {

  planetList: IPlanet[];
  searchControl = new FormControl();
  // searchControl = new FormControl('', { updateOn: 'blur' });

  constructor(private planetService: PlanetService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        switchMap(searchValue => this.planetService.loadPlanetList$(searchValue))
      )
      .subscribe(planetList => {
        this.planetList = planetList;
      })
  }

}
