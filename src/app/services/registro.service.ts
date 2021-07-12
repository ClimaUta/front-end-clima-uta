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

    getUltimoRegistro(idRaspi): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'Application/json');

        return this._http.get(this.url+'get-record/'+ idRaspi.toString(), {headers: headers});
    }
}