import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../@core/backend/common/api/http.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-energyTeam',
    template: `
        
        <router-outlet >
        <div class="col-12">
        <nb-card size="small" style="height: auto;">
        <nb-tabset fullWidth>
        <nb-tab tabTitle="BHS Salidas">
          <ngx-salidas-bhs></ngx-salidas-bhs>
        </nb-tab>
        <nb-tab tabTitle="BHS Llegadas">
          <ngx-llegadas-bhs></ngx-llegadas-bhs>
        </nb-tab>
      </nb-tabset>
    </nb-card>
  </div>
            
        </router-outlet>
  
    `,
  })
  export class EnergyTeamComponent implements OnDestroy {
  
  
    alive?: boolean = true;
  
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