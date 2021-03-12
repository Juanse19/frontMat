/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output, ViewChild , TemplateRef, PipeTransform, ElementRef} from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { NbThemeService } from '@nebular/theme';
import { delay, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject, of, BehaviorSubject, interval,Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JacComponent } from '../../JacComponent/jac.component';
import { WindowComponent } from '../../WindowPopupComponent/windowPopup.component';
import {ApiGetService} from '../../WindowPopupComponent/apiGet.services';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import {WindowComponent2 } from '../../OrderPopup/orderPopup.component';
import { HttpService } from '../../../../@core/backend/common/api/http.service';
import { NbAccessChecker } from '@nebular/security';
import { SignalRService } from '../../services/signal-r.service';
import { MessageService } from '../../services/MessageService';
import { IdMaquinas, IdWip,MachineColor, WipColor, OrderProcess } from '../../_interfaces/MatBox.model';


// import {WindowFormComponent} from '../../../modal-overlays/window/window-form/window-form.component'
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}


interface Ordenes {
  id?: number;
  order: string;
  name: string;
  description: string;
  reference: string;
  orderLength: number;
}

interface Propiedades {
  id?: number;
  name: string;
  description: string;
  isOn: boolean;
  type: string;
  valor: string;
  prioridad: number;
}

interface Wip{
  id?: number;
  name: string;
  description: string;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}

interface SearchResult {
  countries: Country[];
  total: number;
}

interface SearchResult2 {
  ordenes: Ordenes[];
  total: number;
}


let ORDENES: Ordenes[] = [


];

let PROPIEDADES: Propiedades;
{

}


let WIPLIST: Wip[]=[


];



const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
  },
];

const SVG_NS = "http://www.w3.org/2000/svg";
// let objeto = {
//   x: 10,
//   y: 10,
//   width: 20,
//   height: 20,
//   stroke: "black",
//   fill: "black"
// };

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter(country => {
    const term = text.toLowerCase();
    return country.name.toLowerCase().includes(term)
        || pipe.transform(country.area).includes(term)
        || pipe.transform(country.population).includes(term);
  });
}

function matches2(ordenes: Ordenes, term: string, pipe: PipeTransform) {
  return ordenes.order.toLowerCase().includes(term)
    || ordenes.name.toLowerCase().includes(term.toLowerCase())
    || ordenes.description.toLowerCase().includes(term.toLowerCase())
    || ordenes.reference.toLowerCase().includes(term)
    || pipe.transform(ordenes.orderLength).includes(term);
}

function search2(text: string, pipe: PipeTransform): Ordenes[] {
  // this.apiGetComp.GetJson(this.api.apiUrlMatbox +'/Orders/ObtenerOrdersMaqina?idMaquina=39').subscribe((res:Ordenes[])=>{});
  return ORDENES.filter(ordenes => {
    const term = text.toLowerCase();
    return ordenes.order.toLowerCase().includes(term)
        || ordenes.name.toLowerCase().includes(term)
        || ordenes.description.toLowerCase().includes(term)
        || ordenes.reference.toLowerCase().includes(term)
        // || pipe.transform(ordenes.description).includes(term)
        // || pipe.transform(ordenes.reference).includes(term)
        || pipe.transform(ordenes.orderLength).includes(term);
  });
}

@Component({
  providers: [JacComponent
  , WindowComponent
  , ApiGetService
  , DecimalPipe
  , WindowComponent2,
  // , WindowFormComponent
  ],
  selector: 'ngx-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.scss'],
})


export class RoomSelectorComponent implements OnInit, OnDestroy {
  @ViewChild('autoInput') input;
  
  messages: any[] = [];
  subscription: Subscription;
  inputOrder: string;

  public orderProcess:OrderProcess[];
  

  public dataMachineColor:MachineColor = {
    color924:"White",
    colorImpresora36:"White",
    colorJS:"White",
    colorLaminadora:"White",
    colorMartin1228:"White",
    colorSYS:"White",
    colorWARD15000:"White",

  };

    public dataWipColor:WipColor = {
    colorST1:"Black",
    colorST2:"Black",
    colorST3:"Black",
    colorST4:"Black",
    colorST5:"Black",
    colorST6:"Black",
    colorST7:"Black",
    colorST8:"Black",
    colorST9:"Black",
    colorST10:"Black",
    colorST11:"Black",
    colorST12:"Black",
    colorST13:"Black",
    colorST14:"Black",
    colorST15:"Black",
  };


  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',

  };
  valorXPquetes = 0;
  valorXCT = 0;
  valorYCT1 = 591.798;
  valorYCT2 = 591.798;
  valorZTM = 0;

  paqueteNombe = "paqueteST6"
  contPaqueteST6 = 0;
  contPaqueteST3 = 0;
  contPaqueteST7 = 0;
  contPaqueteST8 = 0;
  contPaqueteST9 = 0;
  contPaqueteST10 = 0;
  contPaqueteST11 = 0;
  contPaqueteST12 = 0;
  contPaqueteST13 = 0;
  contPaqueteST14 = 0;
  contPaqueteST15 = 0;
  contPaqueteST4 = 0;
  contPaqueteST5 = 0;
  contPaqueteST1 = 0;
  contPaqueteST2 = 0;

  public fillValor;
  public colorMartin1228;
  public colorWARD15000;
  public colorLaminadora;
  public colorImpresora36;
  public colorJS;
  public color924;
  public colorSYS;

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
    // private _countries$ = new BehaviorSubject<Country[]>([]);
  private _Ordenes$ = new BehaviorSubject<Ordenes[]>([]);

  private _total$ = new BehaviorSubject<number>(0);

  countries$: Observable<Country[]>;
  // ordenesMaquina$: Observable<Ordenes[]>;

  filter = new FormControl('');

  countries = COUNTRIES;
  ordenesMaquina = ORDENES;

  private destroy$ = new Subject<void>();
  private hideGrid: boolean;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('contentTemplate2', { static: true }) contentTemplate2: TemplateRef<any>;
  @ViewChild(JacComponent) jacComponente: JacComponent;
  @ViewChild('paqueteRec') paqueteRec:ElementRef;


  hola: string;

  @Output() select: EventEmitter<number> = new EventEmitter();

  selectedRoom = null;
  sortedRooms = [];
  // viewBox = '-20 -20 618.88 407.99';
  viewBox = '-20 -20 640 480';
  isIE = !!(navigator.userAgent.match(/Trident/)
    || navigator.userAgent.match(/MSIE/)
    || navigator.userAgent.match(/Edge/));
  isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;
  roomSvg = {
    borders: [{
      // d: 'M186.21,130.05H216.37V160H186.21Z',
      d: 'M139.3 169.4 H167.60000000000002 V197.70000000000002 H139.3 V169.4 z',
    }],
    stokedAreas: [
    //   // { d: 'M562.71,225V354h-290V319H418.37a6.09,6.09,0,0,0,6.09-6.09V225Z' },
    //   // { d: 'M8.09,130V347.91A6.09,6.09,0,0,0,14.18,354h54V130Z' },
    //   // { d: 'M216.37,49.82H358.8V92.5H216.37Z' },
    ],
    rooms: [

      { id: '0', name: { text: '', x: 139.3, y: 169.4 }, border: { d: 'M139.3 169.4 H167.60000000000002 V197.70000000000002 H139.3 V169.4 z' }, area:   { d: 'M139.3 169.4 H167.60000000000002 V197.70000000000002 H139.3 V169.4 z' }},
      { id: '1', name: { text: '', x: 167.7, y: 169.4 }, border: { d: 'M167.7 169.4 H196 V197.70000000000002 H167.7 V169.4 z' }, area:   { d: 'M167.7 169.4 H196 V197.70000000000002 H167.7 V169.4 z' }},
      { id: '2', name: { text: '', x: 366.5, y: 169.4 }, border: { d: 'M366.5 169.4 H394.8 V197.70000000000002 H366.5 V169.4 z' }, area:   { d: 'M366.5 169.4 H394.8 V197.70000000000002 H366.5 V169.4 z' }},
      { id: '3', name: { text: '', x: 394.9, y: 169.4 }, border: { d: 'M394.9 169.4 H423.2 V197.70000000000002 H394.9 V169.4 z' }, area:   { d: 'M394.9 169.4 H423.2 V197.70000000000002 H394.9 V169.4 z' }},
      { id: '4', name: { text: '', x: 451.6, y: 169.4 }, border: { d: 'M451.6 169.4 H479.90000000000003 V197.70000000000002 H451.6 V169.4 z' }, area:   { d: 'M451.6 169.4 H479.90000000000003 V197.70000000000002 H451.6 V169.4 z' }},
      { id: '5', name: { text: '', x: 479.9, y: 169.4 }, border: { d: 'M479.9 169.4 H508.2 V197.70000000000002 H479.9 V169.4 z' }, area:   { d: 'M479.9 169.4 H508.2 V197.70000000000002 H479.9 V169.4 z' }},
      { id: '6', name: { text: '', x: 508.2, y: 169.4 }, border: { d: 'M508.2 169.4 H536.5 V197.70000000000002 H508.2 V169.4 z' }, area:   { d: 'M508.2 169.4 H536.5 V197.70000000000002 H508.2 V169.4 z' }},
      { id: '7', name: { text: '', x: 536.6, y: 169.4 }, border: { d: 'M536.6 169.4 H564.9 V197.70000000000002 H536.6 V169.4 z' }, area:   { d: 'M536.6 169.4 H564.9 V197.70000000000002 H536.6 V169.4 z' }},
      { id: '8', name: { text: '', x: 564.9, y: 169.4 }, border: { d: 'M564.9 169.4 H593.1999999999999 V197.70000000000002 H564.9 V169.4 z' }, area:   { d: 'M564.9 169.4 H593.1999999999999 V197.70000000000002 H564.9 V169.4 z' }},
      { id: '9', name: { text: '', x: 54.3, y: 112.7 }, border: { d: 'M54.3 112.7 H82.6 V141 H54.3 V112.7 z' }, area:   { d: 'M54.3 112.7 H82.6 V141 H54.3 V112.7 z' }},
      { id: '10', name: { text: '', x: 82.6, y: 112.7 }, border: { d: 'M82.6 112.7 H110.89999999999999 V141 H82.6 V112.7 z' }, area:   { d: 'M82.6 112.7 H110.89999999999999 V141 H82.6 V112.7 z' }},
      { id: '11', name: { text: '', x: 82.6, y: 84.3 }, border: { d: 'M82.6 84.3 H110.89999999999999 V112.6 H82.6 V84.3 z' }, area:   { d: 'M82.6 84.3 H110.89999999999999 V112.6 H82.6 V84.3 z' }},
      { id: '12', name: { text: '', x: 54.3, y: 84.3 }, border: { d: 'M54.3 84.3 H82.6 V112.6 H54.3 V84.3 z' }, area:   { d: 'M54.3 84.3 H82.6 V112.6 H54.3 V84.3 z' }},
      { id: '13', name: { text: '', x: 167.7, y: 112.7 }, border: { d: 'M167.7 112.7 H196 V141 H167.7 V112.7 z' }, area:   { d: 'M167.7 112.7 H196 V141 H167.7 V112.7 z' }},
      { id: '14', name: { text: '', x: 196, y: 112.7 }, border: { d: 'M196 112.7 H224.3 V141 H196 V112.7 z' }, area:   { d: 'M196 112.7 H224.3 V141 H196 V112.7 z' }},
      { id: '15', name: { text: '', x: 167.7, y: 84.6 }, border: { d: 'M167.7 84.6 H196 V112.89999999999999 H167.7 V84.6 z' }, area:   { d: 'M167.7 84.6 H196 V112.89999999999999 H167.7 V84.6 z' }},
      { id: '16', name: { text: '', x: 196, y: 84.6 }, border: { d: 'M196 84.6 H224.3 V112.89999999999999 H196 V84.6 z' }, area:   { d: 'M196 84.6 H224.3 V112.89999999999999 H196 V84.6 z' }},
      { id: '17', name: { text: '', x: 167.7, y: 56.2 }, border: { d: 'M167.7 56.2 H196 V84.5 H167.7 V56.2 z' }, area:   { d: 'M167.7 56.2 H196 V84.5 H167.7 V56.2 z' }},
      { id: '18', name: { text: '', x: 196, y: 56.2 }, border: { d: 'M196 56.2 H224.3 V84.5 H196 V56.2 z' }, area:   { d: 'M196 56.2 H224.3 V84.5 H196 V56.2 z' }},
      { id: '19', name: { text: '', x: 224.4, y: 56.2 }, border: { d: 'M224.4 56.2 H252.70000000000002 V84.5 H224.4 V56.2 z' }, area:   { d: 'M224.4 56.2 H252.70000000000002 V84.5 H224.4 V56.2 z' }},
      { id: '20', name: { text: '', x: 111, y: 197.8 }, border: { d: 'M111 197.8 H139.3 V226.10000000000002 H111 V197.8 z' }, area:   { d: 'M111 197.8 H139.3 V226.10000000000002 H111 V197.8 z' }},
      { id: '21', name: { text: '', x: 139.3, y: 197.8 }, border: { d: 'M139.3 197.8 H167.60000000000002 V226.10000000000002 H139.3 V197.8 z' }, area:   { d: 'M139.3 197.8 H167.60000000000002 V226.10000000000002 H139.3 V197.8 z' }},
      { id: '22', name: { text: '', x: 167.7, y: 197.8 }, border: { d: 'M167.7 197.8 H196 V226.10000000000002 H167.7 V197.8 z' }, area:   { d: 'M167.7 197.8 H196 V226.10000000000002 H167.7 V197.8 z' }},
      { id: '23', name: { text: '', x: 451.6, y: 197.8 }, border: { d: 'M451.6 197.8 H479.90000000000003 V226.10000000000002 H451.6 V197.8 z' }, area:   { d: 'M451.6 197.8 H479.90000000000003 V226.10000000000002 H451.6 V197.8 z' }},
      { id: '24', name: { text: '', x: 479.9, y: 197.8 }, border: { d: 'M479.9 197.8 H508.2 V226.10000000000002 H479.9 V197.8 z' }, area:   { d: 'M479.9 197.8 H508.2 V226.10000000000002 H479.9 V197.8 z' }},
      { id: '25', name: { text: '', x: 508.2, y: 197.8 }, border: { d: 'M508.2 197.8 H536.5 V226.10000000000002 H508.2 V197.8 z' }, area:   { d: 'M508.2 197.8 H536.5 V226.10000000000002 H508.2 V197.8 z' }},
      { id: '26', name: { text: '', x: 536.6, y: 197.8 }, border: { d: 'M536.6 197.8 H564.9 V226.10000000000002 H536.6 V197.8 z' }, area:   { d: 'M536.6 197.8 H564.9 V226.10000000000002 H536.6 V197.8 z' }},
      { id: '27', name: { text: '', x: 564.9, y: 197.8 }, border: { d: 'M564.9 197.8 H593.1999999999999 V226.10000000000002 H564.9 V197.8 z' }, area:   { d: 'M564.9 197.8 H593.1999999999999 V226.10000000000002 H564.9 V197.8 z' }},
      { id: '28', name: { text: '', x: 54.3, y: 226.1 }, border: { d: 'M54.3 226.1 H82.6 V254.4 H54.3 V226.1 z' }, area:   { d: 'M54.3 226.1 H82.6 V254.4 H54.3 V226.1 z' }},
      { id: '29', name: { text: '', x: 25.9, y: 226.1 }, border: { d: 'M25.9 226.1 H54.2 V254.4 H25.9 V226.1 z' }, area:   { d: 'M25.9 226.1 H54.2 V254.4 H25.9 V226.1 z' }},
      { id: '30', name: { text: '', x: 82.6, y: 226.1 }, border: { d: 'M82.6 226.1 H110.89999999999999 V254.4 H82.6 V226.1 z' }, area:   { d: 'M82.6 226.1 H110.89999999999999 V254.4 H82.6 V226.1 z' }},
      { id: '31', name: { text: '', x: 111, y: 226.1 }, border: { d: 'M111 226.1 H139.3 V254.4 H111 V226.1 z' }, area:   { d: 'M111 226.1 H139.3 V254.4 H111 V226.1 z' }},
      { id: '32', name: { text: '', x: 139.3, y: 226.1 }, border: { d: 'M139.3 226.1 H167.60000000000002 V254.4 H139.3 V226.1 z' }, area:   { d: 'M139.3 226.1 H167.60000000000002 V254.4 H139.3 V226.1 z' }},
      { id: '33', name: { text: '', x: 167.7, y: 226.1 }, border: { d: 'M167.7 226.1 H196 V254.4 H167.7 V226.1 z' }, area:   { d: 'M167.7 226.1 H196 V254.4 H167.7 V226.1 z' }},
      { id: '34', name: { text: '', x: 479.9, y: 226.1 }, border: { d: 'M479.9 226.1 H508.2 V254.4 H479.9 V226.1 z' }, area:   { d: 'M479.9 226.1 H508.2 V254.4 H479.9 V226.1 z' }},
      { id: '35', name: { text: '', x: 536.6, y: 226.1 }, border: { d: 'M536.6 226.1 H564.9 V254.4 H536.6 V226.1 z' }, area:   { d: 'M536.6 226.1 H564.9 V254.4 H536.6 V226.1 z' }},
      { id: '36', name: { text: '', x: 564.9, y: 226.1 }, border: { d: 'M564.9 226.1 H593.1999999999999 V254.4 H564.9 V226.1 z' }, area:   { d: 'M564.9 226.1 H593.1999999999999 V254.4 H564.9 V226.1 z' }},
      { id: '37', name: { text: '', x: 54.3, y: 254.4 }, border: { d: 'M54.3 254.4 H82.6 V282.7 H54.3 V254.4 z' }, area:   { d: 'M54.3 254.4 H82.6 V282.7 H54.3 V254.4 z' }},
      { id: '38', name: { text: '', x: 25.9, y: 254.4 }, border: { d: 'M25.9 254.4 H54.2 V282.7 H25.9 V254.4 z' }, area:   { d: 'M25.9 254.4 H54.2 V282.7 H25.9 V254.4 z' }},
      { id: '39', name: { text: '', x: 82.6, y: 254.4 }, border: { d: 'M82.6 254.4 H110.89999999999999 V282.7 H82.6 V254.4 z' }, area:   { d: 'M82.6 254.4 H110.89999999999999 V282.7 H82.6 V254.4 z' }},
      { id: '40', name: { text: '', x: 111, y: 254.4 }, border: { d: 'M111 254.4 H139.3 V282.7 H111 V254.4 z' }, area:   { d: 'M111 254.4 H139.3 V282.7 H111 V254.4 z' }},
      { id: '41', name: { text: '', x: 139.3, y: 254.4 }, border: { d: 'M139.3 254.4 H167.60000000000002 V282.7 H139.3 V254.4 z' }, area:   { d: 'M139.3 254.4 H167.60000000000002 V282.7 H139.3 V254.4 z' }},
      { id: '42', name: { text: '', x: 167.7, y: 254.4 }, border: { d: 'M167.7 254.4 H196 V282.7 H167.7 V254.4 z' }, area:   { d: 'M167.7 254.4 H196 V282.7 H167.7 V254.4 z' }},
      { id: '43', name: { text: '', x: 54.3, y: 339.8 }, border: { d: 'M54.3 339.8 H82.6 V368.1 H54.3 V339.8 z' }, area:   { d: 'M54.3 339.8 H82.6 V368.1 H54.3 V339.8 z' }},
      { id: '44', name: { text: '', x: 82.6, y: 339.8 }, border: { d: 'M82.6 339.8 H110.89999999999999 V368.1 H82.6 V339.8 z' }, area:   { d: 'M82.6 339.8 H110.89999999999999 V368.1 H82.6 V339.8 z' }},
      { id: '45', name: { text: '', x: 111, y: 339.8 }, border: { d: 'M111 339.8 H139.3 V368.1 H111 V339.8 z' }, area:   { d: 'M111 339.8 H139.3 V368.1 H111 V339.8 z' }},
      { id: '46', name: { text: '', x: 139.3, y: 339.8 }, border: { d: 'M139.3 339.8 H167.60000000000002 V368.1 H139.3 V339.8 z' }, area:   { d: 'M139.3 339.8 H167.60000000000002 V368.1 H139.3 V339.8 z' }},
      { id: '47', name: { text: '', x: 167.7, y: 339.8 }, border: { d: 'M167.7 339.8 H196 V368.1 H167.7 V339.8 z' }, area:   { d: 'M167.7 339.8 H196 V368.1 H167.7 V339.8 z' }},
      { id: '48', name: { text: '', x: 139.3, y: 396.4 }, border: { d: 'M139.3 396.4 H167.60000000000002 V424.7 H139.3 V396.4 z' }, area:   { d: 'M139.3 396.4 H167.60000000000002 V424.7 H139.3 V396.4 z' }},
      { id: '49', name: { text: '', x: 167.7, y: 396.4 }, border: { d: 'M167.7 396.4 H196 V424.7 H167.7 V396.4 z' }, area:   { d: 'M167.7 396.4 H196 V424.7 H167.7 V396.4 z' }},
      { id: '50', name: { text: '', x: 196, y: 169.4 }, border: { d: 'M196 169.4 H224.8 V424.8 H196 V169.4 z' }, area:   { d: 'M196 169.4 H224.8 V424.8 H196 V169.4 z' }},
      { id: '51', name: { text: '', x: 423.2, y: 169.3 }, border: { d: 'M423.2 169.3 H451.5 V424.70000000000005 H423.2 V169.3 z' }, area:   { d: 'M423.2 169.3 H451.5 V424.70000000000005 H423.2 V169.3 z' }},
      { id: '52', name: { text: '', x: 25.9, y: 141.1 }, border: { d: 'M25.9 141.1 H593.1999999999999 V169.4 H25.9 V141.1 z' }, area:   { d: 'M25.9 141.1 H593.1999999999999 V169.4 H25.9 V141.1 z' }},
      { id: '53', name: { text: '', x: 423.2, y: 169.4 }, border: { d: 'M423.2 169.4 H451.5 V424.8 H423.2 V169.4 z' }, area:   { d: 'M423.2 169.4 H451.5 V424.8 H423.2 V169.4 z' }},
      { id: '54', name: { text: '', x: 224.8, y: 169.4 }, border: { d: 'M224.8 169.4 H366.5 V197.70000000000002 H224.8 V169.4 z' }, area:   { d: 'M224.8 169.4 H366.5 V197.70000000000002 H224.8 V169.4 z' }},
      { id: '55', name: { text: '', x: 111, y: 112.7 }, border: { d: 'M111 112.7 H139.3 V141 H111 V112.7 z' }, area:   { d: 'M111 112.7 H139.3 V141 H111 V112.7 z' }},
      { id: '56', name: { text: '', x: 111, y: 84.3 }, border: { d: 'M111 84.3 H139.3 V112.6 H111 V84.3 z' }, area:   { d: 'M111 84.3 H139.3 V112.6 H111 V84.3 z' }},
      { id: '57', name: { text: '', x: 224.8, y: 197.7 }, border: { d: 'M224.8 197.7 H423.20000000000005 V226.1 H224.8 V197.7 z' }, area:   { d: 'M224.8 197.7 H423.20000000000005 V226.1 H224.8 V197.7 z' }},
      { id: '58', name: { text: '', x: 224.8, y: 226.1 }, border: { d: 'M224.8 226.1 H423.20000000000005 V254.4 H224.8 V226.1 z' }, area:   { d: 'M224.8 226.1 H423.20000000000005 V254.4 H224.8 V226.1 z' }},
      { id: '59', name: { text: '', x: 224.8, y: 254.4 }, border: { d: 'M224.8 254.4 H423.20000000000005 V282.8 H224.8 V254.4 z' }, area:   { d: 'M224.8 254.4 H423.20000000000005 V282.8 H224.8 V254.4 z' }},
      { id: '60', name: { text: '', x: 224.8, y: 282.8 }, border: { d: 'M224.8 282.8 H423.20000000000005 V311.1 H224.8 V282.8 z' }, area:   { d: 'M224.8 282.8 H423.20000000000005 V311.1 H224.8 V282.8 z' }},
      { id: '61', name: { text: '', x: 224.8, y: 311.1 }, border: { d: 'M224.8 311.1 H423.20000000000005 V339.8 H224.8 V311.1 z' }, area:   { d: 'M224.8 311.1 H423.20000000000005 V339.8 H224.8 V311.1 z' }},
      { id: '62', name: { text: '', x: 224.8, y: 339.8 }, border: { d: 'M224.8 339.8 H423.20000000000005 V368.1 H224.8 V339.8 z' }, area:   { d: 'M224.8 339.8 H423.20000000000005 V368.1 H224.8 V339.8 z' }},
      { id: '63', name: { text: '', x: 224.8, y: 368.1 }, border: { d: 'M224.8 368.1 H423.20000000000005 V396.40000000000003 H224.8 V368.1 z' }, area:   { d: 'M224.8 368.1 H423.20000000000005 V396.40000000000003 H224.8 V368.1 z' }},
      { id: '64', name: { text: '', x: 224.8, y: 396.4 }, border: { d: 'M224.8 396.4 H423.20000000000005 V424.79999999999995 H224.8 V396.4 z' }, area:   { d: 'M224.8 396.4 H423.20000000000005 V424.79999999999995 H224.8 V396.4 z' }},

    ],
  };

  @HostBinding('style.background')
  get background(): 'none' | null {
    return this.hideGrid ? 'none' : null;
  }

  constructor(
    public accessChecker: NbAccessChecker,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private themeService: NbThemeService,
    public sigalRService: SignalRService,
    private http: HttpClient,
    private comp2: WindowComponent,
    public apiGetComp: ApiGetService,
    public pipe: DecimalPipe,
    private api: HttpService,
    private messageService: MessageService
    // private comp4: WindowComponent2,
    
    // private comp3: WindowFormComponent
  ) {
    
    this.subscription = this.messageService.onMessage().subscribe(message => {
      if (message.text=="MachineColor") {
        //this.messages.push(message);
        this.ColorCharge();
      } 
    });
    this.selectRoom('0');
  }

  get ordenesMaquina$() { return this._Ordenes$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  // get searchTerm() { return this._state.searchTerm; }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  public ColorCharge(){
    
  this.http.get(this.api.apiUrlMatbox + "/Orders/GetMachineColor")
  .subscribe((res: any)=>{
    this.dataMachineColor=res;
  });

  this.http.get(this.api.apiUrlMatbox + "/Orders/GetWipColor")
  .subscribe((res: any)=>{
    this.dataWipColor=res;
  });
  }

  ngOnInit() {

  
    this.GetOrderProcess();
    
//mostrar colores de maquinas
this.ColorCharge();
    
    //iniciar los paquetes en bandas
    for (var clave in IdWip){
      var idMachine=IdWip[clave];

      this.sigalRService.startConnectionPackageWip(idMachine);
      this.startHttpRequestPackage(idMachine);  
    }

//suscripcion cambio de color
// this.subscription = this.comp2.itemsObservable$.subscribe((items: Array<{ nombre: string }>) => {
//   this.ColorCharge();
//   this.contador = items.length;
// });    



           this.MoverCarro();
    //    this.CrearElemento();
   

    this.hideGrid = this.themeService.currentTheme === 'corporate';

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name === 'corporate'),
        takeUntil(this.destroy$),
      )
      .subscribe((hideGrid: boolean) => this.hideGrid = hideGrid);

      
  }

//   private startHttpRequestMachineColor(){
// this.http.get(this.api.apiUrlMatbox + "/machinecolor")
// .subscribe(res=>{
//   console.log(res);
// });
//   }

  private startHttpRequestPackage(id){    
    this.http.get(this.api.apiUrlMatbox + "/showpackage?idMaquina="+ id)
    .subscribe(res=>{
      // console.log(res);
    });
      }

      private GetOrderProcess(){    
        this.http.get(this.api.apiUrlMatbox + "/Orders/GetOrderProcess")
        .subscribe((res:any)=>{
          this.orderProcess=res;
        });
          }
  // list(): Observable<any> {
  //   return this.http.get('http://127.0.0.1:1880/test');
  // }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
  }
    this.destroy$.next();
    this.destroy$.complete();
    
  }

  private sortRooms() {
    this.sortedRooms = this.roomSvg.rooms.slice(0).sort((a, b) => {
      if (a.id === this.selectedRoom) {
        console.log('a -->', a.id);


        // alert("Area of the rectangle is: "+ a.id);
        return 1;
      }
      if (b.id === this.selectedRoom) {
        // console.log('b -->',b.id);
        return -1;
      }
      // console.log('sortedRooms -->',this.sortedRooms);
      return 0;
    });
  }

  selectRoom(roomNumber) {
    this.select.emit(roomNumber);
    this.selectedRoom = roomNumber;
    this.sortRooms();
  }

  _search(): Observable<SearchResult2> {

    const {pageSize, page, searchTerm} = this._state;


    let ordenes = ORDENES;

    // 2. filter
    ordenes = ordenes.filter(ordenes => matches2(ordenes, searchTerm, this.pipe));
    const total = ordenes.length;

    // 3. paginate
    ordenes = ordenes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    // return of({countries, total});
    return of({ordenes, total});
  }

  getUrlPath(id: string) {
    const baseHref = this.locationStrategy.getBaseHref().replace(/\/$/, '');
    const path = this.location.path().replace(/\/$/, '');

    return `url(${baseHref}${path}${id})`;
  }


  MoverCarro(){
    // this.valorX = this.valorX + 10;
  const contador = interval(1000)
    contador.subscribe((n) =>{
      this.MoverCT();
      this.MoverCT1();
      this.MoverCT2();
      this.MoverTM();
    });
    // const contador2 = interval(1000)
    // contador2.subscribe((n) =>{
    //   this.MoverCT();
    // });
    // const contador3 = interval(1000)
    // contador3.subscribe((n) =>{
    //   this.MoverCT();
    // });
  }

  MoverCT(){
    // this.valorX = this.valorX + 10;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/CT').subscribe((res: any) => {
      // console.log(res);
      this.valorXCT  = res.position;
      });
  }
  MoverCT1(){
    // this.valorX = this.valorX + 10;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/CT1').subscribe((res: any) => {
      // console.log(res);
      this.valorYCT1  = res.position;
      });
  }
  MoverCT2(){
    // this.valorX = this.valorX + 10;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/CT2').subscribe((res: any) => {
      // console.log(res);
      this.valorYCT2  = res.position;
      });
  }

  MoverTM(){
    // this.valorX = this.valorX + 10;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/TM').subscribe((res: any) => {
      // console.log(res);
      this.valorZTM  = res.position;
      });
  }


  ClicST3() {
     var res = this.comp2.openWindowForm(IdWip.ST3);
     
     
  }

  ClicST4() {
    this.comp2.openWindowForm(IdWip.ST4);
 }

 ClicST5() {
  this.comp2.openWindowForm(IdWip.ST5);
}
ClicST6() {
  this.comp2.openWindowForm(IdWip.ST6);
}
ClicST7() {
  this.comp2.openWindowForm(IdWip.ST7);
}

ClicST8() {
  this.comp2.openWindowForm(IdWip.ST8);
}


ClicST9() {
  this.comp2.openWindowForm(IdWip.ST9);
}

ClicST10() {
  this.comp2.openWindowForm(IdWip.ST10);
}

ClicST11() {
  this.comp2.openWindowForm(IdWip.ST11);
}


ClicST12() {
  this.comp2.openWindowForm(IdWip.ST12);
}


ClicST13() {
  this.comp2.openWindowForm(IdWip.ST13);
}


ClicST14() {
  this.comp2.openWindowForm(IdWip.ST14);
}

ClicST15() {
  this.comp2.openWindowForm(IdWip.ST15);
}

ClicID12(){
  this.comp2.openWindowForm(IdWip.ID12)
}

ClicID22(){
  this.comp2.openWindowForm(IdWip.ID22)
}

  ClicMARTIN1228() {    
        this.comp2.openWindowForm(IdMaquinas.Martin1228); 
  }

  ClicWard15000() {
      this.comp2.openWindowForm(IdMaquinas.WARD15000);
  }
  ClicLaminadora() {
    this.comp2.openWindowForm(IdMaquinas.Laminadora);
}

ClicImpresora36() {
  
  this.comp2.openWindowForm(IdMaquinas.Impresora36);
}

ClicJS() {
  this.comp2.openWindowForm(IdMaquinas.JS);
  
}

Clic924() {
  this.comp2.openWindowForm(IdMaquinas.M924);
}


ClicSYS() {
  this.comp2.openWindowForm(IdMaquinas.SYS);
}

  public ClicST2(): void {    
    this.comp2.openWindowForm(IdWip.ST2);
  }

  public ClicST1(): void {
    this.comp2.openWindowForm(IdWip.ST1);
  }

  

EliminarElemento(){
  // console.log(this.paqueteRec.nativeElement);
  // this.paqueteRec.nativeElement.visibility;
  // var elemento = document.getElementById("paquete");
  var elemento = document.getElementById("paqueteRec" + this.contPaqueteST6);

  let objeto = {
  
    visibility:"hidden"
  };
  for (var nombre in objeto) {
    if (objeto.hasOwnProperty(nombre)) {
      elemento.setAttributeNS(null, nombre, objeto[nombre]);
    }
  }
  if(this.contPaqueteST6 >= 1){
  this.contPaqueteST6 = this.contPaqueteST6 -1;
  }

  // console.log(elemento);
  // var eliminar = document.getElementById("shape136-15");
  // eliminar.parentNode.removeChild(eliminar);
  // var rect = document.getElementById("shape136-15");
  // var rect = document.getElementById("paquete");

  // let elemento = document.createElement("rect");
  // var elemento = document.createElementNS(SVG_NS, "rect");
  // let objeto = {
  //   x: this.valorXPquetes,
  //   y: 591.798,
  //   width: 28.0068,
  //   height: 20.2016,
  //   stroke: "white",
  //   fill: "white",
  //   visibility:"hidden",
  //   opacity: 0.5
  // };
  // for (var nombre in objeto) {
  //   if (objeto.hasOwnProperty(nombre)) {
  //     elemento.setAttributeNS(null, nombre, objeto[nombre]);
  //   }
  // }
  // this.valorXPquetes = this.valorXPquetes -30;
  // rect.appendChild(elemento);
}

VisibleElemento(){
  // var elemento = document.getElementById("paquete");
  if(this.contPaqueteST6 < 5){
  this.contPaqueteST6 = this.contPaqueteST6 + 1;
  var color;
  if(this.contPaqueteST6 == 1){
     color = "yellow"
  }
  if(this.contPaqueteST6 == 2){
     color = "blue"
  }
  if(this.contPaqueteST6 == 3){
     color = "red"
  }
  if(this.contPaqueteST6 == 4){
     color = "green"
  }
  if(this.contPaqueteST6 == 5){
    color = "gray"
 }
  var elemento = document.getElementById("paqueteRec" + this.contPaqueteST6);

  let objeto = {
 
    visibility:"visible",
    stroke: color,
    fill: color
    
  };
  for (var nombre in objeto) {
    if (objeto.hasOwnProperty(nombre)) {
      elemento.setAttributeNS(null, nombre, objeto[nombre]);
    }
  }

  // if(this.contPaquete >= 5){
  //   this.contPaquete = 1;
  // }
}

}

DibujarElementoSVGFor() {
  for(let i = 0; i < 5 ; i++){ 
  // var rect = document.getElementById("shape136-15");
  var rect = document.getElementById("paquetes");

  // let elemento = document.createElement("rect");
  var elemento = document.createElementNS(SVG_NS, "rect");
  let objeto = {
    x: this.valorXPquetes,
    y: 591.798,
    width: 28.0068,
    height: 20.2016,
    stroke: "black",
    fill: "black",
    visibility:"visible",
    opacity: 1
  };
  for (var nombre in objeto) {
    if (objeto.hasOwnProperty(nombre)) {
      elemento.setAttributeNS(null, nombre, objeto[nombre]);
    }
  }
  this.valorXPquetes = this.valorXPquetes +30;
  rect.appendChild(elemento);
}
}

 DibujarElementoSVG() {
  // var rect = document.getElementById("elSVG");
  //   // let elemento = document.createElement("rect");
  // var elemento = document.createElementNS(SVG_NS, "rect");
  // let objeto = {
  //   x: this.valorXPquetes,
  //   y: 50,
  //   width: 20,
  //   height: 20,
  //   stroke: "black",
  //   fill: "black"
  // };
  var rect = document.getElementById("shape136-15");
  // var rect = document.getElementById("paquetes");
  // let elemento = document.createElement("rect");
  var elemento = document.createElementNS(SVG_NS, "rect");
  let objeto = {
    x: this.valorXPquetes,
    y: 591.798,
    width: 28.0068,
    height: 20.2016,
    stroke: "black",
    fill: "black"
  };
  for (var nombre in objeto) {
    if (objeto.hasOwnProperty(nombre)) {
      elemento.setAttributeNS(null, nombre, objeto[nombre]);
    }
  }
  this.valorXPquetes = this.valorXPquetes +30;
  rect.appendChild(elemento);
}



  Refresh() {
    // this.apiGetComp.Suma();


    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerOrders').subscribe((res: any) => {
      // console.log(res);
      // this.ordenesMaquina = res;
      // console.log(this.ordenesMaquina);
      // console.error(res);

      // console.log(res[0].VarName);
      // console.log(res[0].Valor);
      // console.log(res[0].Fecha);
      this.comp2.openWindow(this.contentTemplate, 'Popup ApiGet', res[0].order, res[0].idSource, res[0].name, res[0].idTarget );

    });

  }

 

}
