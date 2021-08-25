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

  constructor(
    private _repositorioService: RepositorioService
    ) 
  {
    this.registro = true;
    this.clima = true;
    this.prediccion = [true, true, true, true];
  }

  ngOnInit(): void {
    
  }

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

  download_registros(Data){
    this._repositorioService.downloadFile_registros(Data, 'registros_clima_uta');
  }

  download_clima(Data){
    this._repositorioService.downloadFile_clima(Data, 'climas_clima_uta');
  }

  download_prediccion(Data, modelo){
    this._repositorioService.downloadFile_prediccion(Data, modelo+'_clima_uta');
  }

}
