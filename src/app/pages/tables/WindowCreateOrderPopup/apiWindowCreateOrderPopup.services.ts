import { Injectable} from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Interface } from 'readline';

interface OrdenActualizar {
  orden: string;
  referencia: string;
  origen: string;
  destino: string;
  longitud: number;
  cortes: number;
  cortesAncho: number;
  cortesLargo: number;
}

interface OrdenCrear {
  orden: string;
  referencia: string;
  batch: number;
  longitudOrden: number;
  cortesNumero: number;
  cortesAncho: number;
  cortesLargo: number;
  sheetsNumbers: number;
  stackHeight: number;
  sheetThickness: number;
  origen: string;
  destino: string;
  productMissing: number;
  signalStart: boolean;
  sheetScrap: string;
}

@Injectable({
    providedIn: 'root'
})

export class ApiWindowCreateOrderPopup{


    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        //   responseType: 'text'
        }),
        'responseType': 'blob' as 'json'
      };

    constructor(private http: HttpClient){}

    GetJson(url:string){
        return this.http.get(url);
    }

    PostJson(url:string, ordenActualizar: OrdenActualizar){
        return this.http.post(url, ordenActualizar, this.httpOptions);
    }

    PostJsonCrear(url:string, ordenCrear: OrdenCrear){
      return this.http.post(url, ordenCrear, this.httpOptions);
  }
    // GetJson(url:string){
    //     return this.http.get<Observable<Ordenes[]>>(url);
    // }

    Suma(){
        console.log(5+5);
    }

}
