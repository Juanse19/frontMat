import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeWhile } from 'rxjs/operators';
import { Banda7, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { GridComponent, PageSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { WindowComponent } from './../window/window.component';

// export interface bhsosr {
//   Bagtag: string;
//   BagId: string;
//   Device: string;
//   Log: string;
// }

export interface bhsosr {
  ATR: string,
  Id: number,
  BagId: number,
  BagTag: number,
}

@Component({
  selector: 'ngx-bhs7',
  templateUrl: './bhs7.component.html',
  styleUrls: ['./bhs7.component.scss']
})
export class Bhs7Component implements OnInit {

  public zone: zons[] = [];

  public zons: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  public osrData: bhsosr[] = [];

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  private alive = true;

  intervalSubscriptionStatusAlarm: Subscription;

  public loading: boolean;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService) { 
      this.loading = true;
     }

  ngOnInit(): void {
    // this.bandaNameCharge();
    this.bandaNameOsrCharge();
    this.chargeData();
    // this.bandaStateCharge();
    this.bandaStatesCharge();
    this.pageSettings = { 
      // pageSizes: true,
      pageSize: 5 };
    this.filterOptions = {
      type: 'Menu',
   };
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona2')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('ss:', res , 'band with zones', this.zone[1].Name);
      
    });

  }

  public bandaNameOsrCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona3')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zons=res;
      // console.log('Osr:', res , 'band with zones', this.zons[1].Name);
      
    });

  }

  public changeId(tea: any){
 
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId='+ tea)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.divice=res;
      // console.log('Zons:', res , 'states');
      
    });
  }

  public bandaStatesCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona3')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:any)=>{
      this.states  = res;
      this.bandaStateCharge();
      // console.log('static:', this.states);
    });
  }

  public bandaStateCharge(){

    if (this.intervalSubscriptionStatusAlarm) {
      this.intervalSubscriptionStatusAlarm.unsubscribe();
    }
    
    this.intervalSubscriptionStatusAlarm = interval(8000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona3')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  chargeData() {
    this.http.get(this.api.apiUrlNode1 + '/apiTracking')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      // tslint:disable-next-line: no-console
      // console.log('bhsOsrData: ', res);
      this.loading = false;
      this.osrData = res;
    });
    const contador = interval(50000)
    contador.subscribe((n) => {
      this.http.get(this.api.apiUrlNode1 + '/apiTracking')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.osrData = res;
        this.loading = false;
      });
    });
  }

  //OSR1

  ClicOSR1_1() {
    this.dialog.opendevice1(106);
    }

  ClicOSR1_2() {
    this.dialog.opendevice2(107);
    }

  ClicOSR1_3() {
     this.dialog.opendevice3(105);
    }

  ClicOSR1_4() {
      this.dialog.opendevice4(108);
     }

  ClicOSR1_5() {
    this.dialog.opendevice5(109);
    }
  
  ClicOSR1_6() {
    this.dialog.opendevice6(104);
    }

    //OSR2
  
  ClicOSR2_1() {
    this.dialog.opendevice7(98);
    }
  
  ClicOSR2_2() {
    this.dialog.opendevice8(99);
    }

  ClicOSR2_3() {
    this.dialog.opendevice9(102);
    }

  ClicOSR2_4() {
    this.dialog.opendevice10(100);
    }

  ClicOSR2_5() {
    this.dialog.opendevice11(101);
    }

  ClicOSR2_6() {
    this.dialog.opendevice12(103);
    }

  ngOnDestroy() {
    this.alive = false;
  }

}
