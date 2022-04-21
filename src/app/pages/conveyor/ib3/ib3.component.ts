import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { zons, teams, states } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, takeWhile } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';

@Component({
  selector: 'ngx-ib3',
  templateUrl: './ib3.component.html',
  styleUrls: ['./ib3.component.scss']
})
export class Ib3Component implements OnInit {

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
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona9')
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona9')
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
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona9')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  ClicIB3_1() {
    this.dialog.opendevice1(74);
    }

  ClicIB3_2() {
    this.dialog.opendevice2(75);
    }

  ClicIB3_3() {
    this.dialog.opendevice3(76);
    }

  ClicIB3_4() {
    this.dialog.opendevice4(77);
    }

  ClicIB3_5() {
    this.dialog.opendevice5(78);
    }

  ClicIB3_6() {
    this.dialog.opendevice6(79);
    }

  ClicIB3_7() {
    this.dialog.opendevice7(80);
    }

  ngOnDestroy() {
    this.alive = false;
  }

}
