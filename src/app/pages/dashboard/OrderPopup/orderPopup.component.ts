import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import {ApiGetService} from './apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { MessageService } from '../services/MessageService';
interface Ordenes {
  id?: number;
  order: string;
  name?: string;
  description?: string;
  reference?: string;
  orderLength?: number;
  state: string;
  stateId: number;
}

interface Status {
  id:number,
  name:string,
}

interface StatusPackage {
  idPackage:number,
  idStatus:string,
}


let ORDEN: Ordenes;
{

}

let STATUS: Status;

let STATUSPACKAGE: StatusPackage;
{

}


@Component({
  providers: [ApiGetService],
  selector: 'ngx-windowOrderPopu',
  templateUrl: './orderPopup.component.html',
  styleUrls: ['orderPopup.component.scss'],
})
export class WindowComponent2 {

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('contentTemplate2', { static: true }) contentTemplate2: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(
    private windowService: NbWindowService,
    private apiGetComp: ApiGetService,
    private api: HttpService,
    private messageService: MessageService,
    ) {


    }

    data = ORDEN;
    status= STATUS;




  openWindowForm(nombreWindow: string, orden:Ordenes) {
    ORDEN = orden;
    this.data = orden;
    
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetStatus?Type=Package').subscribe((res: any) => {
      STATUS=res;
      this.status=STATUS;
      this.windowService.open(WindowComponent2, { title: nombreWindow});
    });
    

  }

  ChangeState(id:number, event){
STATUSPACKAGE = {
  idPackage:id,
  idStatus:event,
}
    this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/PostUpdatePackageState',STATUSPACKAGE).subscribe((res: any) => {
      
        this.messageService.sendMessage('PackageUpdate');
      
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

  Refrescar() {

  }

  Refresh(orden: string, nombre: string) {
    // console.log(this._Ordenes$);
    // console.log(this.ordenesMaquina$)
    // console.log(this.ordenesFiltro);
    console.log(orden + ', ' + nombre);
  }

  ngOnDestroy() {
   
    }

}
