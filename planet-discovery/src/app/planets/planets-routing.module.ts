import { RouterModule, Routes } from "@angular/router";
import { GuardsGuard } from "src/app/core/guards/guards.guard";
import { PlanetsDetailsComponent } from "./planets-details/planets-details.component";
import { PlanetsLatestComponent } from "./planets-latest/planets-latest.component";
import { PlanetsNewPageComponent } from "./planets-new-page/planets-new-page.component";
import { PlanetsPageComponent } from "./planets-page/planets-page.component";
import { PlanetsPaginationComponent } from "./planets-pagination/planets-pagination.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PlanetsPageComponent
    },
    {
        path: 'new',
        canActivate: [GuardsGuard], 
        component: PlanetsNewPageComponent
    },
    {
        path: 'latest',
        component: PlanetsLatestComponent
    },
    {
        path: 'pagination',
        component: PlanetsPaginationComponent
    },
    {
        path: ':planetId',
        component: PlanetsDetailsComponent
    }
];

export const PlanetsRoutingModule = RouterModule.forChild(routes);