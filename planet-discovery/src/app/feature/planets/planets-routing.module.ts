import { RouterModule, Routes } from "@angular/router";
import { PlanetsNewPageComponent } from "./planets-new-page/planets-new-page.component";
// import { AuthGuard } from "src/app/core/guards/auth.guard";
// import { ThemesDetailPageComponent } from "./themes-detail-page/themes-detail-page.component";
// import { ThemesPageComponent } from "./themes-page/themes-page.component";

const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     component: ThemesPageComponent
    // },
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