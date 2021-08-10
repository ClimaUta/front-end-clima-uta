import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RepositorioComponent } from './components/repositorio/repositorio.component';
import { ComparacionComponent } from './components/comparacion/comparacion.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RepositorioComponent,
    ComparacionComponent,
    EquipoComponent,
    ErrorComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
