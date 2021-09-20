import { Component, OnInit } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';

@Component({
  selector: 'app-repositorio',
  templateUrl: './repositorio.component.html',
  styleUrls: ['./repositorio.component.css'],
  providers: [RepositorioService]
})
export class RepositorioComponent implements OnInit {

  private jsonData;
  public registro: boolean;
  public clima: boolean;
  public prediccion: boolean[];
  public pesos: string[];

  constructor(
    private _repositorioService: RepositorioService
    ) 
  {
    this.registro = true;
    this.clima = true;
    this.prediccion = [true, true, true, true];
    this.tamanos();
  }

  ngOnInit(): void {
    
  }

//Peticion a la api Clima-uta para mostrar tamaños aprox de los archivos
  tamanos(){
    this._repositorioService.getTamano().subscribe(
      response => {
        console.log(response);
        this.pesos = response;
        console.log(this.pesos[0]);
      },
      error => {
        console.log(error);
      }
    )
  }

  //Peticion a la api clima-uta para realizar descarga de datos.
  descargar_registros(){
    this.registro = false;
    this._repositorioService.getRegistros().subscribe(
      response => {
        console.log(response.length);
        this.jsonData = response;
        this.download_registros(this.jsonData);
        this.registro = true;
      },
      error => {
        console.log(error);
      }
    );
    
  }

  //Peticion a la api clima-uta para realizar descarga de datos.
  descargar_climas(){
    this.clima = false;
    this._repositorioService.getClimaTotal().subscribe(
      response => {
        console.log(response.length);
        this.jsonData = response;
        this.download_clima(this.jsonData);
        this.clima = true;
      },
      error => {
        console.log(error);
      }
    );
    
  }

  //Peticion a la api clima-uta para realizar descarga de datos.
  descargar_prediccion(modelo, i){
    this.prediccion[i] = false;
    this._repositorioService.getPredicciones(modelo).subscribe(
      response => {
        console.log(response.length);
        this.jsonData = response;
        this.download_prediccion(this.jsonData, modelo);
        this.prediccion[i] = true;
      },
      error => {
        console.log(error);
      }
    );
    
  }

  //Creacion del CSV con los datos obtenidos.
  download_registros(Data){
    this._repositorioService.downloadFile_registros(Data, 'registros_clima_uta');
  }

  //Creacion del CSV con los datos obtenidos.
  download_clima(Data){
    this._repositorioService.downloadFile_clima(Data, 'climas_clima_uta');
  }

  //Creacion del CSV con los datos obtenidos.
  download_prediccion(Data, modelo){
    this._repositorioService.downloadFile_prediccion(Data, modelo+'_clima_uta');
  }

}
