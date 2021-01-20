import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { Observable, Subject, of } from 'rxjs';


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

    PostJson(url: string, propiedadesActualizar) {
        return this.http.post(url, propiedadesActualizar, this.httpOptions);
    }
}
