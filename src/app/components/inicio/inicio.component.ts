import { Component, OnDestroy, OnInit } from '@angular/core';
import { Clima } from '../../models/clima';
import { ClimaService } from '../../services/clima.service'


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ClimaService]
})
export class InicioComponent implements OnInit, OnDestroy {
  public climas: Clima[];
  alive = true;

  constructor(
    private _climaService: ClimaService
  ) {
    
   }
  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
    this.getClima();

    
  }

  getClima(){
    this._climaService.getClima().subscribe(
      response => {
        console.log(response[0].ID);
        this.climas = response;
        console.log(this.climas[0].CREATED);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
