import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeWhile } from 'rxjs/operators';
import { Banda3, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'ngx-bhs3',
  templateUrl: './bhs3.component.html',
  styleUrls: ['./bhs3.component.scss']
})
export class Bhs3Component implements OnInit {

  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive = true;

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;
 
  // public dataBanda3: Banda3 = {
  //   b1: "",
  //   b2: "",
  //   b3: "",
  //   b4: "",
  //   b5: "",
  //   b6: "",
  //   b7: "",
  //   b8: "",
  //   b9: "",
  //   b10: "",
  //   }

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService) { }

  ngOnInit(): void {
    // this.banda3NameCharge();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }

  // public banda3NameCharge(){

  //   this.http.get(this.api.apiUrlNode1 + '/mu')
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any)=>{
  //     this.dataBanda3=res[0];
  //     console.log('data-banda4:', res);
      
  //   });
  // }

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona6')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('Zons3:', res , 'band with zones', this.zone[1].Name);
      
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona6')
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
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona6')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  //MU1

  ClicMU1_1() {
    this.dialog.opendevice1(82);
    }

  ClicMU1_2() {
    this.dialog.opendevice2(86);
    }

  ClicMU1_3() {
    this.dialog.opendevice3(85);
    }

  ClicMU1_4() {
    this.dialog.opendevice4(87);
    }

  ClicMU1_5() {
    this.dialog.opendevice5(83);
    }

    // MU2

  ClicMU2_1() {
    this.dialog.opendevice6(91);
    }

  ClicMU2_2() {
    this.dialog.opendevice7(89);
    }

  ClicMU2_3() {
    this.dialog.opendevice8(88);
    }

  ClicMU2_4() {
    this.dialog.opendevice9(90);
    }

  ClicMU2_5() {
    this.dialog.opendevice10(92);
    }

  ngOnDestroy() {
    this.alive = false;
  }

}
