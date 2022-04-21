import { Component, OnInit, ViewChild } from '@angular/core'; 
import { NbPopoverDirective } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { delay, map, takeUntil, takeWhile, timeout,switchMap } from 'rxjs/operators';
import { Banda4, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';

let te: teams;
{

}
@Component({
  selector: 'ngx-bhs4',
  templateUrl: './bhs4.component.html',
  styleUrls: ['./bhs4.component.scss']
})
export class Bhs4Component implements OnInit {

  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive=true;
  
  team: teams[] = [];
  
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  tea = te;

  intervalSubscriptionStatusAlarm:Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: HttpService) { }

  ngOnInit(): void {
    // this.banda4NameCharge();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.bandaStatesCharge();
    // this.ChangeTeam();
    // this.teamsCharge();
    // this.bandaCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }


  // public banda4NameCharge(){

  //   this.http.get(this.api.apiUrlNode1 + '/al')
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any)=>{
  //     this.dataBanda4=res[0];
  //     console.log('data-banda4:', res);
      
  //   });

  // }

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona5')
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona5')
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
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona5')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  ClicAL1_1() {
    // // debugger
    this.dialog.opendevice1(8);
   }

   ClicAL1_2() {
    // // debugger
    this.dialog.opendevice2(10);
   }

   ClicAL1_3() {
    // // debugger
    this.dialog.opendevice3(1);
   }

   ClicAL1_4() {
    // // debugger
    this.dialog.opendevice4(5);
   }

   ClicAL1_5() {
    // // debugger
    this.dialog.opendevice5(4);
   }

   ClicAL1_6() {
    // debugger
    this.dialog.opendevice6(2);
   }

   ClicAL1_7() {
    // debugger
    this.dialog.opendevice7(3);
   }

   ClicAL1_8() {
    // debugger
    this.dialog.opendevice8(6);
   }

   ClicAL1_9() {
    // debugger
    this.dialog.opendevice9(11);
   }

   ClicAL1_10() {
    // debugger
    this.dialog.opendevice10(9);
   }

   ClicAL1_11() {
    // debugger
    this.dialog.opendevice11(7);
   }

   ClicAL2_1() {
    // debugger
    this.dialog.opendevice12(13);
   }
   
   ClicAL2_2() {
    // debugger
    this.dialog.opendevice13(12);
   }

   ClicAL2_3() {
    // debugger
    this.dialog.opendevice14(14);
   }

   ClicAL2_4() {
    // debugger
    this.dialog.opendevice15(15);
   }

  ngOnDestroy() {
    this.alive = false;
  }

}
