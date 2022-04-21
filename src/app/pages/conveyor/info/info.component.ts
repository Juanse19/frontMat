import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {  Zones } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, takeWhile } from 'rxjs/operators';
import { DialogComponent, AnimationSettingsModel, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

export interface Consumezones {
  ZoneId?: string;
  ZoneName?: string;
  Estado?: string;
  Consumo?: string;
  ContadorMaletas?: string;
  TiempoOn?: string;
  TiempoOff?: string;
  }

@Component({
  selector: 'ngx-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public zone: Zones[] = [];

  public consumezoneData: Consumezones [] = [];

  public zoneData: Consumezones[] = [];

  public zoData: Consumezones [] = [];

  public mostarIB03: boolean;
 
  private alive=true;

  public showCloseIcon: Boolean = true ;

  public animationSettings: AnimationSettingsModel = { effect: 'None' };

  constructor(private router: Router,
    private http: HttpClient,
    private api: HttpService) {
    
  }

    @ViewChild('ejDialog') ejDialog: DialogComponent;
    @ViewChild('ejDialog1') ejDialog1: DialogComponent;
    @ViewChild('ejDialog2') ejDialog2: DialogComponent;
    // Create element reference for dialog target element.
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
    // The Dialog shows within the target element.
    public targetElement: HTMLElement;
    // This will resize the dialog in all the directions.
    // public resizeHandleDirection: ResizeDirections[] = ['All'];
    public visible: Boolean = true;
    public hidden: Boolean = false;
    public position: object={ X: 'left', Y: 'top' };
  
    ngOnInit(): void {
      this.GetSystem();
      this.initilaizeTarget();
    }
      // Initialize the Dialog component's target element.
      public initilaizeTarget: EmitType<object> = () => {
        this.targetElement = this.container.nativeElement.parentElement;
        // this.resizeHandleDirection = ['All'];
          }

          public hideDialog: EmitType<object> = () =>  {
            this.ejDialog.hide();
        }
        public hideDialog1: EmitType<object> = () => {
          this.ejDialog1.hide();
        }
        public hideDialog2: EmitType<object> = () =>  {
            this.ejDialog2.hide();
        }
          
          public buttons: Object = [
          {
              'click': this.hideDialog.bind(this),
              // Accessing button component properties by buttonModel property
                buttonModel: {
                content: 'OK',
                isPrimary: true
              }
          }
          // ,
          // {
          //     'click': this.hideDialog.bind(this),
          //     buttonModel: {
          //       content: 'Cancel'
          //     }
          // }
          ];

  private GetSystem(){    
    this.http.get(this.api.apiUrlNode1 + '/apifront')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:Zones[])=>{
      this.zone=res;
      // console.log("zon", this.zone);
      // console.log("Res ", res);
      
    });
  }

  public changeId(tea: any){
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ tea)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.consumezoneData=res;
      // console.log('Zons:', res , 'states');
      
    });
  }

  changeIB01(idDevice?: number){
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevice)
    .pipe()
    .subscribe((res: any [])=>{
      if (res.length === 0) {
        res = [{
          // ZoneId: 0,
          ZoneName: "IB01",
          Estado: "0",
          Consumo: "0",
          ContadorMaletas: "0",
          TiempoOn: 0,
          TiempoOff: 0,
          }]
          this.consumezoneData=res;
          this.ejDialog.show();
          this.ejDialog.position = { X: 165.438, Y: 257.813 };
      } else {
      this.consumezoneData=res;
      this.ejDialog.show();
      // console.log('Zons1:', res , 'states');
      this.ejDialog.position = { X: 165.438, Y: 257.813 };
      }
      
    });
  }

  openIB01(idDevice?: number){
    this.changeIB01(idDevice)
  }

  changeIB02(idDevices?: number){
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevices)
    .pipe()
    .subscribe((res: any [])=>{
      if (res.length === 0) {
        res = [{
          // ZoneId: 0,
          ZoneName: "IB02",
          Estado: "0",
          Consumo: "0",
          ContadorMaletas: "0",
          TiempoOn: 0,
          TiempoOff: 0,
          }]
          this.zoneData=res;
          this.ejDialog1.show();
          this.ejDialog1.position = { X: 438.438, Y: 74.2083 };
      } else {
      this.zoneData=res;
      this.ejDialog1.show();
      // console.log('Zons:', this.zoneData , 'states');
      this.ejDialog1.position = { X: 438.438, Y: 74.2083 };
      }
      
    });
  }

  openIB02(idDevices?: number){
    this.changeIB02(idDevices)
  }

  changeIB03(idDevic?: number){
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevic)
    .pipe()
    .subscribe((res: any )=>{
      if (res.length === 0) {
        res = [{
          // ZoneId: 0,
          ZoneName: "IB03",
          Estado: "0",
          Consumo: "0",
          ContadorMaletas: "0",
          TiempoOn: 0,
          TiempoOff: 0,
          }]
        this.zoData=res;
        this.ejDialog2.show();
        this.ejDialog2.position = { X: 807.313, Y: 317.208};
      } else {
        this.zoData=res;
        this.ejDialog2.show();
        console.log('Zons:', res );
        this.ejDialog2.position = { X: 807.313, Y: 317.208};
      }
      
    });
  }

  openIB03(idDevic?: number){
    this.changeIB03(idDevic)
  }

  ClicIB01() : void{
    this.openIB01(7);
    }
  
    ClicIB02() : void{
    this.openIB02(8);
    }
  
    ClicIB03(): void {
    this.openIB03(9);
    }

  ib1() {
    this.router.navigate(['/pages/conveyor/ib1'],{skipLocationChange: true});
   }

   ib2() {
    this.router.navigate(['/pages/conveyor/ib2'],{skipLocationChange: true});
   }

   ib3() {
    this.router.navigate(['/pages/conveyor/ib3'],{skipLocationChange: true});
   }

   close(){
    setTimeout(() => {
      // console.log('Cerrar Dialogs');
      this.ejDialog.hide();
      this.ejDialog1.hide();
      this.ejDialog2.hide();
    }, 50000);
  }

   openDialogs(){
    this.ClicIB01();
    this.ClicIB02();
    this.ClicIB03();
    this.close();
   }
  
   ngOnDestroy() {
    this.alive = false;
  }

}
