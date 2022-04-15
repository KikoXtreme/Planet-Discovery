import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsNewPageComponent } from './planets-new-page/planets-new-page.component';
import { PlanetsRoutingModule } from './planets-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanetsPageComponent } from './planets-page/planets-page.component';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsListItemComponent } from './planets-list-item/planets-list-item.component';
import { PlanetsDetailsComponent } from './planets-details/planets-details.component';
import { PlanetsLatestComponent } from './planets-latest/planets-latest.component';
import { PostsComponent } from './posts/posts.component';
import { TimePipe } from './time.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PagesModule } from 'src/app/pages/pages.module';
import { PlanetsPaginationComponent } from './planets-pagination/planets-pagination.component';



@NgModule({
  declarations: [
    PlanetsNewPageComponent,
    PlanetsPageComponent,
    PlanetsListComponent,
    PlanetsListItemComponent,
    PlanetsDetailsComponent,
    PlanetsLatestComponent,
    PostsComponent,
    TimePipe,
    PlanetsPaginationComponent

  ],
  imports: [
    CommonModule,
    PagesModule,
    PlanetsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    PlanetsListComponent,
    PlanetsListItemComponent,
    PostsComponent
  ]
})
export class PlanetsModule { }
