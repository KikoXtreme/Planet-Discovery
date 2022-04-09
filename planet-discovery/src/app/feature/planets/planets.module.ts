import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsNewPageComponent } from './planets-new-page/planets-new-page.component';
import { PlanetsRoutingModule } from './planets-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PlanetsNewPageComponent
  ],
  imports: [
    CommonModule,
    PlanetsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlanetsModule { }
