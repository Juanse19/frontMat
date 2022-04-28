import { Component, ElementRef, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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



import { L10n, loadCldr } from '@syncfusion/ej2-base';
import { MessageService } from '../../dashboard/services/MessageService';

declare let require: Function;
//  loadCldr(
//       require('../../node_modules/cldr-data/supplemental/numberingSystems.json'),
//       require('../../node_modules/cldr-data/main/es/ca-gregorian.json'),
//       require('../../node_modules/cldr-data/main/es/currencies.json'),
//       require('../../node_modules/cldr-data/main/es/numbers.json'),
//       require('../../node_modules/cldr-data/main/es/timeZoneNames.json')
//     );
   L10n.load({
        "es": {
      "schedule": {
        "day": "Día",
        "week": "Semana",
        "workWeek": "Semana laboral",
        "month": "Mes",            
        "agenda": "Agenda",
        "weekAgenda": "Agenda semanal",
        "workWeekAgenda": "Agenda de la semana laboral",
        "monthAgenda": "Month Agenda",
        "today": "Hoy",
        "noEvents": "Sin eventos",
        "emptyContainer": "No hay eventos programados para hoy.",
        "allDay": "Todo el día",
        "start": "Inicio",
        "end": "Fin",
        "more": "Más",
        "close": "Cerrar",
        "cancel": "Cancelar",
        "noTitle": "(Sin título)",
        "delete": "Borrar",
        "deleteEvent": "Borrar evento",
        "deleteMultipleEvent": "Borrar eventos",
        "selectedItems": "Items seleccionados",
        "deleteSeries": "Borrar series",
        "Add": "Agregar",
        "Edit": "Editar",
        "edit": "Editar",
        "editSeries": "Editar series",
        "editEvent": "Editar evento",
        "createEvent": "Crear",
        "subject": "Título",
        "addTitle": "Añadir título",
        "moreDetails": "Más Detalles",
        "save": "Guardar",
        "editContent": "¿Quieres editar sólo este evento o la serie entera?",
        "deleteRecurrenceContent": "¿Quieres borrar sólo este evento o toda la serie?",
        "deleteContent": "¿Estás seguro de que quieres borrar este evento?",
        "deleteMultipleContent": "¿Estás seguro de que quieres borrar los eventos seleccionados?",
        "newEvent": "Nuevo evento",
        "title": "Título",
        "location": "Ubicación",
        "description": "Descripción",
        "timezone": "Zona horaria",
        "startTimezone": "Zona horaria inicial",
        "endTimezone": "Zona horaria final",
        "repeat": "Repetir",
        "saveButton": "Guardar",
        "cancelButton": "Cancelar",
        "deleteButton": "Borrar",
        "recurrence": "Recurrencia",
        "wrongPattern": "El patrón de recurrencia no es válido.",
        "seriesChangeAlert": "Los cambios hechos a instancias específicas de esta serie serán cancelados y esos eventos volverán a coincidir con la serie.",
        "createError": "La duración del evento debe ser más corta que la frecuencia con la que se produce. Acorta la duración o cambia el patrón de recurrencia en el editor de eventos de recurrencia.",
        "recurrenceDateValidation": "Algunos meses tienen menos de la fecha seleccionada. Para estos meses, la ocurrencia caerá en la última fecha del mes.",
        "sameDayAlert": "Dos ocurrencias del mismo evento no pueden ocurrir en el mismo día.",
        "editRecurrence": "Editar recurrencia",
        "repeats": "Repeticiones",
        "alert": "Alerta",
        "startEndError": "La fecha final seleccionada se produce antes de la fecha de inicio.",
        "invalidDateError": "El valor de la fecha introducida no es válido.",
        "ok": "Ok",
        "occurrence": "Occurrencia",
        "series": "Series",
        "previous": "Anterior",
        "next": "Siguiente",
        "timelineDay": "Línea de tiempo diaria",
        "timelineWeek": "Línea de tiempo semanal",
        "timelineWorkWeek": "Línea de tiempo laboral",
        "timelineMonth": "Línea de tiempo mensual"
    },
    "recurrenceeditor": {
        "none": "Ninguno",
        "daily": "Diariamente",
        "weekly": "Semanalmente",
        "monthly": "Mensualmente",
        "month": "Mes",
        "yearly": "Anualmente",
        "never": "Nunca",
        "until": "Hasta",
        "count": "Cuenta",
        "first": "Primero",
        "second": "Segundo",
        "third": "Tercero",
        "fourth": "Cuarto",
        "last": "Último",
        "repeat": "Repetir",
        "repeatEvery": "Repetir cada",
        "on": "Repetir en",
        "end": "Fin",
        "onDay": "Día",
        "days": "Día(s)",
        "weeks": "Semana(s)",
        "months": "Mes(es)",
        "years": "Año(s)",
        "every": "cada",
        "summaryTimes": "tiempo(s)",
        "summaryOn": "en",
        "summaryUntil": "hasta",
        "summaryRepeat": "Repeticiones",
        "summaryDay": "día(s)",
        "summaryWeek": "semana(s)",
        "summaryMonth": "mes(es)",
        "summaryYear": "año(s)"
    },
    "calendar": {
      "today": "Hoy"
    },
  }
  });


interface gantt {
  Id?: number;
  taskName?: string;
  Subject?: string;
  IATA?: string;
  StartTime?: string;
  EndTime?: string;
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
  // styleUrls: ['./schedulergantt.component.scss']
  providers: [ EditService , FilterService, SortService, SelectionService,ToolbarService,DayMarkersService ],
  encapsulation: ViewEncapsulation.None
})

export class SchedulerganttComponent implements OnInit {

  public airForm: FormGroup;
  public taskSettings: object;
  public columns: object[];
  public splitterSettings: object;
  public toolbar: object;
  public editSettings: object;
  public gridLines: string;
  public editDialogFields: object[];
  public labelSettings: object;
  public timelineSettings: object;
  public eventMarkers: object[];
  // public timezoneValue: string = 'UTC-06:00';
  public dayWorkingTime: object[];
  public  intervalSubscriptionScheduleGantt: Subscription;
  private alive = true;
  public ganttData?: gantt[];
  public ganttSheduData = GANTTLIST;
  public orderForm: FormGroup;
  public mostrar: Boolean;
  public showCloseIcon: Boolean = true;
  public enctexto: string;
  public airlinesData: airLine [] = [];
  public carrData: carr [] = [];
  public dataGantt = GANTTLIST;
  subscription: Subscription;
  

  @ViewChild('gantt', {static: true})
    public ganttObj: GanttComponent;

  public StartDates: Date = new Date();
  public EndDate: Date = new Date();

  @ViewChild('ejDialogTX') ejDialogTX: DialogComponent;

  get Subject() { return this.orderForm.get('Subject')}
  get ChuteName() { return this.orderForm.get('taskID')}
  get taskID() { return this.orderForm.get('taskID')}
  get taskName() { return this.orderForm.get('taskName')}
  get IATA() { return this.orderForm.get('IATA')}
  get StartTime() { return this.orderForm.get('StartTime')}
  get EndTime() { return this.orderForm.get('EndTime')}
  

    public divElement: any;
    // public inputs = {
    //    booleanedit: CheckBox,
    //    dropdownedit: DropDownList,
    //    datepickeredit: DatePicker,
    //    datetimepickeredit: DateTimePicker,
    //    maskededit: MaskedTextBox,
    //    numericedit: NumericTextBox,
    //    stringedit: TextBox
    // };

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
          // debugger
          //this.messages.push(message);
          
          // this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/ObtenerOrderMaquina?IdMaquina=')
          // .pipe(takeWhile(() => this.alive))
          // .subscribe((res: any) => {
        
          // });

          this.date(this.StartDates, this.EndDate);
          console.log('Cargo exitosamente..!');
          
        } 
      });
     }

  ngOnInit(): void {

    this.ganttObj.locale = 'es'

    this.date(this.StartDates, this.EndDate);
    
    this.initForm();
    this.taskSettings = {
      id: "Id",
      name: "taskName",
      startDate: "StartTime",
      endDate: "EndTime",
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
      StartTime: new FormControl(),
      EndTime: new FormControl(),
      ChuteName: new FormControl(),
   });

    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: false,
      showDeleteConfirmDialog: true
  };

  this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel'];
  // this.toolbar = ['Add',  'Delete'];
    
    this.columns = [
      { field: "Id", visible: false },
      { field: "ChuteName", headerText: "MU", width: "90" },
      { field: "Subject", headerText: "Vuelo", width: "100" },
      { field: "IATA", headerText: "IATA", width: "90" },
      { field: "StartTime", headerText: "STD", width: "155", format: { format: 'dd-MM-yyyy hh:mm a', type: 'date'} },
      { field: "EndTime", headerText: "ETD", width: "155", format: { format: 'dd-MM-yyyy hh:mm a', type: 'date'} },
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
        format: "MMM, dd, yyyy, hh, mm",
      },
      bottomTier: {
        unit: "Hour",
        format: "hh:mm a",
      },
    //   bottomTier: {
    //     unit: 'Minutes',
    //     count: 15,
    //     format: 'hh:mm a'
    // },
    };
    this.dayWorkingTime = [{ from: 0, to: 24 }];
  }
  



  openWindowForm() {
    this.windowService.open(WindowFormComponent, { title: `` });
  }

  // public openWindow(){
  //   // debugger
  //   this.dialog.opendevice1();
  // }

//   createFormGroup(data: gantt): FormGroup {
//     return new FormGroup({
//       // Id: new FormControl(data.Id, Validators.required),
//       Subject: new FormControl(data.Subject, Validators.required),
//       taskName: new FormControl(data.taskName, Validators.required)

//     });
// }

  // loadUser(id?) {
  //   // debugger
  //     this.orderForm.setValue({
  //       id: this.ganttSheduData[0].Id ? this.ganttSheduData[0].Id : '',
  //       role: this.ganttSheduData[0].Subject ? this.ganttSheduData[0].Subject : '',
  //       firstName: this.ganttSheduData[0].taskName ? this.ganttSheduData[0].taskName : '',
  //     });
    
  //   }

  // public fields: Object = { text: 'text', value: 'id' };
  // public fields1: Object = { text: 'text', value: 'text' };

  // ChangeAir() {
  //   this.http.get(this.api.apiUrlNode1 + '/GetAirlineList')
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe((res: any)=>{
  //       this.airlinesData=res;
  //       // console.log('Airlines:', res  );
  //     });
  // }
  
  // changeCarr() {
  //   this.http.get(this.api.apiUrlNode1 + '/GetMakeUpListNew')
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe((res: any)=>{
  //       this.carrData=res;
  //       // console.log('Carr:', res  );
  //     });
  // }

  public actionBegin(args) {
    if (args.requestType === "beforeOpenAddDialog" ) {
      args.cancel = true;
      this.openWindowForm();
    } else if (args.requestType === "beforeOpenEditDialog"){
      args.cancel = true;
      // console.log('---- ',args.rowData.taskData.taskID.substr('%MA%'));
      // console.log('---- ',args.rowData.taskData.taskID.search('MA') == -1);
      
    //  debugger
          // if (args.rowData.taskData.taskID.indexOf('MA') == args.rowData.taskData.taskID.substr('0,1')) {
            if (args.rowData.taskData.taskID.search('MA') == false) {
            console.log('MA...');
            
            this.ganttPopup.openWindowForm( args.rowData.taskData.taskName , args.rowData.taskData,);
          } else {
            this.toastrService.warning('', 'Vuelo asignado por SITA, no se puede editar.');
          }
          // this.ganttPopup.openWindowForm( args.rowData.taskData.taskName , args.rowData.taskData,);
    }
};
  
updateData(){
  let formulario = this.airForm.value;
  console.log('Data', formulario);
  
}

actionComplete(args) {
  args.cancel = true;
  if (( args.requestType === 'save')) {
    args.cancel = true;
    console.log('Se guardo');
  } else if (args.requestType === 'delete'){
   
    console.log('Delete');
    args.cancel = true;
   
  }
}


  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.text === 'Click') {
      console.log('Data');
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
            this.ganttData=res;
            this.reset()
            }else {
            this.ganttData=res;
            console.log('Data Gantt:', this.ganttData );
            }
          
          
        });
        }
    
      }


  public reset(){
    
    this.dataGantt!.IATA! = "";
    this.dataGantt!.StartTime! = "";
    this.dataGantt!.EndTime! = "";
    this.dataGantt!.Subject = "";
    this.dataGantt!.taskID = "";
    this.dataGantt!.taskName = "";
    this.dataGantt!.ChuteName = "";
  }


  public ChargeSchedulerGantt() {
    if (this.intervalSubscriptionScheduleGantt) {
      this.intervalSubscriptionScheduleGantt.unsubscribe();
    }

    this.intervalSubscriptionScheduleGantt = interval(20000)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() =>
          this.http.get(this.api.apiUrlNode1 + "/resourceDataGantt")
        )
      )
      .subscribe((res: any) => {
        this.ganttData = res;
      });
  }


  ngOnDestroy() {
    this.alive = false;
  }

}
