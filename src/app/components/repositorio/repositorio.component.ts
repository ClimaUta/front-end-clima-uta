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
  public prediccion: boolean;

  constructor(private _repositorioService: RepositorioService) 
  {
    this.registro = true;
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

}
