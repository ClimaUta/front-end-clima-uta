import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RepositorioComponent } from './components/repositorio/repositorio.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ComparacionComponent } from './components/comparacion/comparacion.component';
import { EquipoComponent } from './components/equipo/equipo.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RepositorioComponent,
    MapaComponent,
    ComparacionComponent,
    EquipoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
