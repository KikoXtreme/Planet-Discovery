import { RouterModule, Routes } from "@angular/router";
import { GuardsGuard } from "src/app/core/guards/guards.guard";
import { PlanetsDetailsComponent } from "./planets-details/planets-details.component";
import { PlanetsNewPageComponent } from "./planets-new-page/planets-new-page.component";
import { PlanetsPageComponent } from "./planets-page/planets-page.component";

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
        path: ':planetId',
        component: PlanetsDetailsComponent
    }
];

export const PlanetsRoutingModule = RouterModule.forChild(routes);