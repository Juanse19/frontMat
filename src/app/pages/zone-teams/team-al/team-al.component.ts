import { Component, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-teamAL",
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
            <h5 class="h">ALARM LINE</h5>
          </nav>
        </nb-card-header>
        <!-- <nb-card-body>
          <div class="contenedor">
            <img
              src="./assets/img/construction.gif"
              class="align-self-center"
              width="100%"
              height="80%"
              style="margin-top: -140px; margin-left: 128px"
            />
            <div class="centrado">
              <font size="4">Sitio en Construcción</font>
            </div>
          </div>
        </nb-card-body> -->

        <nb-card-body>
            <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-3">
                  <ngx-al1_1></ngx-al1_1>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_2></ngx-al1_2>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_3></ngx-al1_3>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_4></ngx-al1_4>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_5></ngx-al1_5>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_6></ngx-al1_6>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_7></ngx-al1_7>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_8></ngx-al1_8>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_9></ngx-al1_9>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_10></ngx-al1_10>
                </div>
                <div class="col-sm-3">
                  <ngx-al1_11></ngx-al1_11>
                </div>
                <div class="col-sm-3">
                  <ngx-al2_1></ngx-al2_1>
                </div>
                <div class="col-sm-3">
                  <ngx-al2_2></ngx-al2_2>
                </div>
                <div class="col-sm-3">
                  <ngx-al2_3></ngx-al2_3>
                </div>
                <div class="col-sm-3">
                  <ngx-al2_4></ngx-al2_4>
                </div>
              </div>
            </div>
        </nb-card-body>

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
export class TeamALComponent implements OnDestroy {
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
