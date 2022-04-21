import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeWhile } from 'rxjs/operators';
import { Banda8, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';

@Component({
  selector: 'ngx-bhs9',
  templateUrl: './bhs9.component.html',
  styleUrls: ['./bhs9.component.scss']
})
export class Bhs9Component implements OnInit {

  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive = true;

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService) { }

  ngOnInit(): void {
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas'],{skipLocationChange: true});
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

  public changeId(tea: any){
 
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId='+ tea)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.divice=res;
      // console.log('Zons:', res , 'states');
      
    });
  }

  public bandaStatesCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona2')
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
    
    this.intervalSubscriptionStatusAlarm = interval(6000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona2')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', this.states);
    });
  }

    ClicSS1_1() {
      this.dialog.opendevice1(166);
     }

     ClicSS1_2() {
      this.dialog.opendevice2(167);
     }

     ClicSS1_3() {
      this.dialog.opendevice3(171);
     }

     ClicSS1_4() {
      this.dialog.opendevice4(169);
     }

     ClicSS1_5() {
      this.dialog.opendevice5(168);
     }

     ClicSS1_6() {
      this.dialog.opendevice6(170);
     }

     ClicSS2_1() {
      this.dialog.opendevice7(159);
     }

     ClicSS2_2() {
      this.dialog.opendevice8(160);
     }

     ClicSS2_3() {
      this.dialog.opendevice9(158);
     }

     ClicSS2_4() {
      this.dialog.opendevice10(161);
     }

     ClicSS2_5() {
      this.dialog.opendevice11(165);
     }

     ClicSS2_6() {
      this.dialog.opendevice12(162);
     }

     ClicSS2_7() {
      this.dialog.opendevice13(163);
     }

     ClicSS2_8() {
      this.dialog.opendevice13(164);
     }

  ngOnDestroy() {
    this.alive = false;
  }

}
