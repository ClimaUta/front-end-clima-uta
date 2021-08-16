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

    getClimaTotal(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.url+'climas-total', {headers: headers});
    }

    getClimaHoy(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.url+'clima-hoy', {headers: headers});
    }

    getComparacion(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.url+'clima-comparacion', {headers: headers});
    }

    getClimaOpenWeather(){
        

        return this._http.get('https://api.openweathermap.org/data/2.5/weather?q='+ this.ciudad+'&units='+ this.unidad +'&appid='+ this.apiKey);
    }

    downloadFile(data, filename='data') {
        let csvData = this.ConvertToCSV(data, ['AMBIENT_TEMPERATURE', 'AIR_PRESSURE', 'HUMIDITY', 'CREATED']);
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    ConvertToCSV(objArray, headerList) {
         let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
         let str = '';
         let row = 'ID,';

         for (let index in headerList) {
             row += headerList[index] + ',';
         }
         row = row.slice(0, -1);
         str += row + '\r\n';
         for (let i = 0; i < array.length; i++) {
             let line = (i+1)+'';
             for (let index in headerList) {
                let head = headerList[index];

                 line += ',' + array[i][head];
             }
             str += line + '\r\n';
         }
         return str;
    }

}