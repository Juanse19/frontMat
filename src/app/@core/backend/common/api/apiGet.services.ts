import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { Observable, Subject, of } from 'rxjs';
import { retry } from 'rxjs/operators';


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
          // retry(3),
          catchError((error) => {
            console.log();
            return throwError(error);
          }),
        );
    }

    PostJson(url: string, propiedadesActualizar) {
        return this.http.post(url, propiedadesActualizar, this.httpOptions);
    }
    Suma() {
        console.log(5 + 5);
    }

}
