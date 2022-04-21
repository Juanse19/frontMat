import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { zons, teams, states } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, takeWhile } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';

@Component({
  selector: 'ngx-ib1',
  templateUrl: './ib1.component.html',
  styleUrls: ['./ib1.component.scss']
})
export class Ib1Component implements OnInit {

  private alive=true;

  public divice: teams[] = [];

  public zone: zons[] = [];

  public states: states [] = [];

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  constructor(private router: Router,
    private http: HttpClient,
    private api: HttpService) { }

  ngOnInit(): void {
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/info'],{skipLocationChange: true});
    return false;
  }

  public bandaNameCharge(){
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona7')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('bandaIB1:', res , 'band with zones', this.zone[1].idEquipo);
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona7')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:any)=>{
      this.states  = res;
      this.bandaStateCharge();
      console.log('static:', this.states);
    });
  }

  public bandaStateCharge(){

    if (this.intervalSubscriptionStatusAlarm) {
      this.intervalSubscriptionStatusAlarm.unsubscribe();
    }
    
    this.intervalSubscriptionStatusAlarm = interval(8000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona7')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  ClicIB1_1() {
    this.dialog.opendevice1(55);
    }

  ClicIB1_2() {
    this.dialog.opendevice2(56);
    }

  ClicIB1_3() {
    this.dialog.opendevice3(57);
    }

  ClicIB1_4() {
    this.dialog.opendevice4(58);
    }

  ClicIB1_5() {
    this.dialog.opendevice5(59);
    }

  ClicIB1_6() {
    this.dialog.opendevice6(60);
    }

  ClicIB1_7() {
    this.dialog.opendevice7(61);
    }

  ClicIB1_8() {
    this.dialog.opendevice8(62);
    }

  ClicIB1_9() {
    this.dialog.opendevice9(194);
    }

  ngOnDestroy() {
    this.alive = false;
  }

}
