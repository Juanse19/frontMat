import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable, Subject, of } from 'rxjs';


// interface Ordenes {
//     order: string;
//     name: string;
//     description: string;
//     reference: string;
//     orderLength: number;
//   }

//   interface PropiedadesActualizar {
//     descripcionMaquina: string;
//     type: string;
//     valor: string;
//     isOn: boolean;
//     prioridad: number;
//   }

  interface Consumezone {
    ZoneId: string;
    ZoneName: string;
    Estado: string;
    Consumo: string;
    ContadorMaletas: string;
    TiempoOn: string;
    TiempoOff: string;
    }

@Injectable({
    providedIn: 'root',
})

export class ApiGetService {

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

    // PostJson(url: string, propiedadesActualizar) {
    //     return this.http.post(url, propiedadesActualizar, this.httpOptions);
    // }
    // Suma() {
    //     console.log(5 + 5);
    // }

}
