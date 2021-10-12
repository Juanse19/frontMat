import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { NbToastrService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { UserStore } from '../../../@core/stores/user.store';
import { GridComponent, SortService, PageSettingsModel, FilterSettingsModel, CommandClickEventArgs, 
  EditService, CommandColumnService, CommandModel, ToolbarService, PageService,
   ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import Swal from 'sweetalert2'; 

interface Alarmas {
  id: number;
  message: string;
  level: string;
  exception: string;
  userId: string;
  STD: string;
  ETD: string;
  UserIdAcknow: string;
  NameDevice: string;
  DescriptionDevice: string;
}

let ALARMAS: Alarmas[] = [


];

@Component({
  selector: 'ngx-lastalarm',
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
  templateUrl: './lastalarm.component.html',
  styleUrls: ['./lastalarm.component.scss']
})
export class LastalarmComponent implements OnInit {

  public select = false;
  private alive = true;
  mostrar: Boolean;

  public pageSettings: PageSettingsModel;
  

  public editSettings: Object;
    // public toolbar: string[];
    public toolbar: ToolbarItems[] | object;
 
  public historyAlarmData: Alarmas[];
  public editparams: Object;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  public initialSort: Object;

  alarmas = ALARMAS;

  public Alarm: Alarmas[];

  constructor(
    public accessChecker: NbAccessChecker,
    private toastrService: NbToastrService,
    public apiGetComp: ApiGetService,
    private api: HttpService,
    private userStore: UserStore,
  ) {
    this.alive;
    this.accessChecker.isGranted('edit', 'ordertable')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if(res){ 
        this.select = false;
        this.mostrar = false;
      }else {
        this.select=true;
        this.mostrar=true;
      }
    });
   }

  ngOnInit(): void {

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
      allowEditOnDblClick: false
    };
    
    this.pageSettings = { pageSizes: true, pageSize: 1 };
    this.filterOptions = {
      type: 'Menu',
   };

    this.Chargealarms();

    this.toolbar = [
      //  {text: 'Delete', prefixIcon: 'fas fa-check'},
    //  { text: 'Reconocer alarmas', tooltipText: 'Click', prefixIcon: 'fas fa-check-double', id: 'Click' }
    ];

     this.commands = [
      // { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
      { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-check' } },
      { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
      { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }];

  }

  Chargealarms() {
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/lastAlarm')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Total Ordenes:", res);
      this.Alarm = res;
    });
    const contador = interval(6000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/lastAlarm')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.Alarm = res;
      });
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
