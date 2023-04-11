import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../api/http.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GanttService {

    private _getGantt
    private _sdo$ = new Subject();
    sdoData$ = this._sdo$.asObservable();
    mensaje: any;

    constructor(private http: HttpClient, private api: HttpService) { }

    get ganttData() {
        console.log('item', this._getGantt);
        return this._getGantt
    }

    showGanttTo(item: any) {
        this._getGantt = item;
        this._sdo$.next(item);
    }

    showSdo(item: any) {
        this._sdo$.next(item);
    }

    enviarMensaje(mensaje: any) {
        this.mensaje = mensaje;
    }

    obtenerMensaje(): string {
        return this.mensaje;
    }

}
