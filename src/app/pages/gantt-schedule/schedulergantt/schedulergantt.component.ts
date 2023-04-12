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
// import { CheckBox } from '@syncfusion/ej2-buttons';
// import { DropDownList } from '@syncfusion/ej2-dropdowns';
// import { DatePicker, DateTimePicker } from '@syncfusion/ej2-angular-calendars';
// import { MaskedTextBox, NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WindowsSchedulerComponent } from './../windows-scheduler/windows-scheduler.component';
import { NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { DayMarkersService, EditService, FilterService, GanttComponent, RowSelectEventArgs, SelectionService, SortService, ToolbarService } from '@syncfusion/ej2-angular-gantt';
import { MessageService } from '../../dashboard/services/MessageService';
import { NbAuthService } from '@nebular/auth';



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
  public intervalSubscriptionScheduleGantt: Subscription;
  private alive = true;
  public ganttData?: gantt[] = [];
  public data!: object[];
  public ganttSheduData?= GANTTLIST;
  public orderForm: FormGroup;
  public mostrar: Boolean;
  public showCloseIcon: Boolean = true;
  public enctexto?: string;
  public airlinesData?: airLine[] = [];
  public carrData?: carr[] = [];
  public dataGantt?= GANTTLIST;
  subscription: Subscription;
  public access?: any;


  @ViewChild('gantt')
  public ganttObj: GanttComponent;

  public StartDates: Date = new Date();
  public EndDate: Date = new Date();

  @ViewChild(WindowFormComponent) public dialogCreate: WindowFormComponent;
  @ViewChild(WindowsSchedulerComponent) dialogEdit: WindowsSchedulerComponent;

  get Subject() { return this.orderForm.get('Subject') }
  get ChuteName() { return this.orderForm.get('taskID') }
  get taskID() { return this.orderForm.get('taskID') }
  get taskName() { return this.orderForm.get('taskName') }
  get IATA() { return this.orderForm.get('IATA') }
  get StartTime() { return this.orderForm.get('StartTime') }
  get EndTime() { return this.orderForm.get('EndTime') }


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
    private ganttPopup: WindowsSchedulerComponent,
    private toasterService: NbToastrService,
    private authService: NbAuthService) {
    this.loadData();
    this.authService.getToken()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res:any) => {
        this.access = res.accessTokenPayload.user.access;
      });
  }

  loadData() {
    this.subscription = this.messageService.onMessage()
      .pipe(takeWhile(() => this.alive))
      .subscribe(message => {
        if (message.text == "PackageUpdate") {

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
      { field: "startTime", headerText: "STD", width: "155", format: { format: 'dd/MM/yyyy HH:mm', type: 'date' } },
      { field: "endTime", headerText: "ETD", width: "155", format: { format: 'dd/MM/yyyy HH:mm', type: 'date' } },
      { field: "taskName", headerText: "Aerolinea", width: "120" },
      { field: "taskID", headerText: "taskID", width: "120" },
    ];

    this.splitterSettings = {
      position: "0%",
      // columnIndex: 3
    }
    //   this.splitterSettings = {
    //     columnIndex: 3
    // };

    this.labelSettings = {
      leftLabel: 'Subject',
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
        format: "HH:mm",
      },
      //   bottomTier: {
      //     unit: 'Minutes',
      //     count: 15,
      //     format: 'hh:mm a'
      // },
    };
    this.dayWorkingTime = [{ from: 0, to: 24 }];
  }

  rowSelected(args: RowSelectEventArgs) {
    // const rowHeight: number = this.grid.getRows()[this.grid.getSelectedRowIndexes()[0]].scrollHeight;
    // this.grid.getContent().children[0].scrollTop = rowHeight * this.grid.getSelectedRowIndexes()[0];
  }

  public headerText: Object = [{ text: 'Asignación de Aerolínea' }, { text: 'Historico de Aerolínea' }];


  // public date(StartDates: Date, EndDate: Date) {


  //   const fechaFormateada = this.miDatePipe.transform(StartDates, 'yyyy-MM-dd');
  //   const fechaFormateadaeTD = this.miDatePipe.transform(EndDate, 'yyyy-MM-dd');

  //   this.http.get(this.api.apiUrlNode1 + '/resourceDataGantt?registerDateSTD=' + fechaFormateada + '&registerDateETD=' + fechaFormateadaeTD)
  //       .pipe(takeWhile(() => this.alive))
  //       .subscribe((res: any) => {

  //         this.ganttData = res;
          
  //         // if (res.length == 0) {

  //         //   this.toastrService.danger('', 'No ha data.');
  //         //   this.ganttData = res.length;
  //         // } else {
  //         //   this.ganttData = res;
  //         //   this.data[0] = res
  //         //   // console.log('Data',this.data[0]);
  //         //   this.ganttObj = res
  //         //   // console.log('Data Gantt:', this.ganttObj );
  //         // }


  //       });


  //   // if (fechaFormateada == null && fechaFormateadaeTD == null) {

  //   //   this.toastrService.warning('', 'No pusiste la fecha.');

  //   // } else if (fechaFormateadaeTD < fechaFormateada) {

  //   //   this.toastrService.warning('', 'Pon las fechas correctas.');

  //   // } else if (fechaFormateada > fechaFormateadaeTD) {

  //   //   this.toastrService.warning('', 'La fecha no puede ser Mayor.');

  //   // } else {
      
  //   // }

  // }

  public date(StartDates: Date, EndDate: Date) {


    const fechaFormateada = this.miDatePipe.transform(StartDates, 'yyyy-MM-dd');
    const fechaFormateadaeTD = this.miDatePipe.transform(EndDate, 'yyyy-MM-dd');

    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10);
    const fromDateObj = new Date(fechaFormateada);
    const toDateObj = new Date(fechaFormateadaeTD);

    if (fromDateObj < maxDate) {
      // alert('From date must be within the last 10 days');
      this.toasterService.warning("", "La fecha debe estar dentro de los últimos 10 días");
      return;
    }

    if (toDateObj < maxDate) {
      // alert('To date must be within the last 10 days');
      this.toasterService.warning("", "La fecha debe estar dentro de los últimos 10 de consulta");
      return;
    }

    if (toDateObj < fromDateObj) {
      // alert('To date cannot be earlier than From date');
      this.toasterService.warning("", "La fecha no puede ser diferente.");
      return;
    }

    
      this.http.get(this.api.apiUrlNode1 + '/resourceDataGantt?registerDateSTD=' + fechaFormateada + '&registerDateETD=' + fechaFormateadaeTD)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {

          if (res.length == 0) {

            this.toasterService.danger('', 'No ha data.');
            this.ganttData = res.length;
          } else {
            this.ganttData = res;
          }


        });
    

  }

  openWindowForm() {
    this.dialogCreate.openDialog();
    // this.windowService.open(WindowFormComponent, { title: `` }); 
  }

  public actionBegin(args) {
    if (args.requestType === "beforeOpenAddDialog") {
      args.cancel = true;

    } else if (args.requestType === "beforeOpenEditDialog") {
      args.cancel = true;
      if (this.access?.includes('assignment.edit')) {
        if (args.rowData.taskData.taskID.search('MA') == false) {
          // console.log('MA...');
  
          // this.ganttPopup.openWindowForm(args.rowData.taskData.taskName, args.rowData.taskData);
          this.dialogEdit.openWindowForm(args.rowData.taskData.taskName, args.rowData.taskData);
        } else {
          this.toastrService.warning('', 'Vuelo asignado por SITA, no se puede editar.');
        }
      }
      // console.log('---- ',args.rowData.taskData.taskID.substr('%MA%'));
      // console.log('---- ',args.rowData.taskData.taskID.search('MA') == -1);

      //  debugger
      // if (args.rowData.taskData.taskID.indexOf('MA') == args.rowData.taskData.taskID.substr('0,1')) {
      // if (args.rowData.taskData.taskID.search('MA') == false) {
      //   // console.log('MA...');

      //   // this.ganttPopup.openWindowForm(args.rowData.taskData.taskName, args.rowData.taskData);
      //   this.dialogEdit.openWindowForm(args.rowData.taskData.taskName, args.rowData.taskData);
      // } else {
      //   this.toastrService.warning('', 'Vuelo asignado por SITA, no se puede editar.');
      // }
      // this.ganttPopup.openWindowForm( args.rowData.taskData.taskName , args.rowData.taskData,);
    }
  };


  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.text === 'Click') {
    }
  };


  initForm() {
    this.airForm = this.fb.group({
      Subject: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      ProjectId: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      TaskId: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      StartDates: ['', Validators.required],
      EndDate: ['', Validators.required],
    });
  }


  ngOnDestroy() {
    this.alive = false;
  }

}
