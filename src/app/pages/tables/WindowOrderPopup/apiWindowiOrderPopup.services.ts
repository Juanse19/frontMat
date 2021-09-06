import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable, Subject, of } from 'rxjs';


// export class OrdenActualizar {
//     orden: string;
//     referencia: string;
//     origen: string;
//     destino: string;
//     longitud: number;
//     cortes: number;
//     cortesAncho: number;
//     cortesLargo: number;
//   }

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


@Injectable({
    providedIn: 'root',
})

export class ApiWindowOrderPopup {


    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        //   responseType: 'text'
        }),
        'responseType': 'blob' as 'json',
      };

    constructor(private http: HttpClient) {}

    GetJson(url: string) {
        return this.http.get(url);
    }

    PostJson(url: string, ordenActualizar: OrdenActualizar) {
        return this.http.post(url, ordenActualizar, this.httpOptions);
    }
    // GetJson(url:string){
    //     return this.http.get<Observable<Ordenes[]>>(url);
    // }

    Suma() {
        console.log(5 + 5);
    }

}
