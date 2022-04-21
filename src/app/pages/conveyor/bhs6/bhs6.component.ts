import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeWhile } from 'rxjs/operators';
import { Banda6, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';

@Component({
  selector: 'ngx-bhs6',
  templateUrl: './bhs6.component.html',
  styleUrls: ['./bhs6.component.scss']
}) 
export class Bhs6Component implements OnInit {

  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive = true;

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  // public dataBanda6: Banda6 = {
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
  //   b11: "",
  //   b12: "",
  //   b13: "",
  //   b14: "",
  //   b15: "",
  //   b16: "",
  //   b17: "",
  //   b18: "",
  //   b19: "",
  //   b20: "",
  //   b21: "",
  //   b22: "",
  //   b23: "",
  //   b24: "",
  //   b25: "",
  //   b26: "",
  //   b27: "",
  //   b28: "",
  //   b29: "",
  //   b30: "",
  //   b31: "",
  //   b32: "",
  //   b33: "",
  //   b34: "",
  //   b35: "",
  //   b36: "",
  //   }

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService) { }

  ngOnInit(): void {
    // this.banda6NameCharge();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }

  // public banda6NameCharge(){

  //   this.http.get(this.api.apiUrlNode1 + '/cl')
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any)=>{
  //     this.dataBanda6=res[0];
  //     console.log('data-banda6:', res);
      
  //   });

  // }

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona4')
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona4')
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
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona4')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  //CL1

  ClicCL1_1() {
    this.dialog.opendevice1(30);
    }

  ClicCL1_2() {
    this.dialog.opendevice2(22);
    }

  ClicCL1_3() {
    this.dialog.opendevice3(19);
    }

  ClicCL1_4() {
    this.dialog.opendevice4(25);
    }

  ClicCL1_5() {
    this.dialog.opendevice5(24);
    }

  ClicCL1_6() {
    this.dialog.opendevice6(29);
    }

  ClicCL1_7() {
    this.dialog.opendevice7(23);
    }

  ClicCL1_8() {
    this.dialog.opendevice8(26);
    }

  ClicCL1_9() {
    this.dialog.opendevice9(18);
    }

  ClicCL1_10() {
    this.dialog.opendevice10(20);
   }

  ClicCL1_11() {
    this.dialog.opendevice11(27);
  }

  ClicCL1_12() {
    this.dialog.opendevice12(33);
    }

  ClicCL1_13() {
    this.dialog.opendevice13(28);
    }

  ClicCL1_14() {
    this.dialog.opendevice14(16);
    }

  ClicCL1_15() {
    this.dialog.opendevice15(17);
    }

  ClicCL1_16() {
    this.dialog.opendevice16(21);
    }

  ClicCL1_17() {
    this.dialog.opendevice17(31);
    }

  ClicCL1_18() {
    this.dialog.opendevice18(32);
    }

  // CL2

  ClicCL2_1() {
    this.dialog.opendevice19(34);
    }

  ClicCL2_2() {
    this.dialog.opendevice20(48);
    }

  ClicCL2_3() {
    this.dialog.opendevice21(37);
    }

  ClicCL2_4() {
    this.dialog.opendevice22(49);
    }

  ClicCL2_5() {
    this.dialog.opendevice23(38);
    }

  ClicCL2_6() {
    this.dialog.opendevice24(39);
    }

  ClicCL2_7() {
    this.dialog.opendevice25(51);
    }

  ClicCL2_8() {
    this.dialog.opendevice26(40);
    }

  ClicCL2_9() {
    this.dialog.opendevice27(50);
    }

  ClicCL2_10() {
    this.dialog.opendevice28(46);
   }

  ClicCL2_11() {
    this.dialog.opendevice29(41);
  }

  ClicCL2_12() {
    this.dialog.opendevice30(52);
    }

  ClicCL2_13() {
    this.dialog.opendevice31(43);
    }

  ClicCL2_14() {
    this.dialog.opendevice32(35);
    }

  ClicCL2_15() {
    this.dialog.opendevice33(36);
    }

  ClicCL2_16() {
    this.dialog.opendevice34(47);
    }

  ClicCL2_17() {
    this.dialog.opendevice35(44);
    }

  ClicCL2_18() {
    this.dialog.opendevice36(32);
    }

  ngOnDestroy() {
    this.alive = false;
  }
  
}
