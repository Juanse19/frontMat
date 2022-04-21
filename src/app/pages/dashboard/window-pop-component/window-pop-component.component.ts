import { Component, TemplateRef, ViewChild, Injectable, ElementRef } from '@angular/core';
import { NbWindowConfig, NbWindowService, NbWindowRef,NbToastrService } from '@nebular/theme';
import {ApiGetService} from './apiGet.services';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { NbAccessChecker } from '@nebular/security'
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { BehaviorSubject, Observable, of, Subject,Subscription } from 'rxjs';
import { debounceTime, delay, reduce, switchMap, takeWhile, tap } from 'rxjs/operators';
import { Consumezone, Zones } from '../../conveyor/_interfaces/MatBag.model';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

let win:NbWindowRef;

let IDDEVICE: number;

@Component({
  providers: [ApiGetService,
    DecimalPipe,
  ],
  selector: 'ngx-window-pop-component',
  templateUrl: './window-pop-component.component.html',
  styleUrls: ['./window-pop-component.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class WindowPopComponentComponent {

  subscription: Subscription;
  
  windowRef:NbWindowRef;

  idDevice=IDDEVICE;

  public zone: Zones[] = [];

  private alive = true;

  public show = false;

  public Data: Consumezone[] = [];

  constructor(
    public windowService: NbWindowService,
    public accessChecker: NbAccessChecker,
    private apiGetComp: ApiGetService,
    public pipe: DecimalPipe,
    private router: Router,
    private api: HttpService,
    private http: HttpClient,
    ) 
    { 
      
    }

  ngOnInit(): void {
    // this.GetSystem();
    this.initilaizeTarget();
  }

  @ViewChild('ejDialog') ejDialog: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

    public visible: Boolean = true;
    public hidden: Boolean = false;

    // Initialize the Dialog component's target element.
    public initilaizeTarget: EmitType<object> = () => {
      this.targetElement = this.container.nativeElement.parentElement;
        }
        // Hide the Dialog when click the footer button.
        public hideDialog: EmitType<object> = () => {
      this.ejDialog.hide();
        }
        // Enables the footer buttons
        public buttons: Object = [
        {
            'click': this.hideDialog.bind(this),
            // Accessing button component properties by buttonModel property
              buttonModel: {
              content: 'OK',
              isPrimary: true
            }
        },
        {
            'click': this.hideDialog.bind(this),
            buttonModel: {
              content: 'Cancel'
            }
        }
        ];
        // Sample level code to handle the button click action
        public onOpenDialog = function(event: any): void {
      // Call the show method to open the Dialog
      this.ejDialog.show();
        };

  // private GetSystem(){    
  //   this.http.get(this.api.apiUrlNode1 + '/apifront')
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res:Zones[])=>{
  //     this.zone=res;
  //     console.log('zonas: ', this.zone);
  //   });
  // }

  infoData(idDevice?: number){
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevice)
      .pipe()
      .subscribe((res: any)=>{
        this.Data = res;
        console.log('Info:', res );
        this.ejDialog.show();
      });
  }

  DataLoad(idDevice?: number){
    debugger
    this.infoData(idDevice);
    
    // this.idDevice = idDevice;
    // IDDEVICE=idDevice
    // this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevice)
    // .pipe()
    // .subscribe((res: any)=>{
    //   this.consumezoneData = res;
    //   console.log('Info:', res , 'Zons: ', this.consumezoneData);
      
    //   win=this.windowRef=this.windowService.open(
    //     WindowPopComponentComponent, 
    //     { title: 'Zona',
    //     hasBackdrop: true,
    //     closeOnEsc: true,
    //     }
    //     );
    // });
    // win=this.windowRef=this.windowService.open(
    //   WindowPopComponentComponent, 
    //   { title: 'Zona',
    //   hasBackdrop: true,
    //   closeOnEsc: true,
    //   }
    //   );
  }

  openWindowForms(idDevice?: number) {
    this.accessChecker.isGranted('edit', 'machine')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if(res){ 
        this.DataLoad(idDevice);
      }
    });
    // debugger
  }

  // close() {
  //   this.windowRef.close();
  // }
 
  ngOnDestroy() {  
  this.alive = false;
  // this.windowRef.close();
  }

}
