import { Component, ElementRef, Input, PipeTransform, TemplateRef, ViewChild } from '@angular/core';
import { NbComponentStatus, NbSelectComponent, NbWindowConfig, NbWindowRef, NbWindowService,NbToastrService, NbWindowModule } from '@nebular/theme';
import { title } from 'process';
import { threadId } from 'worker_threads';
import {ApiWindowCreateOrderPopup} from './apiWindowCreateOrderPopup.services'
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, map, startWith, switchMap, tap } from 'rxjs/operators';
import { HttpHandler } from '@angular/common/http';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import {ApiGetService} from '../../../@auth/components/register/apiGet.services';

// import { ApiGetService } from '../OrderTable/apiGet.services';
// import {HttpClient} from '@angular/common/http'
// import { WindowFormComponent } from '../..window-form/window-form.component';
// import { WindowFormComponent } from '../../modal-overlays/window/window-form/window-form.component';

interface Ordenes {
  id?: number;
  order: string;
  name: string;
  description: string;
  reference: string;
  orderLength: number;
  cutsNumber: number;
  cutsWidth: number;
  cutsLength: number;
  origen:string;
}

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


interface MaquinasDestino {
  id?: number;
  value: string;
  label: string;
}

interface MaquinasOrigen {
  id?: number;
  value: string;
  label: string;
}


let DESTINOS: MaquinasDestino[]= [
 

]; 

let ORIGENES: MaquinasOrigen[]= [
 

]; 

let ORDENESACTUALIZAR: OrdenActualizar
{

};

let ORDENCREAR: OrdenCrear 
{

};

let DESTINO: MaquinasDestino 
{

};

let ORIGEN: MaquinasOrigen 
{

};

let ORDEN: Ordenes 
{

};

let win:NbWindowRef

@Component({
  providers:[ApiWindowCreateOrderPopup],
  selector: 'ngx-windowCreateOrderPopup',
  templateUrl: './windowsCreateOrderPopup.component.html',
  styleUrls: ['windowsCreateOrderPopup.component.scss'],
})
export class WindowCreateComponent {


  origenSelect
  dataPost: OrdenActualizar;
  statuses: NbComponentStatus[] = ['basic'];

  options = [
    { value: 'STAKER#1', label: 'STAKER#1' },
    { value: 'STAKER#2', label: 'STAKER#2' },
    // { value: 'This is value 3', label: 'Option 3' },
    // { value: 'This is value 4', label: 'Option 4' },
  ];
  option;

  options2 = [
    { value: 'Martin 1228', label: 'Martin 1228' },
    { value: 'JS', label: 'JS' },
    { value: '924', label: '924' },
    { value: 'S&S', label: 'S&S' },
  ];
  option2;

  destino = DESTINOS;
  maquinaDestino = DESTINO;
  origen = ORIGENES;
  maquinaOrigen = ORIGEN;

public selectedDestino ;
public selectedOrigen ;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('contentTemplate2', { static: true }) contentTemplate2: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  @ViewChild('ordenValor') ordenValor:ElementRef;
  @ViewChild('referenciaValor') referenciaValor:ElementRef;
  @ViewChild('batchValor') batchValor:ElementRef;
  @ViewChild('longitudValor') longitudValor:ElementRef;
  @ViewChild('cortesValor') cortesValor:ElementRef;
  @ViewChild('anchoValor') anchoValor:ElementRef;
  @ViewChild('largoValor') largoValor:ElementRef;
  @ViewChild('sheetsNumberValor') sheetsNumberValor:ElementRef;
  @ViewChild('stackHeightValor') stackHeightValor:ElementRef;
  @ViewChild('sheetsThicknessValor') sheetsThicknessValor:ElementRef;
  @ViewChild('productsMissingValor') productsMissingValor:ElementRef;
  @ViewChild('sheetScrapValor') sheetScrapValor:ElementRef;



  // @ViewChild('desplegableValor') desplegableValor:NbSelectComponent;


  constructor(
    private router: Router,
    private windowService: NbWindowService,
    private apiGetComp: ApiGetService,
    private api: HttpService,
    private toasterService: NbToastrService,
    ){   
      this.MaquinasDestinoLista();
      this.MaquinasOrigenLista();
    }

    data = ORDEN;
    dataOption2
    toggleNgModel = true;


openWindowForm(nombreWindow:string, texto:string) {   
    DESTINO =
    {
      value : 'ID-11 Salida Corrugador',
      label : 'ID-11 Salida Corrugador'
    }

    ORIGEN = 
    {
      value : 'Martin 1228',
      label : 'Martin 1228'
    }
    win=this.windowService.open(WindowCreateComponent, { title: nombreWindow});  
  
  }

  MaquinasDestinoLista(){
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerMaquinasDestinoLista').subscribe((res:any)=>{
      DESTINOS = res; 
      });
  }

  MaquinasOrigenLista(){
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerMaquinasOrigenLista').subscribe((res:any)=>{
      ORIGENES = res; 
      // console.log(ORIGENES);
      });
  }


openWindow(contentTemplate, titleValue:string, textValue:string, numberValue: number, nameValue: string, value:number) {

    this.windowService.open(
      contentTemplate,
      {
        title: titleValue,
        context: {
          text: textValue,
          number: numberValue,
          name: nameValue,
          x: value,
        },
      },
    );
  }

  openWindow2(contentTemplate2, titleValue:string, orderValue:string, nameValue: string, descripcionValue: string, referenciaValue:string, orderLengthValue:number) {
    this.windowService.open(
      contentTemplate2,
      {
        title: titleValue,
        context: {
          orden: orderValue,
          nombre: nameValue,
          descripcion: descripcionValue,
          referencia: referenciaValue,
          orderLength: orderLengthValue,
          
        },
      },
    );
  }
  

  Refresh(orden:string, nombre:string){
    // console.log(this._Ordenes$);
    // console.log(this.ordenesMaquina$)
    // console.log(this.ordenesFiltro);
    console.log(orden + ", " + nombre);
  }

  handleSuccessResponse() {
    this.toasterService.success('Orden ' + this.ordenValor.nativeElement.value + ' creada con exito' );
    this.back();
  }
  handleWrongResponse() {
    this.toasterService.danger('', 'Error almacenando ordenes');
  }

  back() {
    win.close();
    this.router.navigate(['/pages/tables/OrderTable']);
  }

  Crear(){
    // console.log(this.ordenValor.nativeElement.value);
    // console.log(this.referenciaValor.nativeElement.value);
    // console.log(this.batchValor.nativeElement.value);
    // console.log(this.longitudValor.nativeElement.value);
    // console.log(this.cortesValor.nativeElement.value);
    // console.log(this.anchoValor.nativeElement.value);
    // console.log(this.largoValor.nativeElement.value);
    // console.log(this.sheetsNumberValor.nativeElement.value);
    // console.log(this.maquinaOrigen.value);
    // console.log(this.maquinaDestino.value);
    // console.log(this.stackHeightValor.nativeElement.value);
    // console.log(this.sheetsThicknessValor.nativeElement.value);
    // console.log(this.productsMissingValor.nativeElement.value);
    // console.log(this.toggleNgModel);
    // console.log(this.sheetScrapValor.nativeElement.value);
    
    ORDENCREAR =
    {
      orden : this.ordenValor.nativeElement.value,
      referencia: this.referenciaValor.nativeElement.value,
      batch:  Number(this.batchValor.nativeElement.value),
      longitudOrden:  Number(this.longitudValor.nativeElement.value),
      cortesNumero:  Number(this.cortesValor.nativeElement.value),
      cortesAncho:  Number(this.anchoValor.nativeElement.value),
      cortesLargo:  Number(this.largoValor.nativeElement.value),
      sheetsNumbers:  Number(this.sheetsNumberValor.nativeElement.value),
      stackHeight:  Number(this.stackHeightValor.nativeElement.value),
      sheetThickness:  Number(this.sheetsThicknessValor.nativeElement.value),
      origen: this.maquinaOrigen.value,
      destino: this.maquinaDestino.value,
      productMissing:  Number(this.productsMissingValor.nativeElement.value),
      signalStart: this.toggleNgModel,
      sheetScrap: this.sheetScrapValor.nativeElement.value
    }
    if (ORDENCREAR.orden =="" && ORDENCREAR.referencia == "" && ORDENCREAR.origen && ORDENCREAR.destino){
      this.handleWrongResponse();
    }else{
      this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/CrearOrden', ORDENCREAR).subscribe((res:any)=>{
        this.handleSuccessResponse();
      });
    }
    

  }
 
}