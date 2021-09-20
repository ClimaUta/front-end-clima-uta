import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Global } from "./global";
import 'rxjs/add/operator/map';


@Injectable()
export class RepositorioService {

    public urlApi: String

    constructor(
        private _http: HttpClient
    ){
        this.urlApi = Global.url;
    }
//----------------------PETICIONES HTTP----------------------------------------
/**
 * El siguiente conjunto de codigo solo son peticiones a la api clima-uta
 */
    getRegistros(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.urlApi+'get-records/', {headers: headers});
    }

    getClimaTotal(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.urlApi+'climas-total', {headers: headers});
    }
/**
 * 
 * @param modelo = el nombre de la tabla que se quieren obtener datos.
 * @returns Conjunto de valores predichos por los distintos modelos.
 */    

    getPredicciones(modelo): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.urlApi+'prediccion-total/'+ modelo, {headers: headers});
    }

    getTamano(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.urlApi+'tamano/', {headers: headers});
    }
    //Tabulacion de datos
/**
 * El siguiete codigo prepara los datos obtenidos para su posterior descarga
 * @param objArray = Array de datos obtenidos.
 * @param headerList = Array con las cabeceras de la tabla.
 * @returns Un array combinado de los dos anteriores.
 */
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

    //Conversion a achivo CSV y descarga.
    /**
     * El siguiente conjunto decodigo permite la descarga de los archivos, inependiente del navegador.
     * @param data = Array de datos.
     * @param filename = Nombre que tendra archivo descargado.
     */

    downloadFile_registros(data, filename='data') {
        let csvData = this.ConvertToCSV(data, ['REMOTE_ID', 'AMBIENT_TEMPERATURE', 'AIR_PRESSURE', 'HUMIDITY', 'CREATED', 'serverDate']);
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

    //Conversion a achivo CSV y descarga.
    downloadFile_clima(data, filename='data') {
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

    //Conversion a achivo CSV y descarga.
    downloadFile_prediccion(data, filename='data') {
        let csvData = this.ConvertToCSV(data, ['AMBIENT_TEMPERATURE', 'AIR_PRESSURE', 'HUMIDITY', 'hour', 'day', 'month', 'year', 'utc']);
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
}
