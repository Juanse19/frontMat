import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sic-syncro',
  template: `<router-outlet>
    <h4>Scheduler</h4>
    <ngx-gantt></ngx-gantt>
  </router-outlet>`, 
})
export class SicSyncroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
