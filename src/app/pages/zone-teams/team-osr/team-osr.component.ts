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
            <a
              href="#"
              (click)="back()"
              class="link back-link"
              aria-label="Back"
            >
              <nb-icon icon="arrow-back"></nb-icon>
            </a>
            <h5 class="h">ON SCREEN RESOLUTION LINE</h5>
          </nav>
        </nb-card-header>
        <div class="container">
          <nb-card-body>
            <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-4">
                  <ngx-osr1_1></ngx-osr1_1>
                </div>
                <div class="col-sm-4">
                  <ngx-osr1_2></ngx-osr1_2>
                </div>
                <div class="col-sm-4">
                  <ngx-osr1_3></ngx-osr1_3>
                </div>
                <div class="col-sm-4">
                  <ngx-osr1_4></ngx-osr1_4>
                </div>
                <div class="col-sm-4">
                  <ngx-osr1_5></ngx-osr1_5>
                </div>
                <div class="col-sm-4">
                  <ngx-osr1_6></ngx-osr1_6>
                </div>
              </div>
            </div>
          </nb-card-body>
        </div>
        <style>
          
          .h {
            margin: -1.8rem 0.19rem 0rem 2.7rem;
          }
        </style>
      </nb-card>
    </router-outlet>
  `,
})
export class TeamOsrComponent implements OnDestroy {
  alive: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private api: HttpService
  ) {}

  ngOnInit(): void {}

  back() {
    this.router.navigate(["/pages/conveyor/energyZone"]);
    return false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
