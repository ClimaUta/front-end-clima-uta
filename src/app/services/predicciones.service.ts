import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Global } from "./global";
import 'rxjs/add/operator/map';
import { mode } from "d3";

@Injectable()
export class PrediccionesService {
    
    public urlApi: String

    constructor(
        private _http: HttpClient
    ){
        this.urlApi = Global.url;
    }
    
/**
 * Peticion a la api Clima-Uta para la obtencion de los datos pedichos.
 * @param modelo = Nombre de la tabla que se quiere obtener datos.
 * @returns = Datos pedichos.
 */
    getPredicciones(modelo): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.urlApi+'prediccion/'+ modelo, {headers: headers});
    }
}
