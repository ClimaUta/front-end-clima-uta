import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import { PrediccionesService } from '../../services/predicciones.service';
import { Clima } from '../../models/clima';
import { Prediccion } from '../../models/prediccion';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-comparacion',
  templateUrl: './comparacion.component.html',
  styleUrls: ['./comparacion.component.css'],
  providers: [ClimaService, PrediccionesService]
})
export class ComparacionComponent implements OnInit {

  public climas: Clima;
  public clima_hoy: Clima[];
  public data_temp_m1 = [];
  public data_press_m1 = [];
  public data_hum_m1 = [];

  public data_temp_m2 = [];
  public data_press_m2 = [];
  public data_hum_m2 = [];

  public data_temp_m3 = [];
  public data_press_m3 = [];
  public data_hum_m3 = [];

  public data_temp_hoy = [];
  public data_press_hoy = [];
  public data_hum_hoy = [];

  public label = [];
  public label_m3 = [];
  public year;

  public Modelo1: Prediccion[];
  public Modelo2: Prediccion[]; 
  public Modelo3: Prediccion[]; 
  public temp: number;
  public pres: number;
  public hum: number;
  public cielo: string;
  public carga1: boolean;
  public carga2: boolean;

  constructor(
    private _climaService: ClimaService,
    private _prediccionesService: PrediccionesService
  ) 
  {
    this.carga1 = false;
    this.carga2 = false;
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.getClima();
    this.getClima_hoy();
    this.getClimaOpenWeather();
    this.getPredicciones_rf();
    this.getPredicciones_dnn();
    this.getPredicciones_arima();
  }

  getClima(){
    this._climaService.getClima().subscribe(
      response => {
        this.climas = response;
        this.carga1 = true;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getClima_hoy(){
    this._climaService.getClimaHoy().subscribe(
      response => {
        this.clima_hoy = response;
        console.log(this.clima_hoy);
        this.clima_hoy.forEach(datos => {
            this.data_temp_hoy.push(datos["AMBIENT_TEMPERATURE"]);
            this.data_press_hoy.push(datos["AIR_PRESSURE"]);
            this.data_hum_hoy.push(datos["HUMIDITY"]);
        });
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getClimaOpenWeather(){
    this._climaService.getClimaOpenWeather().subscribe(
      response => {
        this.temp = Math.round(response['main']['temp']);
        this.pres = response['main']['pressure'];
        this.hum = response['main']['humidity'];
        this.cielo = response['weather']['0']['main'];
        this.carga2 = true;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getPredicciones_rf(){
    this._prediccionesService.getPredicciones("rf").subscribe(
      response => {
        //Carga de datos para las tablas.
        this.Modelo1 = response;
        //Carga de datos para las graficas
        this.Modelo1.forEach(dato_modelo1 => {
          this.data_temp_m1.push(dato_modelo1["AMBIENT_TEMPERATURE"]);
          this.data_press_m1.push(dato_modelo1["AIR_PRESSURE"]);
          this.data_hum_m1.push(dato_modelo1["HUMIDITY"]);
          
          //this.label.push(dato_modelo1["hour"] + ":00");
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getPredicciones_dnn(){
    this._prediccionesService.getPredicciones("dnn").subscribe(
      response => {
        //Carga de datos para las tablas.
        this.Modelo2 = response;
        //Carga de datos para las graficas
        this.Modelo2.forEach(dato_modelo2 => {
          this.data_temp_m2.push(dato_modelo2["AMBIENT_TEMPERATURE"]);
          this.data_press_m2.push(dato_modelo2["AIR_PRESSURE"]);
          this.data_hum_m2.push(dato_modelo2["HUMIDITY"]);

          this.label.push(dato_modelo2["hour"] + ":00");
          
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getPredicciones_arima(){
    this._prediccionesService.getPredicciones("arima").subscribe(
      response => {
        //Carga de datos para las tablas.
        this.Modelo3 = response;
        //Carga de datos para las graficas
        this.Modelo3.forEach(dato_modelo3 => {
          this.data_temp_m3.push(dato_modelo3["AMBIENT_TEMPERATURE"]);
          this.data_press_m3.push(dato_modelo3["AIR_PRESSURE"]);
          this.data_hum_m3.push(dato_modelo3["HUMIDITY"]);
          
          this.label_m3.push(dato_modelo3["hour"] + ":00");
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  //-----------------------CONFIGURACION TABLA----------------------------

  //-----------------------CONFIGURACON DE LAS GRAFICAS-------------------
  lineChartLabels: Label[] = this.label;
  lineChartLabels_m3: Label[] = this.label_m3;

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

  //--------------Grafica 1 - Modelo 1-----------------------
  lineChartData_temp_m1: ChartDataSets[] = [
    { data: this.data_temp_m1, label: 'Temperatura modelo 1' },
    { data: this.data_temp_hoy, label: 'Temperatura capturada' }
  ];


  lineChartData_press_m1: ChartDataSets[] = [
    { data: this.data_press_m1, label: 'Presion Modelo 1' },
    { data: this.data_press_hoy, label: 'Presion capturada' }
  ];

  lineChartData_hum_m1: ChartDataSets[] = [
    { data: this.data_hum_m1, label: 'Humedad modelo 1' },
    { data: this.data_hum_hoy, label: 'Humedad capturada' }
  ];

 //--------------Grafica 1 - Modelo 2-----------------------
 lineChartData_temp_m2: ChartDataSets[] = [
  { data: this.data_temp_m2, label: 'Temperatura modelo 2' },
  { data: this.data_temp_hoy, label: 'Temperatura capturada' }
];

lineChartData_press_m2: ChartDataSets[] = [
  { data: this.data_press_m2, label: 'Presion modelo 2' },
  { data: this.data_press_hoy, label: 'Presion capturada' }
];

lineChartData_hum_m2: ChartDataSets[] = [
  { data: this.data_hum_m2, label: 'Humedad modelo 2' },
  { data: this.data_temp_hoy, label: 'Humedad capturada' }
];

 //--------------Grafica 1 - Modelo 3-----------------------
 lineChartData_temp_m3: ChartDataSets[] = [
  { data: this.data_temp_m3, label: 'Temperatura modelo 3' },
  { data: this.data_temp_hoy, label: 'Temperatura capturada' }
];

lineChartData_press_m3: ChartDataSets[] = [
  { data: this.data_press_m3, label: 'Presion modelo 3' },
  { data: this.data_press_hoy, label: 'Presion capturada' }
];

lineChartData_hum_m3: ChartDataSets[] = [
  { data: this.data_hum_m3, label: 'Humedad modelo 3' },
  { data: this.data_hum_hoy, label: 'Humedad capturada' }
];

}


