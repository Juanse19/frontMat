import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { projectNewData } from './data';
import { Gantt } from '@syncfusion/ej2-gantt';

@Component({
  selector: 'ngx-gantt',
  templateUrl: './gantt.component.html',
  encapsulation: ViewEncapsulation.None
  // styleUrls: ['./gantt.component.scss']
})
export class GanttComponent {

    // public data!: object[];
    // public taskSettings: object;
    // public columns: object[];
    // public labelSettings!: object;
    // public projectStartDate!: Date;
    // public projectEndDate!: Date;
    // public ngOnInit(): void {
    //     this.data = projectNewData;
    //     this.taskSettings = {
    //         id: 'TaskID',
    //         name: 'TaskName',
    //         startDate: 'StartDate',
    //         endDate: 'EndDate',
    //         duration: 'Duration',
    //         progress: 'Progress',
    //         dependency: 'Predecessor',
    //         child: 'subtasks'
    //     };
    //     this.columns =  [
    //         { field: 'TaskID', width:80 },
    //         { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
    //         { field: 'StartDate' },
    //         { field: 'Duration' },
    //         { field: 'Progress' },
    //         { field: 'Predecessor' }
    //     ];
    //     this.projectStartDate = new Date('03/24/2019');
    //     this.projectEndDate = new Date('07/06/2019');
    //     this.labelSettings = {
    //         leftLabel: 'TaskName',
    //     };
    // }
    
    public data!: object[];
public taskSettings!: object;
 public timelineSettings!: object;

public ngOnInit(): void {
    this.data = [
    {
        TaskID: 1,
        TaskName: 'Project Initiation',
        StartDate: new Date('04/02/2019'),
        EndDate: new Date('04/21/2019'),
        isParent:true,
        subtasks: [
            { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 2, Progress: 50,isParent:false },
            { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 2, Progress: 50, resources: [2, 3, 5],isParent:false   },
            { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 2,Predecessor:"2FS", Progress: 50,isParent:false  },
        ]
    },
];
    this.taskSettings = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    this.timelineSettings = {
        timelineViewMode:'Day',
    };
}

}
