import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeWhile } from 'rxjs/operators';
import { Banda5, zons, states, teams } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';

@Component({
  selector: 'ngx-bhs5',
  templateUrl: './bhs5.component.html',
  styleUrls: ['./bhs5.component.scss']
})
export class Bhs5Component implements OnInit {
 
  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive = true;

  intervalSubscriptionStatusAlarm: Subscription;
 
  @ViewChild(WindowComponent) dialog: WindowComponent;


  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService) { }

  ngOnInit(): void {
    // this.banda5NameCharge();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona12')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('Zons:', res );
      
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona12')
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
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona12')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:',  this.states );
    });
  }

  ClicSf1_1() { 
    this.dialog.opendevice1(148);
  }

  ClicSf1_2() {
    this.dialog.opendevice2(149);
  }

  ClicSf3_1() {
    this.dialog.opendevice3(150);
  }

  ClicSf3_2() {
    this.dialog.opendevice4(151);
  }

  ClicSf2_1() {
    this.dialog.opendevice5(152);
  }

  ClicSf2_2() {
    this.dialog.opendevice6(153);
  }

  ClicSf4_1() {
    this.dialog.opendevice7(154);
  }

  ClicSf4_2() {
    this.dialog.opendevice8(155);
  }

  ClicXO1_1() {
    this.dialog.opendevice9(156);
  }

  ClicXO2_1() {
    this.dialog.opendevice10(157);
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
