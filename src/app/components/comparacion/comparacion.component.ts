import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import { Clima } from '../../models/clima';

@Component({
  selector: 'app-comparacion',
  templateUrl: './comparacion.component.html',
  styleUrls: ['./comparacion.component.css'],
  providers: [ClimaService]
})
export class ComparacionComponent implements OnInit {

  public climas: Clima[];
  public temp: number;
  public pres: number;
  public hum: number;
  public carga1: boolean;
  public carga2: boolean;

  constructor(
    private _climaService: ClimaService
  ) 
  {
    this.carga1 = false;
    this.carga2 = false
  }

  ngOnInit(): void {
    this.getClima();
    this.getClimaOpenWeather();

  }

  getClima(){
    this._climaService.getClima().subscribe(
      response => {
        console.log(response);
        this.climas = response;
        console.log(this.climas);
        this.carga1 = true;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getClimaOpenWeather(){
    this._climaService.getClimaOpenWeather().subscribe(
      response => {
        console.log(response);
        this.temp = Math.round(response['main']['temp']);
        this.pres = response['main']['pressure'];
        this.hum = response['main']['humidity'];
        console.log(this.temp, this.pres, this.hum);
        this.carga2 = true;
      },
      error => {
        console.log(<any>error);
      }
    );
  }


}
