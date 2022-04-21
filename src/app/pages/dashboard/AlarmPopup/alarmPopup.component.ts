import { Component, ElementRef, PipeTransform, TemplateRef, ViewChild,Injectable } from '@angular/core';
import { NbComponentStatus, NbWindowService } from '@nebular/theme';
import {ApiGetService} from './apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
// import { WindowComponent } from '../../modal-overlays/window/window.component';
import { title } from 'process';
import { threadId } from 'worker_threads';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, map, startWith, switchMap, tap } from 'rxjs/operators';
// import {WindowComponentAlarm } from '../AlarmPopup/alarmPopup.component'
import { HttpClient } from '@angular/common/http';

// import { ApiGetService } from '../OrderTable/apiGet.services';
// import {HttpClient} from '@angular/common/http'
// import { WindowFormComponent } from '../..window-form/window-form.component';
// import { WindowFormComponent } from '../../modal-overlays/window/window-form/window-form.component';


interface Country {
    name: string;
    flag: string;
    area: number;
    population: number;
  }

  interface Alarmas {
    id?: number;
    message: string;
    level: string;
    exception: string;
    userId: number;
    timeStamp: string;
  }

  interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
  }
  
  let ALARMAS: Alarmas[] = [


  ];

  interface SearchResult2 {
    alarmas: Alarmas[];
    total: number;
  }

  const COUNTRIES: Country[] = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754
    },
    {
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199
    },
    {
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463
    },
    {
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397
    }
  ];

  function matches2(alarmas: Alarmas, term: string, pipe: PipeTransform) {
    return alarmas.level.toLowerCase().includes(term.toLowerCase())
      || alarmas.timeStamp.toLowerCase().includes(term.toLowerCase())
      || alarmas.message.toLowerCase().includes(term.toLowerCase());
      // || pipe.transform(alarmas.userId).includes(term);
      // || pipe.transform(alarmas.userId).includes(term);
  }

@Component({
  providers: [ApiGetService,
    DecimalPipe,],
  selector: 'ngx-windowOrderPopup',
  templateUrl: './alarmPopup.component.html',
  styleUrls: ['alarmPopup.component.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class WindowComponentAlarm {

//     countries = COUNTRIES;
//     alarmas = ALARMAS;
//     alaramsFiltro;
//     // page = 1;
//     // pageSize = 10;
//     collectionSize = ALARMAS.length;

//     private _state: State = {
//       page: 1,
//       pageSize: 5,
//       searchTerm: '',
  
//     };

//     filter = new FormControl('');

//   private _loading$ = new BehaviorSubject<boolean>(true);
//   private _search$ = new Subject<void>();
//     // private _countries$ = new BehaviorSubject<Country[]>([]);
//   private _Alarmas$ = new BehaviorSubject<Alarmas[]>([]);

//   private _total$ = new BehaviorSubject<number>(0);

// //   dataPost: OrdenActualizar;
//   statuses: NbComponentStatus[] = ['basic'];

//   options = [
//     { value: 'STAKER#1', label: 'STAKER#1' },
//     { value: 'STAKER#2', label: 'STAKER#2' },
//     // { value: 'This is value 3', label: 'Option 3' },
//     // { value: 'This is value 4', label: 'Option 4' },
//   ];
//   option;

//   options2 = [
//     { value: 'Martin 1228', label: 'Martin 1228' },
//     { value: 'JS', label: 'JS' },
//     { value: '924', label: '924' },
//     { value: 'S&S', label: 'S&S' },
//   ];
//   option2;

  

// public selectedDestino ;
// public selectedOrigen ;

//   @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
//   @ViewChild('contentTemplate2', { static: true }) contentTemplate2: TemplateRef<any>;
//   @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;




//   // @ViewChild('desplegableValor') desplegableValor:NbSelectComponent;


//   constructor(
//     private windowService: NbWindowService,
//     private apiGetComp: ApiGetService,
//     public pipe: DecimalPipe,
//     private api: HttpService,
//     // public desplegable: NbSelectComponent,
//     // public pipe : DecimalPipe
//     // private windowTitle:NbWindowConfig,
//     // private nombre2: titl,
//     ) {
//       this.refreshAlarms();
//       this._search$.pipe(
//         tap(() => this._loading$.next(true)),
//         debounceTime(200),
//         switchMap(() => this._search()),
//         delay(200),
//         tap(() => this._loading$.next(false)),
//       ).subscribe(result => {
//         this._Alarmas$.next(result.alarmas);
//         this._total$.next(result.total);
//       });

//       this._search$.next();
//     //   this.MaquinasDestinoLista();
//     //   this.MaquinasOrigenLista();
//     }

//     // data = ORDEN;
//     dataOption2;

//     get alarmas$() { return this._Alarmas$.asObservable(); }
//     get total$() { return this._total$.asObservable(); }
//     get loading$() { return this._loading$.asObservable(); }
//     get page() { return this._state.page; }
//     get pageSize() { return this._state.pageSize; }
//     get searchTerm() { return this._state.searchTerm; }

//     set page(page: number) { this._set({page}); }
//     set pageSize(pageSize: number) { this._set({pageSize}); }
//     set searchTerm(searchTerm: string) { this._set({searchTerm}); }

//     private _set(patch: Partial<State>) {
//       Object.assign(this._state, patch);
//       this._search$.next();
//     }
  
//     _search(): Observable<SearchResult2> {
  
//       const {pageSize, page, searchTerm} = this._state;

//       let alarmas = ALARMAS;
  
//       // 2. filter
//       alarmas = alarmas.filter(ordenes => matches2(ordenes, searchTerm, this.pipe));
//       const total = alarmas.length;
  
//       // 3. paginate
//       alarmas = alarmas.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
//       // return of({countries, total});
//       this.alaramsFiltro = alarmas;
//       return of({alarmas, total});
//     }

//   openWindowForm(nombreWindow: string, texto: string) {
//     // this.MaquinasDestinoLista();
//     this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Alarms/GetAlarms').subscribe((res: any) => {
//       ALARMAS = res;
//       console.log(ALARMAS)
//       this.windowService.open(WindowComponentAlarm, { title: nombreWindow});
//   })
//   }

//   refreshAlarms() {
//     this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Alarms/GetAlarms').subscribe((res: any) => {
//       ALARMAS = res;
//     this.alarmas = ALARMAS
//       .map((alarms, i) => ({id: i + 1, ...alarms}))
//       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
//   })
//  }
// //   MaquinasDestinoLista() {

// //     this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerMaquinasDestinoLista').subscribe((res: any) => {
// //       DESTINOS = res;
// //       });
// //   }

// //   MaquinasOrigenLista() {

// //     this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerMaquinasOrigenLista').subscribe((res: any) => {
// //       ORIGENES = res;
// //       // console.log(ORIGENES);
// //       });
// //   }


// openWindow(contentTemplate, titleValue: string, textValue: string, numberValue: number, nameValue: string, value: number) {

//     this.windowService.open(
//       contentTemplate,
//       {
//         title: titleValue,
//         context: {
//           text: textValue,
//           number: numberValue,
//           name: nameValue,
//           x: value,
//         },
//       },
//     );
//   }

//   openWindow2(contentTemplate2, titleValue: string, orderValue: string, nameValue: string, descripcionValue: string, referenciaValue: string, orderLengthValue: number) {
//     this.windowService.open(
//       contentTemplate2,
//       {
//         title: titleValue,
//         context: {
//           orden: orderValue,
//           nombre: nameValue,
//           descripcion: descripcionValue,
//           referencia: referenciaValue,
//           orderLength: orderLengthValue,

//         },
//       },
//     );
//   }





}
