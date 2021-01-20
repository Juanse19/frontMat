import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
// import { Observable, Subject, of } from 'rxjs';


interface Ordenes {
    order: string;
    name: string;
    description: string;
    reference: string;
    orderLength: number;
  }

@Injectable({
    providedIn: 'root',
})

export class ApiGetService {

    constructor(private http: HttpClient) {}

    GetJson(url: string) {
        return this.http.get(url);
    }


}
