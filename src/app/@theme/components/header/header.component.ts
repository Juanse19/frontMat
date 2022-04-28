/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit, Injectable } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserStore } from '../../../@core/stores/user.store';
import { SettingsData } from '../../../@core/interfaces/common/settings';
import { User, UserData } from '../../../@core/interfaces/common/users';
import {WindowComponentAlarm} from '../../../pages/dashboard/alarmPopup/alarmPopup.component';
import { SignalRService } from '../../../pages/dashboard/services/signal-r.service';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiGetService } from '../../../pages/dashboard/OrderPopup/apiGet.services';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
@Injectable({
  providedIn: 'root',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public numeroAlarmas = '0';
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;
  sicProcess: boolean = true;
    public select = false;
    private alive = true;
    mostrar: Boolean;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

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
              private comp3: WindowComponentAlarm,
              private router: Router,
              private http: HttpClient,
              private apiGetComp: ApiGetService,
              private api: HttpService,
              public sigalRService: SignalRService) {

                this.accessChecker.isGranted('edit', 'ordertable').subscribe((res: any) => {
                  if (res) { 
                    this.select = false;
                    this.mostrar = false;
                  } else {
                    this.select = true;
                    this.mostrar = true;
                  }
                });

  }

  getMenuItems() {
    const userLink = this.user ?  '/pages/users/current/' : '';
    return [
      { title: 'Perfil', link: userLink, queryParams: { profile: true } },
      { title: 'Cerrar Sesión', link: '/auth/logout' },
    ];
  }

  ngOnInit() {

    

    // this.sigalRService.startConnectionAlarmas();
      // this.startHttpRequestAlarmas();  
      this.sigalRService.GetDataAlarmManual();

    this.currentTheme = this.themeService.currentTheme;

    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: User) => {
        this.user = user;
        this.userMenu = this.getMenuItems();
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.sigalRService.aliveAlarm = false;
  }

  changeTheme(themeName: string) {
    this.userStore.setSetting(themeName);
    this.settingsService.updateCurrent(this.userStore.getUser().settings)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.themeService.changeTheme(themeName);
  }

  private startHttpRequestAlarmas() {    
    this.http.get(this.api.apiUrlMatbox + '/sralarms')
    .subscribe(res => {
      // console.log(res);
    });
      }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    this.router.navigate(['/pages/iot-dashboard']);
    return false;
  }
  // AbrirAlarmas(){
  //  this.comp3.openWindowForm("Alarmas","");
  // }

  AbrirAlarms() {
    this.router.navigate(['/pages/tables/alarms/']);
  }

  Actualizar() {
    Swal.fire({
      title: 'Desea sincronizar?',
      text: `¡Sincronizara Syncro y Sic!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Sincronizar!',
    }).then(result => {
      if (result.value) {
        // this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/SyncOrder')
        // .subscribe((res: any) => {
        //   console.log('Sic: ',res);
        //   this.sicProcess = res;
        //   Swal.fire('¡Se sincronizo Exitosamente', 'success');
        // });
    //   this.http.get(this.api.apiUrlMatbox + "/Orders/SyncOrder")
    //   .subscribe((res:any)=>{
    //   Swal.fire('¡Se sincronizo Exitosamente', 'success');
    // });
    // Swal.fire('¡Se sincronizo Exitosamente', 'success');

    // let users = {user: event.user.id};
  const currentUserId = this.userStore.getUser().firstName;
  // console.log("este es el usuario: ",this.userStore.getUser().firstName);
  let respons = {
    user: currentUserId,
    message: 'Sincronización de ordenes',
};
  this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Alarms/postSaveAlarmUser', respons)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
        //  console.log("Envió: ", res);
      });

    this.http.get(this.api.apiUrlMatbox + '/Orders/SyncOrder', { observe: 'response' })
  .pipe()
  .subscribe(user => {
    if (user.status === 200 ) { 
      // console.log("es: ", true)
      // let users = {user: event.user.id};
      // this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Alarms/postSaveAlarmUser?user='+ event.user.id, '&message=' + "Se sincronizo Exitosamente")
      // .pipe(takeWhile(() => this.alive))
      // .subscribe((res: any) => {
      //   //  console.log("alarmId", res);
        
      // });
    } else {
      console.log(false);
    }
  } , err => console.log(err));
  
  Swal.fire('¡Se sincronizo Exitosamente', 'success');
      }
    });
    
  }

}
