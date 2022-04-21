import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GanttComponent, ToolbarItem } from '@syncfusion/ej2-angular-gantt';
import { Gantt } from '@syncfusion/ej2-gantt';
import { customizedData } from './data';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { takeWhile } from 'rxjs/operators';

interface gantt {
  Id: number,
  taskName: string,
  Subject: string,
  StartTime: string,
  EndTime: string,
  make: string,
  taskID: string,
}

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
  // tslint:disable-next-line:component-selector
  selector: 'ngx-scheduler-sita', 
  templateUrl: './scheduler-sita.component.html', 
  // styleUrls: ['./scheduler-sita.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class SchedulerSitaComponent implements OnInit {
  // @ViewChild('gantt')
  //   public ganttObj: GanttComponent;
    public data: object[];
    public taskSettings: object;
    public resourceFields: object ;
    public columns: object[];
    public splitterSettings: object;
    public toolbar: string[];
    public editSettings: object;
    public labelSettings: object;
    public timelineSettings: object;
    public timezoneValue: string = 'UTC';
    public dayWorkingTime: object[];
    

    public ganttData: gantt[] = [];

    public car: carrusel [] = [];

    public airline: airline [] = [];

    private alive = true;

    public loading: boolean;

    constructor(public apiGetComp: ApiGetService,
      private http: HttpClient,
      private api: HttpService) {
       
        this.loading = true;
      }

       ngOnInit(): void {

        this.ChargeFunData();
          
          this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Agregar'];
  
          this.taskSettings = {
            id: 'taskID',
            name: 'taskName',
            startDate: 'StartTime',
            endDate: 'EndTime',
            duration: 'Duration',
            progress: 'Progress',
            datam: 'make',
            dependency:'Predecessor',
            child: 'Children',
        };
  
        this.columns =  [
                { field: 'taskID', visible: false },
                { field: 'make', headerText: 'MakeUp' },
                { field: 'taskName', headerText: 'Aerolinea' },
                { field: 'StartTime', headerText: 'Fecha' },
                { field: 'EndTime', headerText: 'Fecha End' },
                
            ];
  
      this.splitterSettings = {
        position: "35%"
    }
      this.resourceFields = {
        id: 'id',
        name: 'text'
    };
  
    this.labelSettings = {
      leftLabel: 'TaskName'
  };
  
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true
  };
  
          this.timelineSettings = {
              timelineUnitSize: 65,
              topTier: {
                  unit: 'Day',
                  format: 'MMM dd, yyyy'
              },
              bottomTier: {
                  unit: 'Hour',
                  format: 'hh:mm a'
              }
          };
          this.dayWorkingTime = [{ from: 0, to: 24 }];
  }
      
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

    ChargeFunData() {
      this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/resourceDataGantt').subscribe((res: any) => {
        this.ganttData = res;
        console.log("ganttData:", this.ganttData);
      });
      const contador = interval(60000)
      contador.subscribe((n) => {
        this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/resourceDataGantt').subscribe((res: any) => {
          //REPORTOCUPATION=res;
          this.ganttData = res;
        });
      });
  
    }

    ngOnDestroy() {
      this.alive = false;
    }

}
