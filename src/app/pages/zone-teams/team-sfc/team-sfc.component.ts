import { Component, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { Router } from "@angular/router";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-teamSfc",
  template: `
    <router-outlet>
    <nb-card>
      <nb-card-header>
      <nav class="navigation">
            <a href="#" (click)="back()" class="link back-link" aria-label="Back">
                <nb-icon icon="arrow-back"></nb-icon>
            </a>
            <h5 class="h">SECURITY FEED CHECK-IN</h5>
        </nav>
      </nb-card-header>
        <!-- <div class="container"> -->
          <nb-card-body>
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-3">
            <ngx-sf1_1></ngx-sf1_1>
          </div>
          <div class="col-sm-3">
            <ngx-sf1_2></ngx-sf1_2>
          </div>
          <div class="col-sm-3">
            <ngx-sf3_1></ngx-sf3_1>
          </div>
          <div class="col-sm-3">
            <ngx-sf3_2></ngx-sf3_2>
          </div>
          <div class="col-sm-3">
            <ngx-cs1_3></ngx-cs1_3>
          </div>
          <div class="col-sm-3">
            <ngx-cs1_4></ngx-cs1_4>
          </div>
          <div class="col-sm-3">
            <ngx-cs1_5></ngx-cs1_5>
          </div>
          <div class="col-sm-3">
            <ngx-cs1_6></ngx-cs1_6>
          </div>
          <div class="col-sm-3">
            <ngx-cs1_7></ngx-cs1_7>
          </div>
          <div class="col-sm-3">
            <ngx-cs3_3></ngx-cs3_3>
          </div>
          <div class="col-sm-3">
            <ngx-cs3_4></ngx-cs3_4>
          </div>
          <div class="col-sm-3">
            <ngx-cs3_5></ngx-cs3_5>
          </div>
          <div class="col-sm-3">
            <ngx-cs3_6></ngx-cs3_6>
          </div>
          <div class="col-sm-3">
            <ngx-cs3_7></ngx-cs3_7>
          </div>

          <!-- <div class="control-section">
          <div class="row">
          <div class="col-sm-12">
            <ngx-cs1></ngx-cs1>
          </div>
          </div>
          </div> -->
        </div>
      </div>
</nb-card-body>
      <!-- </div> -->

    </nb-card>

    <style>
      .h {
    margin: -1.8rem 0.19rem 0.0rem 2.7rem;
}
    </style>

    </router-outlet>
  `,
  
})
export class TeamSfcComponent implements OnDestroy {
  alive: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: HttpService
  ) {}

  ngOnInit(): void {}

  back() {
    this.router.navigate(['/pages/conveyor/energyZone']);
    return false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
