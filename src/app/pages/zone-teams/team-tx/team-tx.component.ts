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
            <h5 class="h">TRANSFER LINE</h5>
          </nav>
        </nb-card-header>
        <nb-card-body>
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
export class TeamTXComponent implements OnDestroy {
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
