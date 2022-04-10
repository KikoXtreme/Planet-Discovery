import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsNewPageComponent } from './planets-new-page/planets-new-page.component';
import { PlanetsRoutingModule } from './planets-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanetsPageComponent } from './planets-page/planets-page.component';
import { PagesModule } from '../pages/pages.module';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsListItemComponent } from './planets-list-item/planets-list-item.component';



@NgModule({
  declarations: [
    PlanetsNewPageComponent,
    PlanetsPageComponent,
    PlanetsListComponent,
    PlanetsListItemComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    PlanetsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlanetsModule { }
