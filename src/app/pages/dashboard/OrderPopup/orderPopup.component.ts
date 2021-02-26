import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { NbWindowService,NbToastrService,NbWindowRef } from '@nebular/theme';
import {ApiGetService} from './apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { MessageService } from '../services/MessageService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderTableComponent } from '../../tables/OrderTable/orderTable.component';

interface Ordenes {
  id: number;
  order: string;
  name?: string;
  description?: string;
  reference?: string;
  cutLength?: number;
  state: string;
  stateId: number;
  idDevice:number,
}

interface Status {
  id:number,
  name:string,
}

interface StatusPackage {
  id:number,
  idStatus:number,
  cutLength:number,
  Order:string,
  idDevice:number,
}


let ORDEN: Ordenes=
{
id:-1,
order:'',
state:'',
stateId:1,
cutLength:0,
idDevice:0,
};

let STATUS: Status;

let ORDERLIST: Ordenes[];

let STATUSPACKAGE: StatusPackage;
{

}

let win:NbWindowRef;
@Component({
  providers: [ApiGetService],
  selector: 'ngx-windowOrderPopu',
  templateUrl: './orderPopup.component.html',
  styleUrls: ['orderPopup.component.scss'],
})
export class WindowComponent2  implements OnInit {
  arrumeManualForm: FormGroup;

  get orderForm() { return this.arrumeManualForm.get('orderForm'); }

  get statusForm() { return this.arrumeManualForm.get('statusForm'); }

  get cutLength() { return this.arrumeManualForm.get('cutLength'); }

  // @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  // @ViewChild('contentTemplate2', { static: true }) contentTemplate2: TemplateRef<any>;
  // @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(
    private windowService: NbWindowService,
    private apiGetComp: ApiGetService,
    private api: HttpService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private toasterService: NbToastrService,

    ) {
       
      

    }

    ngOnInit() {
      this.initForm();
      this.loadDataForm();
    }

    loadDataForm(){
      this.arrumeManualForm.setValue({
        id: ORDEN.id,
        orderForm: ORDEN.order,
        cutLengthForm: ORDEN.cutLength,
        statusForm: ORDEN.stateId,
    });
    }

    initForm() {
      this.arrumeManualForm = this.fb.group({
        id: this.fb.control(-1),
        orderForm: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
        statusForm: this.fb.control(1, [Validators.minLength(3), Validators.maxLength(20)]),
        cutLengthForm: this.fb.control(0, [Validators.minLength(3), Validators.maxLength(20)]),
      });
    }

    data = ORDEN;
    status= STATUS;
    orderList= ORDERLIST;

  openWindowForm(nombreWindow: string, orden:Ordenes, idMaquina:number) {
    if(orden.id){
      ORDEN = orden;
      this.data = orden;
    }else{
      ORDEN ={
        id:-1,
        order:'',
        state:'',
        stateId:1,
        cutLength:0,
        idDevice:idMaquina,
      };

    }
   
    
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetStatus?Type=Package').subscribe((res: any) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerOrders').subscribe((resOrder: any) => {
        ORDERLIST=resOrder;
        this.orderList=ORDERLIST;
        STATUS=res;
        this.status=STATUS;
        win=this.windowService.open(WindowComponent2, { title: nombreWindow});
       
      });
    });
  }

  ChangeState(){

    let formulario = this.arrumeManualForm.value;

    if(formulario.orderForm){
    
      STATUSPACKAGE = {
        id:formulario.id,
        idStatus:formulario.statusForm,
        cutLength:formulario.cutLengthForm,
        Order:formulario.orderForm,
        idDevice:ORDEN.idDevice,
      }
          this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/postusppackagemanualcontrol',STATUSPACKAGE).subscribe((res: any) => {
            
              this.messageService.sendMessage('PackageUpdate');
              this.handleSuccessResponse();
          });
    }else{
      this.handleWrongResponse();
    }

  }

  
  handleSuccessResponse() {
    let formulario = this.arrumeManualForm.value;
    this.toasterService.success('Orden ' + formulario.orderForm + ' actualizada con exito' );
    this.back();
  }

  handleWrongResponse() {
    this.toasterService.danger('', 'Error almacenando arrume');
  }


  back() {
    win.close();
    //this.router.navigate(['/pages/tables/OrderTable']);
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
