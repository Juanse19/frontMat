import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: "ngx-gantt",
    template: `
      <router-outlet>
        <!-- <ngx-schedulergantt></ngx-schedulergantt> -->
    </router-outlet>
    `,
    // changeDetection: ChangeDetectionStrategy.OnPush,
  })

  export class GanttScheduleComponent implements OnInit {
 

    constructor(
    ) {}
  
    ngOnInit(): void {}
  
   
  }