import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { Clima } from '../../models/clima';
import { ClimaService } from '../../services/clima.service'
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { RegistroService } from '../../services/registro.service';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ClimaService, RegistroService]
})
export class InicioComponent implements OnInit, OnDestroy, AfterViewInit {
  public climas: Clima[];
  public climas2: Clima[];
  alive = true;
  public data = [];
  public label = [];
  public datos;
  private map;
  private marker = [];
  public carga: boolean;

  //-----------------------------GRAFICA----------------------------------------------------
  lineChartData: ChartDataSets[] = [
    { data: this.data, label: 'Temperatura' }
  ];

  lineChartLabels: Label[] = this.label;

  lineChartOptions = {
    responsive: true
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(25,118,210,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  //-----------------------------MAPA INTERACTIVO-------------------------------------------------------
  private initMap(): void {
    this.map = L.map('map', {
      center: [ -20.2195, -70.1417 ],
      zoom: 3

    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      minZoom: 15,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    const scale = L.control.scale();

    scale.addTo(this.map);
  }
  

  constructor(
    private _climaService: ClimaService,
    private _registroService: RegistroService
  ) {
    this.carga = false;
    Observable.timer(0,5000)
    .takeWhile(() => this.alive)
    .subscribe(() => {
      for(let i = 11; i < 15; i++){
        this._registroService.getUltimoRegistro(i).subscribe(
          response => {
            this.datos = response;
            if(this.datos.length != 0){
              this.marker[i-11]._popup.setContent(
                "<div [(ngModel)]='climas'>" +
                "<h4>Sensor: "+ this.datos[0].REMOTE_ID + "</h4>" +
                "<b>Temperatura: "+ this.datos[0].AMBIENT_TEMPERATURE + "C°</b><br>" +
                "<b>Presion: "+ this.datos[0].AIR_PRESSURE + "</b><br>" +
                "<b>Humedad: "+ this.datos[0].HUMIDITY + "%<b></br>" +
                "</div>"
              );
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    })
   }
  ngAfterViewInit(): void {
        //Iniciando el mapa
        this.initMap();

        //Marcas iniciales del mapa
        this.marker[0] = L.circle([-20.22382,-70.14652], 200, {color: "red"}).addTo(this.map);
        this.marker[0].bindPopup(
          "<h4>Sensor: 11</h4>" +
          "Fuera de servicio"
          );
    
        this.marker[1] = L.circle([-20.2195, -70.1417], 200, {color: "green"}).addTo(this.map);
        this.marker[1].bindPopup(
          "<h4>Sensor: 12</h4>" +
          "Fuera de servicio"
          );
        
        this.marker[2] = L.circle([-20.2166, -70.1325], 200, {color: "purple"}).addTo(this.map);
        this.marker[2].bindPopup(
          "<h4>Sensor: 13</h4>" +
          "Fuera de servicio"
          );
    
        this.marker[3] = L.circle([-20.2287, -70.1313], 200).addTo(this.map);
        this.marker[3].bindPopup(
          "<h4>Sensor: 14</h4>" +
          "Fuera de servicio"
          );
    
    
    
        //Fin Marcas
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
    //Inciacion del clima
    this.getClima();
    //Iniciacion de la grafica a mostrar
    this.getGrafica();    
  }

  getClima(){
    this._climaService.getClima().subscribe(
      response => {
        this.climas = response;
        console.log(this.climas)
        this.carga = true;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getGrafica(){
    this._climaService.getClimaHoy().subscribe(
      response => {
        this.climas2 = response;
        this.climas2.forEach(dato => {
          this.data.push(dato["AMBIENT_TEMPERATURE"]);
          
          var fecha = new Date(dato["CREATED"]); 
          this.label.push(fecha.getHours() + ":00");
        });
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
