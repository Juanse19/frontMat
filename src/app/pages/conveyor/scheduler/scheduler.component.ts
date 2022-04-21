import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import {BrowserModule} from '@angular/platform-browser';
// import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
// import { Priority, Resource, Appointment, ScheduleService } from './schedule.service';
import { extend } from '@syncfusion/ej2-base';
import {
    TimelineViewsService, AgendaService, GroupModel, EventSettingsModel, ResizeService, DragAndDropService, ScheduleComponent, PrintService, WeekService, MonthService, TimelineMonthService, View, ActionEventArgs, ToolbarActionArgs, ExportOptions, RenderCellEventArgs
} from '@syncfusion/ej2-angular-schedule';
// import { timelineResourceData, resourceData } from './data';
import { DataManager, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { takeWhile, timeout } from 'rxjs/operators';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { Banda5, zons, states, departures } from '../_interfaces/MatBag.model';
import { NbWindowService } from '@nebular/theme';
import { WindowFormComponent } from './window-form/window-form.component';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';
import { interval } from 'rxjs';


interface carrusel {
    text: string,
    id: string,
    color: string
}

interface airline {
    text: string,
    id: string,
    groupId: string,
    color: string
}

@Component({
  selector: 'ngx-scheduler',
  templateUrl: './scheduler.component.html',
  styles: [`    
    .timeline-resource-grouping.e-schedule:not(.e-device) .e-agenda-view .e-content-wrap table td:first-child {
        width: 90px;
        height: 50px;
    }
    .timeline-resource-grouping.e-schedule .e-agenda-view .e-resource-column {
        width: 100px;
        height: 50px;
    }.timeline-resource.e-schedule .e-timeline-view .e-resource-left-td {
  vertical-align: bottom;
}

.timeline-resource.e-schedule.e-device .e-timeline-view .e-resource-left-td {
  width: 75px;
}

.timeline-resource.e-schedule .e-timeline-view .e-resource-left-td {
  width: 240px;
}

.timeline-resource.e-schedule .e-timeline-view .e-resource-left-td .e-resource-text {
  display: flex;
  font-weight: 500;
  padding: 0;
  height: 36px;
}
    `],
    // encapsulation: ViewEncapsulation.None,
    // providers: [TimelineViewsService, AgendaService, ResizeService, DragAndDropService, MonthService]
    // providers: [WeekService, MonthService, AgendaService, TimelineViewsService, TimelineMonthService ],
})
export class SchedulerComponent implements OnInit {

    @ViewChild('scheduleObj')

    public scheduleObj: ScheduleComponent;

    public schedules: departures [] = [];

    public car: carrusel [] = [];

    public airline: airline [] = [];

    private alive=true;


    constructor( private http: HttpClient,
        private api: HttpService,
        private windowService: NbWindowService ) { 
        
      }
    
      ngOnInit(): void {
        //   this.schedulerCharge();
          this.carruselCharge();
          this.airCharge();
          this.open();
      }
    
      

  public selectedDate: Date = new Date();

  // public group: GroupModel = {
  //     resources: ['Projects', 'Categories']
  // };

  public group: GroupModel = {
    enableCompactView: false,
    resources: ['MeetingRoom', 'Projects', 'Categories']
  };
 
//   public projectDataSource: Object[] = [
//       { text: 'Carrusel 1', id: 83, color: '#cb6bb2' },
//       { text: 'Carrusel 2', id: 92, color: '#56ca85' }
//   ];
//   public categoryDataSource: Object[] = [
//       { text: 'LATAM Airlines Colombia', id: 1, groupId: 83, color: '#df5286' },
//       { text: 'Avianca', id: 146, groupId: 83, color: '#7fa900' },
//       { text: 'JetBlue', id: 147, groupId: 83, color: '#7fa900' },
//       { text: 'Kish Air', id: 3, groupId: 92, color: '#ea7a57' },
//       { text: 'Kunming Airlines', id: 8, groupId: 92, color: '#5978ee' },
//       { text: 'LAM', id: 5, groupId: 83, color: '#df5286' },
//       { text: 'LOT Polish Airlines', id: 6, groupId: 92, color: '#df5286' }
//   ];

  public allowMultiple: Boolean = true;
  public url = "10.120.18.8:1880"
 private timelineResourceData: DataManager = new DataManager({
    url: 'https://10.120.18.8:1880/timelineResourceData',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
 }); 

 public airCharge(){
    this.http.get(this.api.apiUrlNode1 + '/GetAirs')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: airline[]=[])=>{
      this.airline=res;
      // console.log('Airlines:', res  );
    });
  }

 public carruselCharge(){
    this.http.get(this.api.apiUrlNode1 + '/GetMakeUpListNew')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: carrusel[]=[])=>{
      this.car=res;
      // console.log('Carr:', res  );
    });
  }
  
  private resourceData: DataManager = new DataManager({
    url: 'https://10.120.18.8:1880/resourceDataNew',
    adaptor: new ODataV4Adaptor,
    crossDomain: true,
 });

  private resourceDatas: DataManager = new DataManager({
    url: 'https://10.120.18.8:1880/resourceDataNew',
    adaptor: new ODataV4Adaptor,
    crossDomain: false,
    offline: true,
 });   

 
public urls: string = 'https://10.120.18.8:1880';

 private dataManagers: DataManager = new DataManager({
  url: `${this.urls}/resourceDataNew`, // 'controller/actions'
  crudUrl: 'https://10.120.18.8:1880/ResourceDataUpdateNew',
  adaptor: new UrlAdaptor,
  crossDomain: false,
  // offline: true
});

  open(){
    const contador = interval(100000)
      contador.subscribe((n) => {
        this.eventSettings
        this.airCharge();
      console.log('testDivaces', this.eventSettings);
      });
      
  }

  public eventSettings: EventSettingsModel = { 
    
    // dataSource: this.dataManagers as unknown as Record<string, any>[],
    dataSource: this.dataManagers,
    enableTooltip: true, 
    // dataSource: <Object[]>extend(this.dataManagers, this.resourceDatas, false)
  
  };

  public onRenderCell(args: RenderCellEventArgs): void {
    
    if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
      const target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
      target.innerHTML = '<div class="text">Airline</div><div class="groupId">Make up</div><div class="color">color</div>';
    }
  }

// public dataQuery: Query = new Query().from("Events").addParams('readOnly', 'true');

//  public eventSettings: EventSettingsModel = {
//     dataSource:  this.resourceDatas,
//     enableTooltip: true,
//     query: this.dataQuery
//     // dataSource: <Object[]>extend(this.resourceData, null, true)
//     // fields: {
//     //     id: 'Id',
//     //     subject: { name: 'Flight', title: 'Vuelo' },
//     //     location: { name: 'ICAO' },
//     //     description: { name: 'DeviceId' },
//     //     startTime: { name: 'STD', title: 'Hora inicio'},
//     //     endTime: { name: 'ETD', title: 'Hora fin' },
//     // }

// };

onActionFailure(e: Error): void {
    alert('Server exception: 404 Not found');
    let span: HTMLElement = document.createElement('span');
    this.scheduleObj.element.parentNode.insertBefore(span, this.scheduleObj.element);
    span.style.color = '#FF0000'
    span.innerHTML = 'Server exception: 404 Not found';
 }

 public onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
  if (args.requestType === 'toolbarItemRendering') {
    const exportItem: ItemModel = {
      align: 'Right', showTextOn: 'Both', 
      text: 'Imprimir', cssClass: 'e-icons e-print', click: this.onPrintIconClick.bind(this)
    };
    args.items.push(exportItem);
  }
}

public onPrintIconClick(): void { 
  this.scheduleObj.print();
}

public onActionExcelBegin(args: ActionEventArgs & ToolbarActionArgs): void {
  if (args.requestType === 'toolbarItemRendering') {
    const exportItem: ItemModel = {
      align: 'Right', showTextOn: 'Both', 
      text: 'Exportar a Excel', cssClass: 'e-icons e-excel-export', click: this.onExportClick.bind(this)
    };
    args.items.push(exportItem);
  }
}
 
public onExportClick(): void {
  const exportValues: ExportOptions = { fields: ['Id', 'Subject', 'StartTime', 'EndTime'] };
  this.scheduleObj.exportToExcel(exportValues);
}

public onActionAddBegin(args: ActionEventArgs & ToolbarActionArgs): void {
  if (args.requestType === 'toolbarItemRendering') {
    const exportItem: ItemModel = {
      align: 'Left', showTextOn: 'Both', 
      text: 'Agregar', cssClass: 'e-icons e-print', click: this.openWindowForm.bind(this)
    };
    args.items.push(exportItem);
  }
}

openWindowForm() {
  this.windowService.open(WindowFormComponent, { title: `` });
}

//  editor(): void {
//   let cellData: Object = {
//       startTime: new Date(2018, 1, 15, 10, 0),
//       endTime: new Date(2018, 1, 15, 11, 0),
//   };
//   this.scheduleObj.openEditor(cellData,'Add');
//   }
//   eventEditor(): void {
//   let eventData: Object ={
//       Id: 4,
//       Subject: 'Meteor Showers in 2018',
//       StartTime: new Date(2018, 1, 14, 13, 0),
//       EndTime: new Date(2018, 1, 14, 14, 30)
//   };
//   this.scheduleObj.openEditor(eventData,'Save');
//   }

// public currentView: View = 'TimelineMonth';
//  onEventRendered(args: EventRenderedArgs): void {
//     const categoryColor: string = args.data.CategoryColor as string;
//     if (!args.element || !categoryColor) {
//         return;
//     }
//     if (this.currentView === 'Agenda') {
//         (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
//     } else {
//         args.element.style.backgroundColor = categoryColor;
//     }
// } 

ngOnDestroy() {
  this.alive = false;
}
  
}
