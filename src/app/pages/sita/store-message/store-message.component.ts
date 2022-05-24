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

@Component({
  selector: 'ngx-store-message',
  templateUrl: './store-message.component.html',
  styleUrls: ['./store-message.component.scss']
})
export class StoreMessageComponent implements OnInit {

  @ViewChild('grid') 
  public grid: GridComponent;

  ams = [];
  public amsData: ams[] = []; 

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  private alive = true;

  public loading: boolean;
  
  public showCloseIcon: Boolean = this.alive ;

  public toolbarOptions: ToolbarItems[];

  public toolbar: ToolbarItems[] | object;

  public commands: CommandModel[];

  public editSettings: Object;  

  public header: string;
  
  intervalSubscriptionAms: Subscription;

  constructor(
    private fb: FormBuilder,
    public apiGetComp: ApiGetService,
    private http: HttpClient,
    private api: HttpService,
    private miDatePipe: DatePipe,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.chargeDataAMS();
    this.toolbarOptions = ['ColumnChooser'];
    this.pageSettings = { pageSize: 10 };
      this.filterOptions = {
      type: 'Menu',
   }
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
    this.grid.autoFitColumns(
      ['FlightIdFlightKind','FlightIdAirlineDesignatorIATA', 'FlightIdAirlineDesignatorICAO', 'FlightIdFlightNumber',
       'FlightIdScheduledDate', 'FlightIdAirportCodeIATA', 'FlightIdAirportCodeICAO', 'FlightStateScheduledTime', 
       'FlightStateLinkedFlightFlightIdFlightKind', 'FlightStateLinkedFlightFlightIdFlightKindIATA','FlightStateLinkedFlightFlightIdFlightKindICAO',
        'FlightStateLinkedFlightFlightIdFlightNumber', 'FlightStateLinkedFlightFlightIdScheduledDate', 'FlightStateLinkedFlightFlightIdAirportCodeIATA', 
        'FlightStateLinkedFlightFlightIdAirportCodeICAO', 'FlightStateLinkedFlightFlightUniqueID', 'FlightStateLinkedFlightScheduledTime', 
        'FlightStateAircraftTypeAircraftTypeIdAircraftTypeCodeIATA', 'FlightStateAircraftTypeAircraftTypeIdAircraftTypeCodeICAO', 
        'FlightStateAircraftTypeName', 'FlightStateAircraftAircraftIdRegistration', 'FlightStateAircraftIsRetired', 'FlightStateRouteattributescustomsType', 
        'FlightStateRouteViaPointsRouteViaPointattributessequenceNumber', 'FlightStateRouteViaPointsAirportCodeIATA', 'FlightStateRouteViaPointsAirportCodeICAO', 
        'FlightStateFlightUniqueID', 'FlightStateChuteSlotsChuteSlotStartTime', 'FlightStateChuteSlotsChuteSlotEndTime', 'FlightStateChuteSlotsChuteSlotChuteName', 
        'FlightStateChuteSlotsChuteSlotChuteExternalName', 'SITAAMSFlightsResultWebServiceResultApiResponseID', 'CreatedDate', 'UpdatedDate']);
}

  ngOnDestroy() {
    this.alive = false;
  }

}
