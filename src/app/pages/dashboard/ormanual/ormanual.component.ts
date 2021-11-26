import { State } from './../_interfaces/MatBox.model';
import { Component, TemplateRef, ViewChild, OnInit, Input, ElementRef } from '@angular/core';
import { NbWindowService,NbToastrService,NbWindowRef } from '@nebular/theme';
import {ApiGetService} from './../OrderPopup/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { MessageService } from '../services/MessageService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderTableComponent } from '../../tables/OrderTable/orderTable.component';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ButtonPropsModel, Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { takeWhile } from 'rxjs/operators';
import { NumberMapper } from '@syncfusion/ej2-base/src/intl/parser-base';
import { EmitType } from '@syncfusion/ej2-base';

interface Ordenes {
  id: number;
  order: string;
  name?: string;
  description?: string;
  reference?: string;
  cutLength?: number;
  cutsCount?:number;
  state: string;
  stateId: number;
  idDevice:number;
  express:boolean;
  idOrder:number;
}

interface ordens{
  quantity: number;
  express:boolean;
}

interface Status {
  id:number,
  name:string,
}

interface ordersSta {
  id:number,
  Order:string,
}

interface StatusPackage {
  id:number,
  idStatus:number,
  cutLength:number,
  cutCount:number,
  Order:string,
  idDevice:number,
  quantity: number,
  express: boolean,
}


let ORDEN: Ordenes=
{
id:-1,
order:'',
state:'',
stateId:1,
cutLength:0,
cutsCount:0,
idDevice:0,
express:false,
idOrder: 0
};

let STATUS: Status;
let ORDESTA: ordersSta;

let ORDERLIST: Ordenes[];

let STATUSPACKAGE: StatusPackage;
{

}

@Component({
  providers: [ApiGetService],
  selector: 'ngx-ormanual',
  templateUrl: './ormanual.component.html',
  styleUrls: ['./ormanual.component.scss']
})
export class OrmanualComponent implements OnInit {

  arrumeManualForm: FormGroup;

  mostrar = false

  public showCloseIcon: Boolean = true;

  private alive = true;

  ocultar: Boolean;

  quantitys = 0

  public idor: number;

  public header: string;

  public ordeDa: ordersSta[];

  get orderForm() { return this.arrumeManualForm.get('orderForm'); }

  get statusForm() { return this.arrumeManualForm.get('statusForm'); }
  
  get cutLength() { return this.arrumeManualForm.get('cutLength'); }

  get cutCount() { return this.arrumeManualForm.get('cutCount'); }

  get quantity() { return this.arrumeManualForm.get('quantity'); }
  
  get express() { return this.arrumeManualForm.get('express'); }

  @ViewChild('ejDialogTX') ejDialogTX: DialogComponent;
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef

  constructor(
    private windowService: NbWindowService,
    private apiGetComp: ApiGetService,
    private api: HttpService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
  ) { this.mostrar = true; 
    this.initForm();
    this.loadDataForm();
  }

  public targetElement: HTMLElement;
    public visible: Boolean = true;
    public hidden: Boolean = false;
    public position: object={ X: 'left', Y: 'top' };
    public initialPage: Object;

  ngOnInit(): void {
    this.initForm();
      this.loadDataForm();
  }

  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
      }
      // Hide the Dialog when click the footer button.
      public hideDialog: EmitType<object> = () => {
        // this.ejDialog.hide();
        // this.ejDialog1.hide();
        // this.ejDialog2.hide();
      }
      // Enables the footer buttons
      public buttons: Object = [
     
      ];
      public dlgBtnClick = (): void => {
        this.ejDialogTX.hide();  
        this.alive = false;
      }

      public dlgButtons: ButtonPropsModel[] = [{ 
        click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Aceptar', isPrimary: true } }, 
        { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }
        
      ];

      public isModal: boolean = true;

  public fields: Object = { text: 'order', value: 'id' };

  public states: Object = { text: 'name', value: 'id' };

  loadDataForm(){
    // debugger
     if (ORDEN.order == "") {
      // console.log('cambios');
      this.mostrar = false;
      this.ocultar = false;
     } else {
      //    

      this.mostrar = true;
     
      this.arrumeManualForm.setValue({
        id: ORDEN.id,
        orderForm: ORDEN.idOrder,
        cutLengthForm: ORDEN.cutLength,
        cutCountForm: ORDEN.cutsCount,
        // cutForm: ORDEN.cutsCount,
        statusForm: ORDEN.stateId,
        quantityForm: 1,
        expressForm:ORDEN.express,
    });
    // console.log('edit', this.arrumeManualForm);
    
    }
    
  }

  initForm() {
    this.arrumeManualForm = this.fb.group({
      id: this.fb.control(-1),
      orderForm: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
      statusForm: this.fb.control(1, [Validators.minLength(3), Validators.maxLength(20)]),
      cutLengthForm: this.fb.control(0, [Validators.minLength(3), Validators.maxLength(20)]),
      cutCountForm: this.fb.control(0, [Validators.minLength(3), Validators.maxLength(20)]),
      quantityForm: this.fb.control(1, [Validators.minLength(3), Validators.maxLength(20)]),
      expressForm: this.fb.control(false),
    });
  }

  data = ORDEN;
  status= STATUS;
  orderList= ORDERLIST;
  or=ORDESTA

  openWindowForm(nombreWindow: string, orden:Ordenes, idMaquina:number) {
    debugger
    if(orden.id){
      ORDEN = orden;
      this.data = orden;
      // console.log('data orden', this.data);
      
      if (ORDEN.order == "") {
        console.log('cambios');
        this.mostrar = false;
        this.ocultar = false;
       } else {
        //    
  
        this.mostrar = true;
       
        this.arrumeManualForm.setValue({
          id: ORDEN.id,
          orderForm: ORDEN.idOrder,
          cutLengthForm: ORDEN.cutLength,
          cutCountForm: ORDEN.cutsCount,
          // cutForm: ORDEN.cutsCount,
          statusForm: ORDEN.stateId,
          quantityForm: 1,
          expressForm:ORDEN.express,
      });
      // console.log('edit', this.arrumeManualForm);
      this.ejDialogTX.show();
      }

    }else{
      ORDEN ={
        id:-1,
        order:'',
        state:'',
        stateId:1,
        cutLength:0,     
        cutsCount:0,
        express:false,
        idDevice:idMaquina,
        idOrder:0
        
      };
      this.ejDialog.show();
      if (ORDEN.order == "") {
        console.log('cambios');
        this.mostrar = false;
        this.ocultar = false;
        
       }

    }
   
   
    //   const myOrden = this.data.order.split('-', 1);

    //   this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/ObtenerOrderId?orden=' + myOrden ).subscribe((resId: any) => {
    //   ORDESTA = resId[0];
    //   this.or = ORDESTA;
    //   console.log('data id', this.or.id);
    // });


    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetStatus?Type=Package').subscribe((res: any) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerOrders').subscribe((resOrder: any) => {
        
      
        ORDERLIST=resOrder;
        this.orderList=ORDERLIST;

        STATUS=res;
        this.status=STATUS;
        // win=this.windowService.open(WindowComponent2, { title: nombreWindow});
        
      });
    });
  }



Guardar(){
  let formulario = this.arrumeManualForm.value;
// debugger

  // const myOrd = formulario.orderForm.split('-', 1);

  if(formulario.orderForm){
  
    STATUSPACKAGE = {
      id:formulario.id,
      idStatus:formulario.statusForm,
      cutLength:formulario.cutLengthForm,
      // Order:String(myOrd),
      Order:String(formulario.orderForm),
      idDevice:ORDEN.idDevice, 
      cutCount:formulario.cutCountForm,
      quantity: formulario.quantityForm,
      express: formulario.expressForm
    } 
  }

  
  

  if (formulario.cutLengthForm == 0 && formulario.cutCountForm == 0 && formulario.quantityForm == 0) {
    // alert('No ingresaste Longitud ni cantidad')
    Swal.fire({
      icon: 'error',
      timer: 2000,
      title: 'Oops...',
      text: 'Ingresa la Longitud de corte y cantidad cortes!'
    })
  } else if (formulario.cutLengthForm == 0) {
    // alert('No ingresaste Longitud ')
    Swal.fire({
      icon: 'error',
      timer: 2000,
      title: 'Oops...',
      text: 'Ingresaste la Longitud de corte!'
    })
  } else if (formulario.cutCountForm == 0) {
    // alert('No ingresaste cantidad')
    Swal.fire({
      icon: 'error',
      timer: 2000,
      title: 'Oops...',
      text: 'Ingresaste la cantidad cortes!'
    })
  } 
  // else if (formulario.quantityForm == null) {
  //   // alert('No ingresaste cantidad')
  //   Swal.fire({
  //     icon: 'error',
  //     timer: 2000,
  //     title: 'Oops...',
  //     text: 'Ingresaste la cantidad arrumes!'
  //   })
  // }  else if (formulario.quantityForm == '') {
  //   // alert('No ingresaste cantidad')
  //   Swal.fire({
  //     icon: 'error',
  //     timer: 2000,
  //     title: 'Oops...',
  //     text: 'Ingresaste la cantidad arrumes!'
  //   })
  // }
  // else if (formulario.quantityForm == 0) {
  //   // alert('No ingresaste cantidad')
  //   Swal.fire({
  //     icon: 'error',
  //     timer: 2000,
  //     title: 'Oops...',
  //     text: 'Ingresaste la cantidad arrumes!'
  //   })
  // }
   else {

  if (STATUSPACKAGE.idStatus === 1 || STATUSPACKAGE.idStatus === 2 || STATUSPACKAGE.idStatus === 3){
    // this.ChangeState();
    // console.log('Data OrderManual', STATUSPACKAGE);
    
    this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/postusppackagemanualcontrol',STATUSPACKAGE).subscribe((res: any) => {
          
                 this.messageService.sendMessage('PackageUpdate');
                   this.handleSuccessResponse();
                   
               });
  }else if("eliminar estado"){
    Swal.fire({
      title: 'Estas seguro?',
      text: `¡No podrás revertir esto!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then(result => {
      if (result.value) {
        if (STATUSPACKAGE.idStatus === 4 ) {
            // console.log('borrar');
            this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/postusppackagemanualcontrol',STATUSPACKAGE).subscribe((res: any) => {
              
            }); 
            this.messageService.sendMessage('PackageUpdate');
            Swal.fire('¡Eliminado!', 'El arrume ha sido eliminada.', 'success');
            // this.ChangeState();
            
            this.back();
          } else {
            Swal.fire('¡Error!', 'Hubo un error al eliminar el arrume', 'error');
            this.back();
          }
      }
    });
  }
}
}

// ChangeState(){

//   let formulario = this.arrumeManualForm.value;

//   if(formulario.orderForm){
  
//     STATUSPACKAGE = {
//       id:formulario.id,
//       idStatus:formulario.statusForm,
//       cutLength:formulario.cutLengthForm,
//       Order:formulario.orderForm,
//       idDevice:ORDEN.idDevice,
//     }
    
//         this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/postusppackagemanualcontrol',STATUSPACKAGE).subscribe((res: any) => {
          
//           this.messageService.sendMessage('PackageUpdate');
//             this.handleSuccessResponse();
            
//         });
//   }else{
//     this.handleWrongResponse();
//   }

// }


handleSuccessResponse() {
  let formulario = this.arrumeManualForm.value;
  this.toasterService.success('Orden ' + formulario.orderForm + ' actualizada con exito' );
  // this.toasterService.success('Orden ' + ORDEN.order + ' actualizada con exito' );
  this.back();
}

handleWrongResponse() {
  this.toasterService.danger('', 'Error almacenando arrume');
}


back() {
  // win.close();
  this.ejDialogTX.hide();
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

ngOnDestroy(): void {
  this.alive = false;
}


}
