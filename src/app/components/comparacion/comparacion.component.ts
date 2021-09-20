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
  public PError_Temp = [];
  public PError_Press = [];
  public PError_Hum = [];

  public PError = {};

  public data_temp_m1 = [];
  public data_press_m1 = [];
  public data_hum_m1 = [];

  public data_temp_m2 = [];
  public data_press_m2 = [];
  public data_hum_m2 = [];

  public data_temp_m3 = [];
  public data_press_m3 = [];
  public data_hum_m3 = [];

  public data_temp_m4 = [];
  public data_press_m4 = [];
  public data_hum_m4 = [];

  public data_temp_hoy = [];
  public data_press_hoy = [];
  public data_hum_hoy = [];

  public label = [];
  public label_m3 = [];
  public year;

  public Modelo1: Prediccion[];
  public Modelo2: Prediccion[]; 
  public Modelo3: Prediccion[];
  public Modelo4: Prediccion[];
  public temp: number;
  public pres: number;
  public hum: number;
  //public cielo: string;
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
    this.getPredicciones_lstm();
    this.getError("rfPredictions",0);
    this.getError("dnnPredictions",1);
    this.getError("arimaPredictions",2);
    this.getError("predictions",3);
  }

  //Peticion HTTP hacia la Api clima-uta, para obtener el clima actual.
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

  //-----------------------CARGA DE DATOS------------------------------------
  //Peticion HTTP hacia la Api clima-uta, donde se cargan los datos a mostrar en la graficas
  // de la pagina de comparacion.
  getClima_hoy(){
    this._climaService.getComparacion().subscribe(
      response => {
        this.clima_hoy = response;
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

  /**
   * Consulta a la api de Openweather para obtener el clima actual de Iquique
   */
  getClimaOpenWeather(){
    this._climaService.getClimaOpenWeather().subscribe(
      response => {
        this.temp = Math.round(response['main']['temp']);
        this.pres = response['main']['pressure'];
        this.hum = response['main']['humidity'];
        //this.cielo = response['weather']['0']['main'];
        this.carga2 = true;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  //----------------------------CONSULTAS A LA API CLIMA-UTA PARA OBTENER LAS PREDICCIONES DE LOS MODELOS--------------
  /*
  El siguiente lote de codigo es una sucecion de peticiones a la Api Clima-uta, para obtener las predicciones
  realizadas por los distintos modelos, ademas de preparar dichos datos para su posterior presentacion. 
  */

  getPredicciones_rf(){
    this._prediccionesService.getPredicciones("rfPredictions").subscribe(
      response => {
        //Carga de datos para las tablas.
        this.Modelo1 = response;
        //Orden de los datos
        this.Modelo1.sort((a,b) => { return a.id - b.id});
        //Carga de datos para las graficas
        this.Modelo1.forEach(dato_modelo1 => {
          this.data_temp_m1.push(dato_modelo1["AMBIENT_TEMPERATURE"]);
          this.data_press_m1.push(dato_modelo1["AIR_PRESSURE"]);
          this.data_hum_m1.push(dato_modelo1["HUMIDITY"]);
          var fecha = new Date(dato_modelo1["utc"]).getHours();
          this.label.push( fecha + ":00");
        });
      },
      error => {
        console.log(error);
      }
    );
  }


  getPredicciones_dnn(){
    this._prediccionesService.getPredicciones("dnnPredictions").subscribe(
      response => {
        //Carga de datos para las tablas.
        this.Modelo2 = response;
        //Orden de los datos
        this.Modelo2.sort((a,b) => { return a.id - b.id});
        //Carga de datos para las graficas
        this.Modelo2.forEach(dato_modelo2 => {
          this.data_temp_m2.push(dato_modelo2["AMBIENT_TEMPERATURE"]);
          this.data_press_m2.push(dato_modelo2["AIR_PRESSURE"]);
          this.data_hum_m2.push(dato_modelo2["HUMIDITY"]);

          
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getPredicciones_arima(){
    this._prediccionesService.getPredicciones("arimaPredictions").subscribe(
      response => {
        //Carga de datos para las tablas.
        this.Modelo3 = response;
        //Orden de los datos
        this.Modelo3.sort((a,b) => { return a.id - b.id});
        //Carga de datos para las graficas
        this.Modelo3.forEach(dato_modelo3 => {
          this.data_temp_m3.push(dato_modelo3["AMBIENT_TEMPERATURE"]);
          this.data_press_m3.push(dato_modelo3["AIR_PRESSURE"]);
          this.data_hum_m3.push(dato_modelo3["HUMIDITY"]);
          
        });
      },
      error => {
        console.log(error);
      }
    );
  }


  getPredicciones_lstm(){
    this._prediccionesService.getPredicciones("").subscribe(
      response => {
        //Carga de datos para las tablas.
        this.Modelo4 = response;
        //Orden de los datos
        this.Modelo4.sort((a,b) => { return a.id - b.id});
        //Carga de datos para las graficas
        this.Modelo4.forEach(dato_modelo4 => {
          this.data_temp_m4.push(dato_modelo4["AMBIENT_TEMPERATURE"]);
          this.data_press_m4.push(dato_modelo4["AIR_PRESSURE"]);
          this.data_hum_m4.push(dato_modelo4["HUMIDITY"]);
          
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  //----------------------------CALCULO % DE ERROR--------------------------------------
  /*
  El siguiente lote de codigo calcula el porcentaje de error de los distintos modelos, utilizando la formula
  de % de error.
  */

  getError(modelo, k){
    this._climaService.getComparacion().subscribe(
      response => {
        var valores = response;
        //console.log(prueba);
        this._prediccionesService.getPredicciones(modelo).subscribe(
          response => {
            var valores2 = response;
            //console.log(prueba2);
            valores2.sort((a,b) => { return a.id - b.id});
            var j = 0;
            var acum;
            var acum2 = 0;
            var acum3 = 0;
            for(var i = 0; i < valores.length; i++){
              if(valores[i]["AMBIENT_TEMPERATURE"] != 0){
                acum = Number((Math.abs((valores[i]["AMBIENT_TEMPERATURE"]) - (valores2[i]["AMBIENT_TEMPERATURE"]))).toFixed(2)); 
                acum2 = Number((Math.abs((valores[i]["AIR_PRESSURE"]) - (valores2[i]["AIR_PRESSURE"]))).toFixed(2)); 
                acum3 = Number((Math.abs((valores[i]["HUMIDITY"]) - (valores2[i]["HUMIDITY"]))).toFixed(2));
                //console.log(acum);
                j++;
              }
            }
            this.PError_Temp[k] = ((acum/(j)).toFixed(2));
            this.PError_Press[k] = ((acum2/(j)).toFixed(2));
            this.PError_Hum[k] = ((acum3/(j)).toFixed(2));
            
            
          }
        )
      }
    )

  }

  //-----------------------CONFIGURACON DE LAS GRAFICAS-------------------
  /*
    Configuracion inicial de las graficas mostradas en el apartado configuracion.
    Aqui se puede elegir el color de las lineas, entre otras opciones mas avanzadas.
  */
  lineChartLabels: Label[] = this.label;
  //lineChartLabels_m3: Label[] = this.label_m3;

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

  //--------------------GRAFICAS--------------------------
  /*
    Asignaion de los datos obtenidos en cada tabla respectivamente
    data_***_m1 = RF
    data_***_m2 = DNN
    data_***_m3 = ARIMA
    data_***_m4 = LSTM
  */

  //--------------Graficas - Modelo RF-----------------------
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

 //--------------Graficas - Modelo DNN-----------------------
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
    { data: this.data_hum_hoy, label: 'Humedad capturada' }
  ];

 //--------------Graficas - Modelo ARIMA-----------------------
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

  //--------------Graficas - Modelo LSTM-----------------------
  lineChartData_temp_m4: ChartDataSets[] = [
    { data: this.data_temp_m4, label: 'Temperatura modelo 4' },
    { data: this.data_temp_hoy, label: 'Temperatura capturada' }
  ];

  lineChartData_press_m4: ChartDataSets[] = [
    { data: this.data_press_m4, label: 'Presion modelo 4' },
    { data: this.data_press_hoy, label: 'Presion capturada' }
  ];

  lineChartData_hum_m4: ChartDataSets[] = [
    { data: this.data_hum_m4, label: 'Humedad modelo 4' },
    { data: this.data_hum_hoy, label: 'Humedad capturada' }
  ];

}


