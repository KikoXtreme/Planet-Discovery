import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanetService } from 'src/app/core/planet.service';

@Component({
  selector: 'app-planets-new-page',
  templateUrl: './planets-new-page.component.html',
  styleUrls: ['./planets-new-page.component.css']
})
export class PlanetsNewPageComponent implements OnInit {

  constructor(private router: Router, private planetService: PlanetService) { }

  ngOnInit(): void {
  }

  submitNewPlanet(newPlanetForm: NgForm): void {
    this.planetService.addPlanet$(newPlanetForm.value).subscribe({
      next: (planet) => {
        this.router.navigate(['/planets']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

}
