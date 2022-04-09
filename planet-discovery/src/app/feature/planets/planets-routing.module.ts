import { RouterModule, Routes } from "@angular/router";
import { PlanetsNewPageComponent } from "./planets-new-page/planets-new-page.component";
import { PlanetsPageComponent } from "./planets-page/planets-page.component";
// import { AuthGuard } from "src/app/core/guards/auth.guard";
// import { ThemesDetailPageComponent } from "./themes-detail-page/themes-detail-page.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PlanetsPageComponent
    },
    {
        path: 'new',
        // canActivate: [AuthGuard], 
        component: PlanetsNewPageComponent
    },
    // {
    //     path: ':themeId',
    //     component: ThemesDetailPageComponent
    // }
];

export const PlanetsRoutingModule = RouterModule.forChild(routes);