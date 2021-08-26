import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ComparacionComponent } from "./components/comparacion/comparacion.component";
import { EquipoComponent } from "./components/equipo/equipo.component";
import { ErrorComponent } from "./components/error/error.component";

import { InicioComponent } from './components/inicio/inicio.component';
import { RepositorioComponent } from "./components/repositorio/repositorio.component";

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'repositorio', component: RepositorioComponent},
    {path: 'comparacion', component: ComparacionComponent},
    {path: 'proyecto', component: EquipoComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);