import { messages } from './../../extra-components/chat/messages';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { switchMap, takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GridComponent, PageSettingsModel, FilterSettingsModel, ToolbarItems, CommandModel } from '@syncfusion/ej2-angular-grids';
import { ResizeService } from '@syncfusion/ej2-angular-grids';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

export interface ams {
  Id: number,
  CreatedDate: string,
  UpdatedDate: string,
  DataVersion: string,
  FlightIdFlightKind: string,
  FlightIdAirlineDesignatorIATA: string,
  FlightIdAirlineDesignatorICAO: string,
  FlightIdFlightNumber: string,
  FlightIdScheduledDate: string,
  FlightIdAirportCodeIATA: string,
  FlightIdAirportCodeICAO: string,
  FlightStateScheduledTime: string,
  FlightStateLinkedFlightFlightIdFlightKind: string,
  FlightStateLinkedFlightFlightIdFlightKindIATA: string,
  FlightStateLinkedFlightFlightIdFlightKindICAO: string,
  FlightStateLinkedFlightFlightIdFlightNumber: string,
  FlightStateLinkedFlightFlightIdScheduledDate: string,
  FlightStateLinkedFlightFlightIdAirportCodeIATA: string,
  FlightStateLinkedFlightFlightIdAirportCodeICAO: string,
  FlightStateLinkedFlightFlightUniqueID: string,
  FlightStateLinkedFlightScheduledTime: string,
  FlightStateAircraftTypeAircraftTypeIdAircraftTypeCodeIATA: string,
  FlightStateAircraftTypeAircraftTypeIdAircraftTypeCodeICAO: string,
  FlightStateAircraftTypeName: string,
  FlightStateAircraftAircraftIdRegistration: string,
  FlightStateAircraftIsRetired: string,
  FlightStateRouteattributescustomsType: string,
  FlightStateRouteViaPointsRouteViaPointattributessequenceNumber: string,
  FlightStateRouteViaPointsAirportCodeIATA: string,
  FlightStateRouteViaPointsAirportCodeICAO: string,
  FlightStateFlightUniqueID: string,
  FlightStateChuteSlotsChuteSlotStartTime: string,
  FlightStateChuteSlotsChuteSlotEndTime: string,
  FlightStateChuteSlotsChuteSlotChuteName: string,
  FlightStateChuteSlotsChuteSlotChuteExternalName: string,
  SITAAMSFlightsResultWebServiceResultApiResponseID: number,
}

interface Alarmas {
  // Id: number;
  // Message: string;
  // Level: string;
  // Exception: string;
  // UserId: string;
  // TimeStamp: string;
  // ETD: string;
  // UserIdAcknow: string;
  // IdDevice: string;
  Id: number;
  FechaRegistro: string;
  Descripcion: string;
  Nivel: string;
}

let ALARMAS: Alarmas[] = [


];

@Component({
  selector: 'ngx-message-ams',
  templateUrl: './message-ams.component.html',
  styleUrls: ['./message-ams.component.scss'],
  providers: [ResizeService]
})
export class MessageAMSComponent implements OnInit {
 
  @ViewChild('grid') 
  public grid: GridComponent;

  ams = [];

  alarmas = ALARMAS;
  public Alarm: Alarmas[]=[];

  public airForm: FormGroup;

  public amsData: ams[] = [];

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  private alive = true;

  public loading: boolean;
  
  public showCloseIcon: Boolean = this.alive ;

  public toolbarOptions: ToolbarItems[];

  public toolbar: ToolbarItems[] | object;

  // public toolbalopr: ToolbarItems[] | object;

  public commands: CommandModel[];

  public editSettings: Object;  

  public header: string;
  
  intervalSubscriptionAms: Subscription;
  intervalSubscriptionLogsAms: Subscription;

  public StartDates: Date = new Date();
  public EndDate: Date = new Date();

  get StartTime() { return this.airForm.get('StartTime'); }
  get EndTime() { return this.airForm.get('EndTime'); }

  constructor(
    private fb: FormBuilder,
    public apiGetComp: ApiGetService,
    private http: HttpClient,
    private api: HttpService,
    private miDatePipe: DatePipe,
    private toastrService: NbToastrService,
    ) {
      this.loading = true;
    }

  ngOnInit(): void {
    // this.chargeDataAMS()
    this.changeLogsAms();
    this.toolbarOptions = ['ColumnChooser'];
    this.pageSettings = { pageSize: 10 };
      this.filterOptions = {
      type: 'Menu',
   }
   this.initForm();
  }

  initForm() {
    this.airForm = this.fb.group({
      StartTime: ['', Validators.required],
      EndTime: ['', Validators.required],
    });
  }

  date(StartTime: string, EndTime: string){ 
    // debugger

    const fechaFormateada = this.miDatePipe.transform(StartTime, 'yyyy-MM-dd h:mm:ss a z');
    const fechaFormateadaeTD = this.miDatePipe.transform(EndTime, 'yyyy-MM-dd h:mm:ss a zzzz');

    console.log('fechaSTD: ', fechaFormateada);
    console.log('fechaETD: ', fechaFormateadaeTD);

    // console.log('test: ', StartTime);

    if (fechaFormateada == null && fechaFormateadaeTD == null) {
      
      this.toastrService.warning('', 'Para consultar la información debe ingresar la fecha iniciar y fecha final');

    }else if (fechaFormateadaeTD < fechaFormateada ) {

      this.toastrService.warning('', 'Para no puede ser menor');

    } 
    else if ( fechaFormateada > fechaFormateadaeTD) {
     
      this.toastrService.warning('', 'La fecha no puede ser mayor.');

    } else if(fechaFormateada == null){
     
      this.toastrService.warning('', 'debes ingresar la fecha inicail');
      StartTime = '';
      EndTime= '';
      
      this.ress();
    } else if(fechaFormateadaeTD == null){

      this.toastrService.warning('', 'debes ingresar la fecha final');
      StartTime = '';
      EndTime= '';
      this.ress();
    }
    else {

      this.http.get(this.api.apiUrlNode1 + '/api/date?from='+ fechaFormateada + '&to=' + fechaFormateadaeTD)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any)=>{
        
        Swal.fire({
              title: '',
              text: res.message,
              icon: 'success',
              // timer: 2500,
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              // cancelButtonColor: '#d33',
              cancelButtonText: 'Cerrar!',
              // confirmButtonText: '¡Desea continuar!'
            })
        
      });

    //   Swal.fire({
    //     title: 'Consulta exitosa?',
    //     text: `¡Consulta de las aerolineas exitosa!`,
    //     icon: 'success',
    //     // timer: 2500,
    //     showCancelButton: false,
    //     confirmButtonColor: '#3085d6',
    //     // cancelButtonColor: '#d33',
    //     cancelButtonText: 'Cerrar!',
    //     // confirmButtonText: '¡Desea continuar!'
    //   }).then(result => {
    //     if (result.value) {
         
          
    //       // this.intervalSubscriptionStatusSesion.unsubscribe();
          
    //       // console.log("Continua navegando: ", res);
    //       // this.AutoLogoutCharge();
    // // Swal.fire('¡Se sincronizo Exitosamente', 'success');



    //     } else {
    //       // console.log('Se cierra por tiempo');
          
    //       // this.router.navigate(['/auth/logout']);
    //     }
    //   });

   

    // let respons =
    //     {
    //       form: fechaFormateada,
    //       to: fechaFormateadaeTD
    //     }
  
    //     this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/api/dates', respons)
    //       .pipe(takeWhile(() => this.alive))
    //       .subscribe((res: any) => {
    //         // this.toastrService.success('', '¡Se edito licencia con exito!'); 
    //         }); 

    }

  }

  ress() {
    this.StartDates = null;
    this.EndDate = null;
    
  }

  chargeDataAMS() {
    this.http.get(this.api.apiUrlNode1 + '/api/notificationAMS')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
    //   if (res.length === 0) {
    //     res = [{
    //       Id: 0,
    //       Flight_Notification_Type:0,
    //       Flight_Notification_RegisterTime:0,
    //       Flight_FlightId_FlightKind:0,
    //       Flight_FlightId_AirlineDesignator_IATA:0,
    //       Flight_FlightId_FlightNumber:0,
    //       Flight_FlightId_ScheduledDate:0,
    //       Flight_FlightState_ScheduledTime:0,
    //       Flight_FlightState_AircraftType_AircraftTypeId_AircraftTypeCode_IATA:0,
    //       Flight_FlightState_AircraftType_AircraftTypeId_AircraftTypeCode_ICAO:0,
    //       Flight_FlightState_Aircraft_AircraftId_Registration:0,
    //       Flight_FlightState_Route_ViaPoints_RouteViaPoint_sequenceNumber:0,
    //       Flight_FlightState_Route_ViaPoints_RouteViaPoint_AirportCode_IATA:0,
    //       Flight_FlightState_Route_ViaPoints_RouteViaPoint_AirportCode_ICAO:0,
    //       Flight_FlightState_propertyName_FlightUniqueID:0,
    //       Flight_FlightState_ChuteSlots_ChuteSlot_propertyName_StartTime:0,
    //       Flight_FlightState_ChuteSlots_ChuteSlot_propertyName_EndTime:0,
    //       Flight_FlightState_ChuteSlots_ChuteSlot_propertyName_Category:0,
    //       Flight_FlightState_ChuteSlots_ChuteSlot_Chute_propertyName_Name:0,
    //       Flight_FlightChanges_Change_propertyName_Chutes_OldValue:0,
    //       Flight_FlightChanges_Change_propertyName_Chutes_NewValue:0,
    //       Flight_FlightChanges_Change_ChuteSlotsChange_OldValue_ChuteSlot_StartTime:0,
    //       Flight_FlightChanges_Change_ChuteSlotsChange_OldValue_ChuteSlot_EndTime:0,
    //       Flight_FlightChanges_Change_ChuteSlotsChange_NewValue_ChuteSlot_StartTime:0,
    //       Flight_FlightChanges_Change_ChuteSlotsChange_NewValue_ChuteSlot_EndTime:0,
    // }]
    
      
    //   this.amsData = res;
    //   console.log('amsData: ', this.amsData);
    //   this.loading = false;
    //   } else {
    //   console.log('testData: ', res);
    //   this.loading = false;
    //   this.amsData = res;
    //   }
    this.amsData = res;
    this.loading = false;
    this.bandaAMSCharge();
    });
    // const contador = interval(40000)
    // contador.subscribe((n) => {
    //   this.http.get(this.api.apiUrlNode1 + '/api/notificationAMS')
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((res: any) => {
    //     this.amsData = res;
    //     this.loading = false;
    //   });
    // });
  }

  public bandaAMSCharge(){

    if (this.intervalSubscriptionAms) {
      this.intervalSubscriptionAms.unsubscribe();
    }
    
    this.intervalSubscriptionAms = interval(36000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/api/notificationAMS')),
    )
    .subscribe((res: any) => {
      this.amsData = res;
        // console.log('Equipos:', this.amsData);
    });
  }

  dataBound() {
    // this.grid.autoFitColumns(
    //   ['FlightIdFlightKind','FlightIdAirlineDesignatorIATA', 'FlightIdAirlineDesignatorICAO', 'FlightIdFlightNumber',
    //    'FlightIdScheduledDate', 'FlightIdAirportCodeIATA', 'FlightIdAirportCodeICAO', 'FlightStateScheduledTime', 
    //    'FlightStateLinkedFlightFlightIdFlightKind', 'FlightStateLinkedFlightFlightIdFlightKindIATA','FlightStateLinkedFlightFlightIdFlightKindICAO',
    //     'FlightStateLinkedFlightFlightIdFlightNumber', 'FlightStateLinkedFlightFlightIdScheduledDate', 'FlightStateLinkedFlightFlightIdAirportCodeIATA', 
    //     'FlightStateLinkedFlightFlightIdAirportCodeICAO', 'FlightStateLinkedFlightFlightUniqueID', 'FlightStateLinkedFlightScheduledTime', 
    //     'FlightStateAircraftTypeAircraftTypeIdAircraftTypeCodeIATA', 'FlightStateAircraftTypeAircraftTypeIdAircraftTypeCodeICAO', 
    //     'FlightStateAircraftTypeName', 'FlightStateAircraftAircraftIdRegistration', 'FlightStateAircraftIsRetired', 'FlightStateRouteattributescustomsType', 
    //     'FlightStateRouteViaPointsRouteViaPointattributessequenceNumber', 'FlightStateRouteViaPointsAirportCodeIATA', 'FlightStateRouteViaPointsAirportCodeICAO', 
    //     'FlightStateFlightUniqueID', 'FlightStateChuteSlotsChuteSlotStartTime', 'FlightStateChuteSlotsChuteSlotEndTime', 'FlightStateChuteSlotsChuteSlotChuteName', 
    //     'FlightStateChuteSlotsChuteSlotChuteExternalName', 'SITAAMSFlightsResultWebServiceResultApiResponseID', 'CreatedDate', 'UpdatedDate']);
}

public changeLogsAms() {
  this.http.get(this.api.apiUrlNode1 + '/api/logsAMS')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      this.Alarm = res;
      // console.log('logs:', this.Alarm);
    });
}

public logsAMSCharge(){

  if (this.intervalSubscriptionLogsAms) {
    this.intervalSubscriptionLogsAms.unsubscribe();
  }
  
  this.intervalSubscriptionLogsAms = interval(36000)
  .pipe(
    takeWhile(() => this.alive),
    switchMap(() => this.http.get(this.api.apiUrlNode1 + '/api/logsAMS')),
  )
  .subscribe((res: any) => {
    this.Alarm = res;
      
  });
}

  ngOnDestroy() {
    this.alive = false;
  }

}
