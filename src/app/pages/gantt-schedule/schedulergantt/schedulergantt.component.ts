import { ChangeDetectionStrategy, Component, ElementRef, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { interval, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiGetService } from "../../../@core/backend/common/api/apiGet.services";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { switchMap, takeWhile } from "rxjs/operators";
import { NbWindowService } from '@nebular/theme';
import { ClickEventArgs } from "@syncfusion/ej2-navigations";
// import { WindowFormComponent } from '../../conveyor/scheduler/window-form/window-form.component';
import { WindowFormComponent } from '../window-form/window-form.component'
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-angular-calendars';
import { MaskedTextBox, NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { WindowsSchedulerComponent } from './../windows-scheduler/windows-scheduler.component';
import { NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { DayMarkersService, EditService, FilterService, GanttComponent, SelectionService, SortService, ToolbarService } from '@syncfusion/ej2-angular-gantt';
import { MessageService } from '../../dashboard/services/MessageService';



interface gantt {
  Id?: number;
  taskName?: string;
  Subject?: string;
  IATA?: string;
  startTime?: string;
  endTime?: string;
  ChuteName?: string;
  taskID?: string;
}

interface airLine {
  AirlineId: string;
  AirlineCode: string;
  AirlineICAO: string;
  AirlineName: string;
  AirlineColor: string;
}

interface carr {
  text: string;
  id: string;
  color: string;
}

let GANTTLIST: gantt;

// @Injectable({
//   providedIn: 'root'
// })
@Component({
  selector: 'ngx-schedulergantt',
  templateUrl: './schedulergantt.component.html',
  styleUrls: ['./schedulergantt.component.scss'],
  providers: [ EditService , FilterService, SortService, SelectionService,ToolbarService,DayMarkersService ],
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SchedulerganttComponent implements OnInit {

  public airForm!: FormGroup;
  public taskSettings!: object;
  public columns!: object[];
  public splitterSettings: object;
  public toolbar!: object;
  public editSettings!: object;
  public gridLines!: string;
  public editDialogFields!: object[];
  public labelSettings!: object;
  public timelineSettings!: object;
  public eventMarkers!: object[];
  // public timezoneValue: string = 'UTC-06:00';
  public dayWorkingTime!: object[];
  public  intervalSubscriptionScheduleGantt: Subscription;
  private alive = true;
  public ganttData?: gantt[] = [];
  public data!: object[];
  public ganttSheduData? = GANTTLIST;
  public orderForm: FormGroup;
  public mostrar: Boolean;
  public showCloseIcon: Boolean = true;
  public enctexto?: string;
  public airlinesData?: airLine [] = [];
  public carrData?: carr [] = [];
  public dataGantt? = GANTTLIST;
  subscription: Subscription;
  

  @ViewChild('gantt', {static: true})
    public ganttObj: GanttComponent;

  public StartDates: Date = new Date();
  public EndDate: Date = new Date();

  get Subject() { return this.orderForm.get('Subject')}
  get ChuteName() { return this.orderForm.get('taskID')}
  get taskID() { return this.orderForm.get('taskID')}
  get taskName() { return this.orderForm.get('taskName')}
  get IATA() { return this.orderForm.get('IATA')}
  get StartTime() { return this.orderForm.get('StartTime')}
  get EndTime() { return this.orderForm.get('EndTime')}
  

    public divElement: any;

  constructor(private http: HttpClient,
    private api: HttpService,
    private windowService: NbWindowService,
    public dialogWindows: WindowsSchedulerComponent,
    private miDatePipe: DatePipe,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
    public apiGetComp: ApiGetService,
    private messageService: MessageService,
    private ganttPopup: WindowsSchedulerComponent,) { 
      this.loadData();
     }

     loadData(){
      this.subscription = this.messageService.onMessage()
      .pipe(takeWhile(() => this.alive))
      .subscribe(message => {
        if (message.text=="PackageUpdate") {

          this.date(this.StartDates, this.EndDate);
          // console.log('Cargo exitosamente..!');
          
        } 
      });
     }

  ngOnInit(): void {

    this.data = []

    this.date(this.StartDates, this.EndDate);
    
    this.initForm();

    this.taskSettings = {
      id: "Id",
      name: "taskName",
      startDate: "startTime",
      endDate: "endTime",
      duration: "Duration",
      progress: "Progress",
      datam: "ChuteName",
      dataI: "IATA",
      dependency: "Predecessor",
      child: "Children",
    };

    this.orderForm = new FormGroup({
      Id: new FormControl,
      Subject: new FormControl(),
      taskName: new FormControl(),
      taskID: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      ChuteName: new FormControl(),
   });

    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: false,
      showDeleteConfirmDialog: true
  };

  // this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel'];
  // this.toolbar = ['Add'];
  this.toolbar = [
    //  {text: 'Delete', prefixIcon: 'fas fa-check'},
   { text: 'Agregar', tooltipText: 'Click', cssClass: 'e-flat', prefixIcon: 'fas fa-check-double', id: 'Click' }];
    
    this.columns = [
      { field: "Id", visible: false },
      { field: "ChuteName", headerText: "MU", width: "90" },
      { field: "Subject", headerText: "Vuelo", width: "100" },
      { field: "IATA", headerText: "IATA", width: "90" },
      { field: "startTime", headerText: "STD", width: "155", format: { format: 'dd-MM-yyyy hh:mm a', type: 'date'} },
      { field: "endTime", headerText: "ETD", width: "155", format: { format: 'dd-MM-yyyy hh:mm a', type: 'date'} },
      { field: "taskName", headerText: "Aerolinea", width: "120" },
      { field: "taskID", headerText: "taskID", width: "120" },
    ];

    this.splitterSettings = {
      position: "40%",
    }
  //   this.splitterSettings = {
  //     columnIndex: 3
  // };

    this.labelSettings = {
        leftLabel: 'taskName',
    };
 
    this.eventMarkers = [
      { day: new Date(), label: 'Hora actual' },
  ];

    this.gridLines = 'Both';

    this.timelineSettings = {
      timelineUnitSize: 70,
      topTier: {
        unit: "Day",
        format: "MMM, dd, yyyy, HH, mm",
      },
      bottomTier: {
        unit: "Hour",
        format: "HH:mm a",
      },
    //   bottomTier: {
    //     unit: 'Minutes',
    //     count: 15,
    //     format: 'hh:mm a'
    // },
    };
    this.dayWorkingTime = [{ from: 0, to: 24 }];
  }
  

  public date(StartDates: Date, EndDate: Date){
      
    
    const fechaFormateada = this.miDatePipe.transform(StartDates, 'yyyy-MM-dd');
    const fechaFormateadaeTD = this.miDatePipe.transform(EndDate, 'yyyy-MM-dd');

    if (fechaFormateada == null && fechaFormateadaeTD == null) {
  
      this.toastrService.warning('', 'No pusiste la fecha.');

    }else if (fechaFormateadaeTD < fechaFormateada ) {

      this.toastrService.warning('', 'Pon las fechas correctas.');

    } else if ( fechaFormateada > fechaFormateadaeTD) {

      this.toastrService.warning('', 'La fecha no puede ser Mayor.');

    } else {
      this.http.get(this.api.apiUrlNode1 + '/resourceDataGantt?registerDateSTD='+ fechaFormateada + '&registerDateETD=' + fechaFormateadaeTD)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
    
      if (res.length == 0){
       
        this.toastrService.danger('', 'No ha data.');
        this.ganttData=res.length;
        }else {
        this.ganttData=res;
        this.data[0] = res
        // console.log('Data',this.data[0]);
        this.ganttObj = res
        // console.log('Data Gantt:', this.ganttObj );
        }
      
      
    });
    }

  }

  openWindowForm() {
    this.windowService.open(WindowFormComponent, { title: `` });
  }

  public actionBegin(args) {
    if (args.requestType === "beforeOpenAddDialog" ) {
      args.cancel = true;
  
    } else if (args.requestType === "beforeOpenEditDialog"){
      args.cancel = true;
      // console.log('---- ',args.rowData.taskData.taskID.substr('%MA%'));
      // console.log('---- ',args.rowData.taskData.taskID.search('MA') == -1);
      
    //  debugger
          // if (args.rowData.taskData.taskID.indexOf('MA') == args.rowData.taskData.taskID.substr('0,1')) {
            if (args.rowData.taskData.taskID.search('MA') == false) {
            // console.log('MA...');
            
            this.ganttPopup.openWindowForm( args.rowData.taskData.taskName , args.rowData.taskData,);
          } else {
            this.toastrService.warning('', 'Vuelo asignado por SITA, no se puede editar.');
          }
          // this.ganttPopup.openWindowForm( args.rowData.taskData.taskName , args.rowData.taskData,);
    }
};
  

// actionComplete(args) {
//   args.cancel = true;
//   if (( args.requestType === 'save')) {
//     args.cancel = true;
//     console.log('Se guardo');
//   } else if (args.requestType === 'delete'){
   
//     console.log('Delete', args.requestType);
//     args.cancel = true;
   
//   }
// }


  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.text === 'Click') {
      // console.log('Data');
        }
        this.openWindowForm();
      };


      initForm() {
        this.airForm = this.fb.group({
          Subject: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
          ProjectId: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
          TaskId: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
          StartDates: ['', Validators.required],
          EndDate: ['', Validators.required],
        });
      }


 


  // public ChargeSchedulerGantt() {
  //   if (this.intervalSubscriptionScheduleGantt) {
  //     this.intervalSubscriptionScheduleGantt.unsubscribe();
  //   }

  //   this.intervalSubscriptionScheduleGantt = interval(20000)
  //     .pipe(
  //       takeWhile(() => this.alive),
  //       switchMap(() =>
  //         this.http.get(this.api.apiUrlNode1 + "/resourceDataGantt")
  //       )
  //     )
  //     .subscribe((res: any) => {
  //       this.ganttData = res;
  //     });
  // }


  ngOnDestroy() {
    this.alive = false;
  }

}
