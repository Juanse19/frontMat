import {
  Component,
  Inject,
  Injectable,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  GanttComponent,
  ToolbarItem,
  EditSettingsModel,
  SelectionSettingsModel,
} from "@syncfusion/ej2-angular-gantt";
import { interval, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiGetService } from "../../../@core/backend/common/api/apiGet.services";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { switchMap, takeWhile } from "rxjs/operators";
import { EJ2Instance } from "@syncfusion/ej2-angular-schedule";
import { L10n, loadCldr, setCulture } from "@syncfusion/ej2-base";
import { ItemModel } from "@syncfusion/ej2-angular-navigations";
import { WindowFormComponent } from "./../../conveyor/scheduler/window-form/window-form.component";
import { NbWindowService } from "@nebular/theme";
import { CheckBox } from "@syncfusion/ej2-buttons";
import { TextBox, NumericTextBox, MaskedTextBox } from "@syncfusion/ej2-inputs";
import { DatePicker, DateTimePicker } from "@syncfusion/ej2-calendars";
import { DropDownList } from "@syncfusion/ej2-dropdowns";
import { ClickEventArgs } from "@syncfusion/ej2-navigations";

setCulture("de-DE");

// L10n.load({
//   'de-DE': {
//       'gantt': {
//            "id": "Ich würde",
//             "name": "Name",
//             "startDate": "Anfangsdatum",
//             "duration": "Dauer",
//             "progress": "Fortschritt",
//         }
//     }
// });

interface gantt {
  Id?: number;
  taskName?: string;
  Subject?: string;
  StartTime?: string;
  EndTime?: string;
  make?: string;
  taskID?: string;
}

interface carrusel {
  text?: string;
  id?: string;
  color?: string;
}

interface airline {
  text?: string;
  id?: string;
  groupId?: string;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: "ngx-scheduler-sita",
  templateUrl: "./scheduler-sita.component.html",
  // styleUrls: ["./scheduler-sita.component.scss"],
  // encapsulation: ViewEncapsulation.None,
})

export class SchedulerSitaComponent implements OnInit {
  @ViewChild("gantt")
  public ganttObj: GanttComponent;
  public data: object[];
  public taskSettings: object;
  public resourceFields: object;
  public columns: object[];
  public splitterSettings: object;
  public toolbar: any;
  public editSettings: object;
  public editDialogFields: object[];
  public labelSettings: object;
  public timelineSettings: object;
  // public timezoneValue: string = 'UTC-06:00';
  public dayWorkingTime: object[];
  public divElement: any;
  public inputs = {
    booleanedit: CheckBox,
    dropdownedit: DropDownList,
    datepickeredit: DatePicker,
    datetimepickeredit: DateTimePicker,
    maskededit: MaskedTextBox,
    numericedit: NumericTextBox,
    stringedit: TextBox,
  };
 
  intervalSubscriptionScheduleGantt: Subscription;

  public ganttData: gantt[] = [];

  public car: carrusel[] = [];

  public airline: airline[] = [];

  private alive = true;

  public loading: boolean;

  constructor(
    public apiGetComp: ApiGetService,
    private http: HttpClient,
    private api: HttpService,
    private windowService: NbWindowService
  ) {
    this.loading = true;
    this.ChargeSchedulerData();
  }

  ngOnInit(): void {
    this.ChargeSchedulerGantt();

    // this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel'];
    this.toolbar = [{ text: "Agregar", cssClass: 'e-icons e-add', tooltipText: "Click", id: "Click" }];

    this.taskSettings = {
      id: "taskID",
      name: "taskName",
      startDate: "StartTime",
      endDate: "EndTime",
      duration: "Duration",
      progress: "Progress",
      datam: "make",
      dependency: "Predecessor",
      child: "Children",
    };

    this.columns = [
      { field: "taskID", visible: false },
      { field: "make", headerText: "MakeUp", width: "120" },
      { field: "taskName", headerText: "Aerolinea", width: "120" },
      { field: "StartTime", headerText: "Fecha", format: { format: 'yyyy/mm/dd', type: 'date'} },
      { field: "EndTime", headerText: "Fecha End", format: { format: 'dd/MM/yyyy', type: 'date'} },
    ];

    this.splitterSettings = {
      position: "35%",
    };

    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: false,
      showDeleteConfirmDialog: false,
    };
    this.editDialogFields = [
      { type: "General", headerText: "General" },
      { type: "Dependency" },
      { type: "Resources" },
      { type: "Notes" },
    ];

    this.labelSettings = {
      leftLabel: "TaskName",
    };

    this.timelineSettings = {
      timelineUnitSize: 70,
      topTier: {
        unit: "Day",
        format: "MMM dd, yyyy",
      },
      bottomTier: {
        unit: "Hour",
        format: "hh:mm a",
      },
    };
    this.dayWorkingTime = [{ from: 0, to: 24 }];
  }

  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.text === 'Click') {
      console.log('Data');
        }
        
        
        this.openWindowForm();
        
      };

  public actionBegin(args: any) {
    console.log("args", args);

    if (args.requestType === "beforeOpenEditDialog") {
    }
  }

  public actionComplete(args: any) {
    // if (args.requestType === "openEditDialog" || args.requestType === "openAddDialog") {
    //   var generalTab = document.getElementById(this.ganttObj.controlId + "GeneralTabContainer");
    //   // generalTab.appendChild(this.divElement);
    // }
    if (args.requestType === "toolbarItemRendering") {
      const exportItem: ItemModel = {
        align: "Left",
        showTextOn: "Both",
        text: "Agregar",
        cssClass: "e-icons e-print",
        click: this.openWindowForm.bind(this),
      };
      args.items.push(exportItem);
    }
  }

  openWindowForm() {
    this.windowService.open(WindowFormComponent, { title: `` });
  }

  public onActionAddBegin(args: any): void {
    if (args.requestType === "toolbarItemRendering") {
      const exportItem: ItemModel = {
        align: "Left",
        showTextOn: "Both",
        text: "Agregar",
        cssClass: "e-icons e-print",
        click: this.openWindowForm.bind(this),
      };
      args.items.push(exportItem);
    }
  }

  public airCharge() {
    this.http
      .get(this.api.apiUrlNode1 + "/GetAirs")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: airline[] = []) => {
        this.airline = res;
        // console.log('Airlines:', res  );
      });
  }

  public carruselCharge() {
    this.http
      .get(this.api.apiUrlNode1 + "/GetMakeUpListNew")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: carrusel[] = []) => {
        this.car = res;
        // console.log('Carr:', res  );
      });
  }

  public ChargeSchedulerGantt() {
    if (this.intervalSubscriptionScheduleGantt) {
      this.intervalSubscriptionScheduleGantt.unsubscribe();
    }

    this.intervalSubscriptionScheduleGantt = interval(10000)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() =>
          this.http.get(this.api.apiUrlNode1 + "/resourceDataGantt")
        )
      )
      .subscribe((res: any) => {
        this.ganttData = res;
        console.log("ganttData:", this.ganttData);
      });
  }

  ChargeFunData() {
    this.apiGetComp
      .GetJson(this.api.apiUrlNode1 + "/resourceDataGantt")
      .subscribe((res: any) => {
        this.ganttData = res;
        console.log("ganttData:", this.ganttData);
      });
    const contador = interval(10000);
    contador.subscribe((n) => {
      this.apiGetComp
        .GetJson(this.api.apiUrlNode1 + "/resourceDataGantt")
        .subscribe((res: any) => {
          //REPORTOCUPATION=res;
          this.ganttData = res;
        });
    });
  }

  ChargeSchedulerData() {
    this.http
      .get(this.api.apiUrlNode1 + "/resourceDataGantt")
      .subscribe((res: any) => {
        this.ganttData = res;
        console.log("ganttDataSheduler:", this.ganttData);
      });
    
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
