import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { NbComponentStatus, NbWindowService } from '@nebular/theme';
import {ApiWindowOrderPopup} from './apiWindowiOrderPopup.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';

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
  origen: string;
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


let DESTINOS: MaquinasDestino[] = [


];

let ORIGENES: MaquinasOrigen[] = [


];

let ORDENESACTUALIZAR: OrdenActualizar;
{

}

let DESTINO: MaquinasDestino;
{

}

let ORIGEN: MaquinasOrigen;
{

}

let ORDEN: Ordenes;
{

}


@Component({
  providers: [ApiWindowOrderPopup],
  selector: 'ngx-windowOrderPopup',
  templateUrl: './windowsOrderPopup.component.html',
  styleUrls: ['windowsOrderPopup.component.scss'],
})
export class WindowComponent {


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
  @ViewChild('ordenValor') ordenValor: ElementRef;
  @ViewChild('longitudValor') longitudValor: ElementRef;
  @ViewChild('cortesValor') cortesValor: ElementRef;
  @ViewChild('anchoValor') anchoValor: ElementRef;
  @ViewChild('largoValor') largoValor: ElementRef;
  @ViewChild('referenciaValor') referenciaValor: ElementRef;



  // @ViewChild('desplegableValor') desplegableValor:NbSelectComponent;


  constructor(
    private windowService: NbWindowService,
    private apiGetComp: ApiWindowOrderPopup,
    private api: HttpService,
    // public desplegable: NbSelectComponent,
    // public pipe : DecimalPipe
    // private windowTitle:NbWindowConfig,
    // private nombre2: titl,
    ) {
      this.MaquinasDestinoLista();
      this.MaquinasOrigenLista();
    }

    data = ORDEN;
    dataOption2;


  openWindowForm(nombreWindow: string, texto: string, orden: Ordenes) {
    // this.MaquinasDestinoLista();
    ORDEN = orden;
    this.data = orden;
    DESTINO = {
      value : orden.description,
      label : orden.description,
    };

    ORIGEN = {
      value : orden.origen,
      label : orden.origen,
    };
    this.windowService.open(WindowComponent, { title: nombreWindow});

  }

  MaquinasDestinoLista() {

    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerMaquinasDestinoLista').subscribe((res: any) => {
      DESTINOS = res;
      });
  }

  MaquinasOrigenLista() {

    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerMaquinasOrigenLista').subscribe((res: any) => {
      ORIGENES = res;
      // console.log(ORIGENES);
      });
  }


openWindow(contentTemplate, titleValue: string, textValue: string, numberValue: number, nameValue: string, value: number) {

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

  openWindow2(contentTemplate2, titleValue: string, orderValue: string, nameValue: string, descripcionValue: string, referenciaValue: string, orderLengthValue: number) {
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


  Refresh(orden: string, nombre: string) {
    // console.log(this._Ordenes$);
    // console.log(this.ordenesMaquina$)
    // console.log(this.ordenesFiltro);
    console.log(orden + ', ' + nombre);
  }

  Edit() {

    ORDENESACTUALIZAR = {
      orden: this.data.order,
      referencia: this.referenciaValor.nativeElement.value,
      origen: this.maquinaOrigen.value,
      destino: this.maquinaDestino.value,
      longitud: Number(this.longitudValor.nativeElement.value),
      cortes: Number(this.cortesValor.nativeElement.value),
      cortesAncho: Number(this.anchoValor.nativeElement.value),
      cortesLargo: Number(this.largoValor.nativeElement.value),
    };

    this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/ActualizarOrden', ORDENESACTUALIZAR).subscribe(res => res);
  }

  ChangeLocation($event) {
    const selectedValue = this.options2.find(location => location.value === $event.value );
    console.log(selectedValue);
}

}
