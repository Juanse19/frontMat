import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Injectable, TemplateRef, Input } from '@angular/core';
import { NbAccessChecker } from '@nebular/security'
import { BehaviorSubject, interval, Observable, of, Subject,Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { MessageService } from '../services/MessageService';
import { UserStore } from '../../../@core/stores/user.store';
import { ApiGetService } from '../WindowPopupComponent/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { NbToastrService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

// Models
interface Propiedades {
  id?: number; 
  name: string; 
  description: string; 
  isOn: boolean;
  type: string;
  valor: string;
  prioridad: number;
  width: number;
  lenght: number;
}

interface PropiedadesActualizar {
  id: number;
  descripcionMaquina: string;
  type: string;
  valor: string;
  isOn: boolean;
  prioridad?: number;
}

interface Pedidos {
  OfficeIDCTI: number,
  Pedido: number,
  Destino: string,
  IdTarget: number,
  EspesorLamina_Planeado: number,
  OrdenProgramacion: number,
  Estado: string,
  EstadoMaquina: null,
  LargoLamina_Planeado: number,
  AnchoLamina_Planeado: number,
  FechaRegistro: string,
  Tarjeta: string,
  CorrInvertida: boolean,
  IdOrderSic: number,
  ListaCorteSIC: number
}

interface Data {
  id?: number;
  text: string;
  number: number;
  name: string;
  x: number;
}

interface DeviceType {
  id?: number;
  value: string;
  label: string;
}

interface ColorLista {
  id?: number;
  value: string;
  label: string;
}

interface Wip{
  id?: number;
  name: string;
  description: string;
  isOn: boolean;
  selected: boolean
}

interface WipTarget{
  idTarget: number;
  idWip: number
}

let DATA: Data;
    {
      // text: 'JAC',
      // number: 233423,
      // name: 'Julian Arango',
      // x: 5
    }
  
  
  let DEVICETYPE: DeviceType;
  {
  
  }
  
  let DEVICESTYPE: DeviceType[] = [
  
  
  ];
  
  
  let IDMAQUINA: number;
  
  let WIPLIST: Wip[]=[
  
  
  ];
  
  let WIPFREE: Wip[]=[
  
  
  ];
  
  let WIPTARGET: WipTarget;
  {
  
  };
  
  let COLORLISTA: ColorLista[] = [
  
  
  ];
  
  let COLOR: ColorLista;
  {
  
  }

let PediProgramados: Pedidos;
  
  let PROPIEDADESACTUALIZAR: PropiedadesActualizar;
  {
  
  }

  let PROPIEDADES: Propiedades;
  {
  
  }

@Component({
  selector: 'ngx-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  private alive = true;

  public select = false;

  mostrar: Boolean;

  idMaquina=IDMAQUINA;

  pedidosData = PediProgramados

  propiedades = PROPIEDADES;

  nombreEstado: string;
  toggleNgModel = true;
  public selec = false;
  public ocultar = false;
  public ocultarPedido = false;
  

  devicesType = DEVICESTYPE;
  deviceType = DEVICETYPE;

  colorLista = COLORLISTA;
  color = COLOR;

  wipLista = WIPLIST; 
  wipFree= WIPFREE;

  ordenesFiltro;
  data = DATA;

  public header: string;

  @ViewChild('nameMachine') nameMachineValor: ElementRef;

  constructor(
    public accessChecker: NbAccessChecker,
    private apiGetComp: ApiGetService,
    private toasterService: NbToastrService,
    private messageService: MessageService,
    private userStore: UserStore,
    private http: HttpClient,
    private api: HttpService,
  ) { }

  ngOnInit(): void {
    this.ObtenerListaDeviceType();
      this.ObtenerListaColor();
  }

  public tabSelected(e: SelectEventArgs): void {
        
  }

  openPro(idMaquina: number){

    this.idMaquina=idMaquina;
    IDMAQUINA=idMaquina;

    this.alive = true;

    //Propiedad
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/PedidosProgramados?IdMaquina='+ idMaquina)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if (res[0] == undefined) {
        // console.log('no hay data');
      } else {
      PediProgramados = res;
      this.pedidosData=PediProgramados;
      console.log('pedidosData', this.pedidosData);
      }
    });

    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipFree?idTarget='+ idMaquina)
  .pipe(takeWhile(() => this.alive))
  .subscribe((res: any) => {
    WIPFREE = res;
    this.wipFree=WIPFREE;
    console.log('wipFree', this.wipFree);
  });

  this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerPropiedadesMaquina?idMaquina='+ idMaquina)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      PROPIEDADES = res;
      this.propiedades = PROPIEDADES;
      console.log('Propiedades', this.propiedades);
      if (this.propiedades.isOn == true) {
        this.nombreEstado = 'Habilitado';
      } else {
        this.nombreEstado = 'Deshabilitado';
      }
      
      DATA =  {
        text: this.propiedades.description,
        number: 233423,
        name: this.nombreEstado,
        x: 5,
      };
      // this.data = DATA
      // console.log('test', this.data = DATA);
      // console.log('data', this.data.text);
      // console.log('data', this.data.name);
      this.header = this.propiedades.description;
      
    });

    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipForTarget?idTarget='+ idMaquina)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        WIPLIST=res;
        this.wipLista=WIPLIST;
        // console.log('wipLista', this.wipLista);
        
         
         
      });

  }

  DataLoadBasic(idMaquina: number){ 
    this.idMaquina=idMaquina;
    IDMAQUINA=idMaquina;
            
     

    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipFree?idTarget='+ idMaquina).subscribe((res: any) => {
      WIPFREE = res;
      this.wipFree=WIPFREE;
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerPropiedadesMaquina?idMaquina='+ idMaquina).subscribe((res: any) => {
        PROPIEDADES = res;
        this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipForTarget?idTarget='+ idMaquina).subscribe((res: any) => {
          WIPLIST=res;
          this.wipLista=WIPLIST;
          
            
            this.propiedades = PROPIEDADES;
            if (this.propiedades.isOn == true) {
              this.nombreEstado = 'Habilitado';
            } else {
              this.nombreEstado = 'Deshabilitado';
            }
            
            DATA =  {
              text: this.propiedades.description,
              number: 233423,
              name: this.nombreEstado,
              x: 5,
            };
            this.data = DATA
            // console.log('test1', this.data = DATA);
            // console.log('data1', this.data.text);
            // console.log('data1', this.data.name);
            
          });
        });    
       
      });
    // });

  }

  ObtenerListaDeviceType() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerDeviceTypeLista')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      DEVICESTYPE = res;
      this.devicesType = DEVICESTYPE
      DEVICETYPE = res
      this.deviceType = DEVICETYPE
      console.log('devicesType', this.deviceType);
      
      }); 

  }

  ObtenerListaColor() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerColorLista')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      COLORLISTA = res;
      this.colorLista = COLORLISTA
      console.log('colorLista', this.colorLista);
      
      });
      
  }

  handleSuccessResponse() {

    this.toasterService.success(' Información actualizada con exito' );
  }

  EditPropiedades() {
    // console.log(this.propiedades.isOn);
    // console.log(this.propiedades.valor);
    // console.log("Estes es el type: ",this.propiedades.type);
    
    // console.log(this.propiedades.description);
    // console.log(Number(this.prioridadValor.nativeElement.value));

    PROPIEDADESACTUALIZAR =
    {
      id:IDMAQUINA,
      descripcionMaquina:this.nameMachineValor.nativeElement.value,
      type:this.propiedades.type, 
      valor:this.propiedades.valor,
      isOn:this.propiedades.isOn
      // prioridad:Number(this.prioridadValor.nativeElement.value)
    };

     
    const currentUserId = this.userStore.getUser().firstName;
  // console.log("este es el usuario: ",this.userStore.getUser().firstName);
  var respons = 
  {
    user: currentUserId,
    message:"Modificó propiedades de la maquina "+ PROPIEDADESACTUALIZAR.descripcionMaquina 
};
  this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Alarms/postSaveAlarmUser', respons)
    .pipe(takeWhile(() => this.alive)) 
    .subscribe((res: any) => {
        //  console.log("Envió: ", res);
         
      });

    // this.colorMaquina.fillValor = 'red';
    // console.log(PROPIEDADESACTUALIZAR);

    this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/ActualizarPropiedadesMaquina', PROPIEDADESACTUALIZAR)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:any) => {
      this.messageService.sendMessage('MachineColor');
      this.handleSuccessResponse();
    }      
      );
      // this.back();
  }

   public moveSelected(direction) {
    
     if (direction === 'right') {
       this.wipFree.forEach(item => {
        if (item.selected) {
          WIPTARGET =
          {
            idTarget:this.idMaquina,
            idWip:item.id,
          }; 
          this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/PutWipTarget', WIPTARGET)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            // this.DataLoadBasic(this.idMaquina);  
          });
        
        }
      });
     } else {;
      this.wipLista.forEach(item => {
        if (item.selected) {
          WIPTARGET =
          {
            idTarget:this.idMaquina,
            idWip:item.id,
          };
          this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/DelWipTarget', WIPTARGET)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            // this.DataLoadBasic(this.idMaquina);  
          });
        
        }
      });
  //     this.list1 = this.list1.filter(i => !i.selected);
     }
   }


  public toggleSelection(item:Wip) {
    
    this.wipFree.forEach(element => {
      element.selected=false;
    });
    this.wipLista.forEach(element => {
      element.selected=false;
    });
    item.selected = !item.selected;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
