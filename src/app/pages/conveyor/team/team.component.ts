import { Component, OnInit, ViewChild } from "@angular/core";
// import { Dashboardv2Data } from '../../../@core/interfaces/iot/dashboardv2';
import { NgxFilterByNumberComponent } from "../../../@components/custom-smart-table-components/filter-by-number/filter-by-number.component";
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
} from "@syncfusion/ej2-angular-grids";

export interface Team {
  title: string;
  link: string;
  hidden: boolean;
}

export interface teams {
  Conveyors: string;
  Estado: string;
  Energia: string;
  Corriente: string;
  Mensaje: string;
}

@Component({
  selector: "ngx-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  Team = [];

  public teamsData: Team[] = [];

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  private alive = true;

  public loading: boolean;
 
  public groupSettings: { [x: string]: Object } = { showDropArea: false, columns: ['ZoneName'] };

  intervalSubscriptionTeam: Subscription;

  public refresh: Boolean;
    @ViewChild('grid')
    public grid: GridComponent;

  constructor(
    public apiGetComp: ApiGetService,
    private http: HttpClient,
    private api: HttpService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    // this.ChargeTeamData();
    this.chargeData();
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this.filterOptions = {
      type: "Menu",
    };
  }

  chargeData() {
    this.http
      .get(this.api.apiUrlNode1 + "/api/menuReports")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        // tslint:disable-next-line: no-console
        // console.log('teamsData: ', res);
        this.loading = false;
        this.teamsData = res;
      });
  }

  public bandaTeamCharge(){

    if (this.intervalSubscriptionTeam) {
      this.intervalSubscriptionTeam.unsubscribe();
    }
    
    this.intervalSubscriptionTeam = interval(26000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/api/team')),
    )
    .subscribe((res: any) => {
      this.teamsData = res;
        // console.log('Equipos:', this.teamsData);
    });
  }

  dataBound() {
    if (this.refresh) {
        this.grid.groupColumn('CategoryName');
        this.refresh = false;
    }
}
load() {
    this.refresh = (<any>this.grid).refreshing;
}

  // ChargeTeamData() {
  //   this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Dashboardv1/GetEfficiency').subscribe((res: any) => {
  //     //REPORTOCUPATION=res;
  //     console.log("TeamData:", res);
  //     this.teamData = res;
  //     this.source1.load(res);
  //   });
  //   const contador = interval(60000)
  //   contador.subscribe((n) => {
  //     this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Dashboardv1/GetEfficiency').subscribe((res: any) => {
  //       //REPORTOCUPATION=res;
  //       this.teamData = res;
  //       this.source1.load(res);
  //     });
  //   });

  // }

  ngOnDestroy() {
    this.alive = false;
  }
}
