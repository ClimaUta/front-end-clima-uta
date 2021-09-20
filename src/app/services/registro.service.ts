import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Global } from "./global";

@Injectable()

export class RegistroService{
    public url: String

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    /**
     * Peticion a la api Clima-uta para la obtencion del ultimo valor registrado por cada sensor.
     * @param idRaspi = ID del modelo deseado.
     * @returns = Ultimo registro de dicho moelo.
     */
    getUltimoRegistro(idRaspi): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.url+'get-record/'+ idRaspi.toString(), {headers: headers});
    }
}