import { Component, OnInit, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { ApiGetService } from "../../../@core/backend/common/api/apiGet.services";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { switchMap, takeWhile } from "rxjs/operators";
import { NbAccessChecker } from "@nebular/security";
import { interval, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  GridComponent,
  PageSettingsModel,
  FilterSettingsModel,
  ToolbarItems,
  CommandModel,
} from "@syncfusion/ej2-angular-grids";

interface dataBM {
  Id: number,
  RegisterTime: string,
  V: string,
  F: string,
  I: string,
  O: string,
  N: string,
  D: string,
  S: string,
  H: string,
  W: string,
  P: string,
  G: string,
  Y: string,
  C: string,
  L: string,
  T: string,
  K: string,
  R: string,
  X: string,
  CSI: string
}

interface bagMessage {
  Id?: number;
  Standard_Message_Identifier?: string;
  Change_Status_Indicator?: string;
  Version_Supplementary_Data?: string;
  Outbound_Flight_Information?: string;
  Inbound_Flight_Information?: string;
  Onward_Flight_Information?: string;
  Baggage_Tag_Details?: string;
  Check_in_Location_Information?: string;
  Reconciliation_Data?: string;
  Handling_Location?: string;
  Pieces_Weight_Dimensions_Type_Data?: string;
  Passenger_Name?: string;
  Ground_Transport?: string;
  Frequent_Traveller_Numb?: string;
  Corporate_Group_Name?: string;
  Automated_PNR_Address?: string;
  Baggage_Tag_Printer_ID?: string;
  Default_Message_Printer?: string;
  Baggage_Exception_Data?: string;
  Internal_Airline_Data?: string;
  Baggage_Security_Screening?: string;
}

@Component({
  selector: "ngx-message-bm",
  templateUrl: "./message-bm.component.html",
  styleUrls: ["./message-bm.component.scss"],
})
export class MessageBMComponent implements OnInit {
  
  @ViewChild('grid') 
  public grid: GridComponent;

  public bagMessageData: dataBM[] = [];

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  private alive = true;

  public loading: boolean;
  
  public showCloseIcon: Boolean = this.alive ;

  public toolbarOptions: ToolbarItems[];

  public toolbar: ToolbarItems[] | object;

  public toolbalopr: ToolbarItems[] | object;

  public commands: CommandModel[];

  public editSettings: Object;  

  public header: string;

  intervalSubscriptionBm: Subscription;

  constructor(
    public apiGetComp: ApiGetService,
    private http: HttpClient,
    private api: HttpService
    ) {
      this.loading = true;
    }

    ngOnInit(): void {
      this.chargeDataBM()
      this.pageSettings = { pageSize: 10 };
        this.filterOptions = {
        type: 'Menu',
     }
    }

    chargeDataBM() {
      this.http.get(this.api.apiUrlNode1 + '/api/notificationBM')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        // tslint:disable-next-line: no-console
        // console.log('acoData: ', res);
        this.loading = false;
        this.bagMessageData = res;
        console.log('acoData: ', this.bagMessageData);
        this.bandaBmCharge();
      });
      // const contador = interval(60000)
      // contador.subscribe((n) => {
      //   this.http.get(this.api.apiUrlNode1 + '/api/notificationBM')
      //   .pipe(takeWhile(() => this.alive))
      //   .subscribe((res: any) => {
      //     this.bagMessageData = res;
      //     this.loading = false;
      //   });
      // });
    }

    public bandaBmCharge(){

      if (this.intervalSubscriptionBm) {
        this.intervalSubscriptionBm.unsubscribe();
      }
      
      this.intervalSubscriptionBm = interval(26000)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => this.http.get(this.api.apiUrlNode1 + '/api/notificationBM')),
      )
      .subscribe((res: any) => {
        this.bagMessageData = res;
          // console.log('Equipos:', this.bagMessageData);
      });
    }

    dataBound() {
      this.grid.autoFitColumns(
        ['V','F', 'O', 'N',
         'S', 'P', 'L', 'R', 'CSI', 'RegisterTime' ]);
  }

    ngOnDestroy() {
      this.alive = false;
    }

}
