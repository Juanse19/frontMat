import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../@core/backend/common/api/http.service';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'ngx-zoneTeams',
  template: `
      <!-- <app-home></app-home> -->
      
      <router-outlet > </router-outlet>

  `,
})
export class ZoneTeamsComponent implements OnDestroy {


  alive: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
      private api: HttpService,
  ) {

  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.alive = false;
  }

}