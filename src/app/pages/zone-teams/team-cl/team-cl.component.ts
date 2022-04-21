import { Component, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-teamCL",
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
            <h5 class="h">CLEAR LINE</h5>
          </nav>
        </nb-card-header>
        <div class="container">
          <nb-card-body>
            <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-4">
                  <ngx-cl1_1></ngx-cl1_1>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_2></ngx-cl1_2>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_3></ngx-cl1_3>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_4></ngx-cl1_4>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_5></ngx-cl1_5>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_6></ngx-cl1_6>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_7></ngx-cl1_7>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_8></ngx-cl1_8>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_9></ngx-cl1_9>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_10></ngx-cl1_10>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_11></ngx-cl1_11>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_12></ngx-cl1_12>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_13></ngx-cl1_13>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_14></ngx-cl1_14>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_15></ngx-cl1_15>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_16></ngx-cl1_16>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_17></ngx-cl1_17>
                </div>
                <div class="col-sm-4">
                  <ngx-cl1_18></ngx-cl1_18>
                </div>
              </div>
            </div>
          </nb-card-body>
        </div>

        <style>
          .contenedor {
            position: relative;
            display: inline-block;
            text-align: center;
          }

          .centrado {
            position: absolute;
            font-size: 10px;
            font-family: cursive;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .h {
            margin: -1.8rem 0.19rem 0rem 2.7rem;
          }
        </style>
      </nb-card>
    </router-outlet>
  `,
})
export class TeamclComponent implements OnDestroy {
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
