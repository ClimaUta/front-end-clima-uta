import { Component, OnInit } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';
import { ClimaService } from '../../services/clima.service';
import { PrediccionesService } from '../../services/predicciones.service';

@Component({
  selector: 'app-repositorio',
  templateUrl: './repositorio.component.html',
  styleUrls: ['./repositorio.component.css'],
  providers: [RepositorioService, ClimaService, PrediccionesService]
})
export class RepositorioComponent implements OnInit {

  private jsonData;
  public registro: boolean;
  public clima: boolean;
  public prediccion: boolean;

  constructor(
    private _repositorioService: RepositorioService,
    private _climaService: ClimaService,
    private _prediccionesService: PrediccionesService
    ) 
  {
    this.registro = true;
    this.clima = true;
    this.prediccion = true;
  }

  ngOnInit(): void {
    
  }

  descargar_registros(){
    this.registro = false;
    this._repositorioService.getRegistros().subscribe(
      response => {
        console.log(response.length);
        this.jsonData = response;
        this.download(this.jsonData);
        this.registro = true;
      },
      error => {
        console.log(error);
      }
    );
    
  }

  download(Data){
    this._repositorioService.downloadFile(Data, 'registros_clima_uta');
  }

  descargar_climas(){
    this.clima = false;
    this._climaService.getClimaTotal().subscribe(
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

  download_clima(Data){
    this._climaService.downloadFile(Data, 'climas_clima_uta');
  }

  /*descargar_predicciones(){
    this.prediccion = false;
    this._prediccionesService.getPredicciones_rf().subscribe(
      response => {
        console.log(response.length);
        this.jsonData = response;
        this.download_predicciones(this.jsonData);
        this.prediccion = true;
      },
      error => {
        console.log(error);
      }
    );
    
  }

  download_predicciones(Data){
    this._prediccionesService.downloadFile(Data, 'predicciones_clima_uta');
  }*/

}
