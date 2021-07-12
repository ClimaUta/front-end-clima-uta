import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Global } from "./global";

@Injectable()

export class ClimaService{
    public url: string;
    public ciudad: string;
    public unidad: string;
    public apiKey: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
        this.ciudad = "Iquique";
        this.unidad = "metric";
        this.apiKey = "d0199d4f4fc731474e8264d86862d19c";

    }

    getClima(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.url+'clima', {headers: headers});
    }

    getClimaOpenWeather(){
        

        return this._http.get('https://api.openweathermap.org/data/2.5/weather?q='+ this.ciudad+'&units='+ this.unidad +'&appid='+ this.apiKey);
    }

}