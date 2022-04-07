import { catchError } from 'rxjs/operators';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
// import { Observable, Subject, of, throwError } from 'rxjs';


interface Ordenes {
    order: string;
    name: string;
    description: string;
    reference: string;
    orderLength: number;
  }

  interface PropiedadesActualizar {
    descripcionMaquina: string;
    type: string;
    valor: string;
    isOn: boolean;
    prioridad: number;
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
        return this.http.get(url).pipe(
          catchError((error) => {
            console.log();
            return throwError(error)
          })
        );
    }

    PostJson(url: string, propiedadesActualizar) {
        return this.http.post(url, propiedadesActualizar, this.httpOptions).pipe(
          catchError((error) => {
            console.log();
            return throwError(error)
          })
        );
    }
    Suma() {
        console.log(5 + 5);
    }

}
