import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeWhile } from 'rxjs/operators';
import { Banda2, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';

@Component({
  selector: 'ngx-bhs10',
  templateUrl: './bhs10.component.html',
  styleUrls: ['./bhs10.component.scss']
})
export class Bhs10Component implements OnInit {

  public zone: zons[] = [];

  public zons: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive=true;

  intervalSubscriptionStatusAlarm:Subscription;

  @ViewChild(WindowComponent) dialog: WindowComponent;

  constructor(private router: Router,
    private http: HttpClient,
    private api: HttpService) { }

  ngOnInit(): void {
    this.bandaNameXOCharge();
    this.bandaNameCharge();
    this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas'],{skipLocationChange: true});
    return false;
  }

  public bandaNameXOCharge(){
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona10')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zons=res;
      // console.log('Zons10:', res );
      
    });
  }

  public bandaNameCharge(){
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona1')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('Zons2:', res , 'band with zones', this.zone[1].Name);
      
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona10')
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
    
    this.intervalSubscriptionStatusAlarm = interval(40000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona10')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  ClicXO1() {
    this.dialog.opendevice1(125);
    }

  ClicXO2() {
    this.dialog.opendevice2(126);
    }

   ClicXO3() {
     this.dialog.opendevice3(53);
    }

    ClicXO4() {
      this.dialog.opendevice4(54);
     }

  ngOnDestroy() {
    this.alive = false;
  }

}
