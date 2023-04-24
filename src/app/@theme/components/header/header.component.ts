import { HttpErrorResponse } from "@angular/common/http";
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit, Injectable } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { LayoutService } from "../../../@core/utils";
import { catchError, map, takeUntil, takeWhile, delay, retryWhen ,take } from "rxjs/operators";
import { of, Subject, Subscription, throwError, interval } from "rxjs";
import { UserStore } from "../../../@core/stores/user.store";
import { SettingsData } from "../../../@core/interfaces/common/settings";
import { User, UserData } from "../../../@core/interfaces/common/users";
import { SignalRService } from "../../../pages/dashboard/services/signal-r.service";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
// import Swal from "sweetalert2";
import { ApiGetService } from "../../../pages/dashboard/OrderPopup/apiGet.services";
import { NbAccessChecker } from "@nebular/security";
import { NbMenuItem, NbToastrService } from "@nebular/theme";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { MessageService } from "../../../pages/dashboard/services/MessageService";
import { environment } from "../../../../environments/environment";
export const WS_ENDPOINT = environment.urlWebSocket;

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
@Injectable({
  providedIn: "root",
})
export class HeaderComponent implements OnInit, OnDestroy {
  public numeroAlarmas = "0";
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;
  sicProcess: boolean = true;
  public select = false;
  private alive = true;
  mostrar: Boolean;
  public index: number = null;
  public contAlarm: string;
  subscription: Subscription;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";

  userMenu = this.getMenuItems();

  constructor(
    public accessChecker: NbAccessChecker,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userStore: UserStore,
    private usersService: UserData,
    private settingsService: SettingsData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
    private http: HttpClient,
    private apiGetComp: ApiGetService,
    private api: HttpService,
    public sigalRService: SignalRService,
    private toastrService: NbToastrService,
    private messageService: MessageService
  ) {
    this.count();
    this.accessChecker.isGranted("edit", "ordertable").subscribe((res: any) => {
      if (res) {
        this.select = false;
        this.mostrar = false;
      } else {
        this.select = true;
        this.mostrar = true;
      }
    });
    this.loadData();
  }

  loadData() {
    this.subscription = this.messageService
      .onMessage()
      .pipe(takeWhile(() => this.alive))
      .subscribe((message) => {
        if (message.text == "PackageUpdate") {
          this.index = null;
          // console.log('Cargo exitosamente..!');
        }
      });
  }

  getMenuItems() {
    const userLink = this.user ? "/pages/users/current/" : "";
    return [
      { title: "Perfil", link: userLink, queryParams: { profile: true } },
      { title: "Cerrar Sesión", link: "/auth/logout" },
    ];
  }

  ngOnInit() {
    this.wSocket();

    // this.sigalRService.startConnectionAlarmas();
    // this.startHttpRequestAlarmas();
    // this.sigalRService.GetDataAlarmManual();

    this.currentTheme = this.themeService.currentTheme;

    this.userStore
      .onUserStateChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.user = user;
        this.userMenu = this.getMenuItems();
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  changeTheme(themeName: string) {
    this.userStore.setSetting(themeName);
    this.settingsService
      .updateCurrent(this.userStore.getUser().settings)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    this.router.navigate(["/pages/iot-dashboard"]);
    return false;
  }

  AbrirAlarms() {
    this.router.navigate(["/pages/tables/alarms/"]);
    this.index = null;
    localStorage.removeItem("Alarmas");
  }

  // myWebSocket: WebSocketSubject<any> = webSocket('ws://10.120.18.15:1880/wc/alarms');
  myWebSocket: WebSocketSubject<any> = webSocket(WS_ENDPOINT);

  count() {
    //this.contAlarm = localStorage.getItem("Alarmas");
    //console.log("AcumuAlarm", this.contAlarm);
  }



  wSocket() {

    // const contador = interval(5000);

    // this.myWebSocket.subscribe({
    //   next: msg => {
    //     console.log('message received: ' + msg) // Called whenever there is a message from the server.
    //     console.log("Conectado");

    //     this.index += 1;
    //     localStorage.setItem("Alarmas", JSON.stringify(this.index));
    //     console.log("Acumulador", this.index);

    //     this.count();

    //     if (
    //       msg.payload === 0 ||
    //       msg.payload === 1 ||
    //       msg.payload === 2 ||
    //       msg.payload === 6 ||
    //       msg.payload === 21
    //     ) {
    //       let duration = 6000;
    //       this.toastrService.success(msg.topic, msg.message, { duration });
    //     } else if (msg.payload === 3 || msg.payload === 9) {
    //       let duration = 6000;
    //       this.toastrService.danger(msg.topic, msg.message, { duration });
    //     } else if (
    //       msg.payload === 4 ||
    //       msg.payload === 4 ||
    //       msg.payload === 7 ||
    //       msg.payload === 8 ||
    //       msg.payload === 20
    //     ) {
    //       let duration = 6000;
    //       this.toastrService.warning(msg.topic, msg.message, { duration });
    //     }
    //   }
    //   ,error: err => {
    //     console.log(err) // Called if at any point WebSocket API signals some kind of error.
    //   }
    //   ,complete: () =>{
    //     console.log('complete') // Called when connection is closed (for whatever reason).
    //   }
    //  });
    const subcription1 = this.myWebSocket
    .pipe(
      // concatMap((item) => of (item).pipe(delay(1000))) 
      retryWhen(errors => errors.pipe(delay(1000), take(10))),
      

    )
    .subscribe(
      (msg) => {
        console.log("Conectado");

         this.index += 1;
         localStorage.setItem("Alarmas", JSON.stringify(this.index));
       // console.log("Acumulador", this.index);

         this.count();

        // if (
        //   msg.payload === 0 ||
        //   msg.payload === 1 ||
        //   msg.payload === 2 ||
        //   msg.payload === 6 ||
        //   msg.payload === 21
        // ) {
        //   let duration = 6000;
        //   this.toastrService.success(msg.topic, msg.message, { duration });
        // } else if (msg.payload === 3 || msg.payload === 9) {
        //   let duration = 6000;
        //   this.toastrService.danger(msg.topic, msg.message, { duration });
        // } else if (
        //   msg.payload === 4 ||
        //   msg.payload === 4 ||
        //   msg.payload === 7 ||
        //   msg.payload === 8 ||
        //   msg.payload === 20
        // ) {
        //   let duration = 6000;
        //   this.toastrService.warning(msg.topic, msg.message, { duration });
        // }
      },
      (err) => {
        this.toastrService.danger(err.type, "Error de conexión del WebSocket", {
          duration: 30000,
        });
      },
      () => {
        console.log("complete");
      }
    );

    // contador.subscribe((n) => {
    //   if (this.myWebSocket.complete) {
    //     this.myWebSocket;
    //     console.log(`Reconectador:  ${this.index}`);
    //   }
    // });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.sigalRService.aliveAlarm = false;
    this.myWebSocket.complete();
  }
}
