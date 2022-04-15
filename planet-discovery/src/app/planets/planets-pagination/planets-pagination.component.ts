import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { IPlanet } from 'src/app/core/interfaces';
import { PlanetService } from 'src/app/core/planet.service';

@Component({
  selector: 'app-planets-pagination',
  templateUrl: './planets-pagination.component.html',
  styleUrls: ['./planets-pagination.component.css']
})
export class PlanetsPaginationComponent implements OnInit {

  planetList!: IPlanet[];
  index: number = 0;

  // Pagination
  private pageChange$ = new BehaviorSubject(undefined);
  readonly pageSize = 4;
  currentPage: number = 0;
  totalResults: number = 0;


  constructor(private planetService: PlanetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // ---- last 3 pages with correct time
    // this.planetService.loadPlanetList$()
    //   .subscribe(planetList => {
    //     this.planetList = planetList.reverse();
    //     console.log(planetList[0].created_at)
    //   });

    // ---- pagination with wrong order
    this.pageChange$
      .pipe(
        switchMap(() => this.planetService.loadPlanetPageList$(this.currentPage * this.pageSize, this.pageSize))
      )
      .subscribe(planetList => {
        this.planetList = planetList.results;
        this.totalResults = planetList.totalResults;
      });
  }

  pageBack(): void {
    this.currentPage--;
    this.pageChange$.next(undefined);
  }

  pageForward(): void {
    this.currentPage++;
    this.pageChange$.next(undefined);
  }

}
