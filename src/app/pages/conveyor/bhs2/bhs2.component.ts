import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeWhile } from 'rxjs/operators';
import { Banda2, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from '../window/window.component';


 @Component({
  selector: 'ngx-bhs2',
  templateUrl: './bhs2.component.html',
  styleUrls: ['./bhs2.component.scss']
})
export class Bhs2Component implements OnInit {

  public zone: zons[] = [];

  public zons: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive=true;

  intervalSubscriptionStatusAlarm:Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService,
    public dial: WindowComponent) { }

  ngOnInit(): void {
    // this.banda2NameCharge();
    this.bandaNameCharge();
    // this.bandaNameXOCharge();
    // this.bandaStateCharge();
    this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }

  // public banda2NameCharge(){

  //   this.http.get(this.api.apiUrlNode1 + '/sf')
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any)=>{
  //     this.dataBanda2=res[0];
  //     console.log('data-banda2:', res);
      
  //   });

  // }

  public bandaNameCharge(){
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona1')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('Zons2:', res , 'band with zones', this.zone[1].Name);
      
    });
  }

  public bandaNameXOCharge(){
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona10')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zons=res;
      // console.log('Zons10:', res , 'band with zones', this.zone[1].Name);
      
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona1')
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
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona1')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  // ClicSS1_1() {
  //   debugger 
  //   this.dialog.opentest();
  //  }

  // SF1

  ClicSF1_4() {
    // debugger
    this.dialog.opendevice1(137);
    }
  ClicSF1_5() {
    this.dialog.opendevice2(130);
    }
  ClicSF1_6() {
    this.dialog.opendevice3(139);
      }
  ClicSF1_7() {
    this.dialog.opendevice4(133);
      }

  ClicSF1_8() {
    this.dialog.opendevice5(141);
      }

  ClicSF1_9() {
    this.dialog.opendevice6(142);
      }   
  
  ClicSF1_10() {
    this.dialog.opendevice7(132);
      }

  ClicSF1_11() {
    this.dialog.opendevice8(127);
      }

  ClicSF1_12() {
   this.dialog.opendevice9(135);
    }

  // SF2

  ClicSF2_4() {
    this.dialog.opendevice10(120);
      }

  ClicSF2_5() {
    this.dialog.opendevice11(114);
     }

  ClicSF2_6() {
    this.dialog.opendevice12(110);
    }

  ClicSF2_7() {
    this.dialog.opendevice13(122);
    }

  ClicSF2_8() {
    this.dialog.opendevice14(111);
    }

  ClicSF2_9() {
    this.dialog.opendevice15(117);
    }

  ClicSF2_10() {
    this.dialog.opendevice16(119);
    }

  ClicSF2_11() {
    this.dialog.opendevice17(113);
    }

  ClicSF2_12() {
   this.dialog.opendevice18(116);
    }

    // SF3

  ClicSF3_4() {
    this.dialog.opendevice19(138);
    }

  ClicSF3_5() {
   this.dialog.opendevice20(131);
   }

  ClicSF3_6() {
   this.dialog.opendevice21(134);
   }

  ClicSF3_7() {
   this.dialog.opendevice22(140);
    }

  ClicSF3_8() {
  this.dialog.opendevice23(129);
    }

  ClicSF3_9() {
  this.dialog.opendevice24(136);
   }

  ClicSF3_10() {
   this.dialog.opendevice25(143);
    }

  ClicSF3_11() {
   this.dialog.opendevice26(128);
    }

    // SF4

  ClicSF4_4() {
  this.dialog.opendevice27(121);
    }

  ClicSF4_5() {
   this.dialog.opendevice28(115);
    }

  ClicSF4_6() {
    this.dialog.opendevice29(123);
    }

  ClicSF4_7() {
    this.dialog.opendevice30(112);
    }

  ClicSF4_8() {
   this.dialog.opendevice31(118);
    }

  ClicSF4_9() {
    this.dialog.opendevice32(124);
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
