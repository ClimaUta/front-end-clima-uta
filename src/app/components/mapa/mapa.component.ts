import { AfterContentChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Observable } from 'rxjs';

import { RegistroService } from '../../services/registro.service';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer'

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  providers: [RegistroService]
})
export class MapaComponent implements OnInit, AfterViewInit, OnDestroy {

  public datos;

  private map;
  private marker = [];

  alive = true;

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
    private _registroService: RegistroService
  ) {
    //Timer Marca 1
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

    //Timer Marca 2
   }

   ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.alive = false;
  }
  
  

  ngAfterViewInit(): void {
    //Iniciando el mapa
    this.initMap();

    //Marcas del mapa
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

 

}