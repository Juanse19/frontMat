import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Injectable, TemplateRef } from '@angular/core';
import { DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { NbAccessChecker } from '@nebular/security'
import { takeWhile } from 'rxjs/operators';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { GridComponent, SortService, PageSettingsModel, FilterSettingsModel, ToolbarItems, ToolbarService, 
  EditService, PageService, CommandColumnService, CommandModel  } from '@syncfusion/ej2-angular-grids';

  interface outOrder {
    OrderNumber: string,
    OrderType: string,
    OrderLength: number,
    SegmentSheetCount: string,
    SheetLength: number,
    SheetWidth: number,
    SheetsPerStack: string,
    Outs: string,
    CustomerName: string,
    Position: string,
    OfficeID: string,
    IdSource: number,
    Origen: string,
    Clave: string
  }

@Component({
  selector: 'ngx-queued-orders',
  templateUrl: './queued-orders.component.html',
  styleUrls: ['./queued-orders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@Injectable({
  providedIn: 'root'
})

export class QueuedOrdersComponent implements OnInit {

  private alive = true;
  
  public showCloseIcon: Boolean = true;

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  public toolbarOptions: ToolbarItems[];

  public toolbar: ToolbarItems[] | object;

  public commands: CommandModel[];

  public editSettings: Object;

  public orderOut1: outOrder [] = [];

  public orderOut2: outOrder [] = [];


  constructor(
    public accessChecker: NbAccessChecker,
    private http: HttpClient,
    private api: HttpService,
  ) { }

  @ViewChild('device1') device1: DialogComponent;

  @ViewChild('device2') device2: DialogComponent;

  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;

  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  
  public visible: Boolean = true;
  public hidden: Boolean = false;

  ngOnInit(): void {

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
      allowEditOnDblClick: false
    };

    this.pageSettings = { pageSizes: true, pageSize: 10 };

  }

  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
      }
      // Hide the Dialog when click the footer button.
      public hideDialog: EmitType<object> = () => {
        // this.ejDialog.hide();
        // this.ejDialog1.hide();
        // this.ejDialog2.hide();
      }
      // Enables the footer buttons
      public buttons: Object = [
     
      ];

  public opendevice1(){
    this.http.get(this.api.apiUrlNode + "/api/PedidoStackersOut?origen=arriba")
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (res[0] == undefined) {
        // console.log('no hay data arriba');
      } else {
        // console.log('Si hay');
        this.device1.show();
        // console.log('Ordenes en cola 1');
        this.orderOut1 = res;
        // console.log('above', this.orderOut1  );
      }
      
    });
    
  }

  public opendevice2(){
    this.http.get(this.api.apiUrlNode + "/api/PedidoStackersOut?origen=abajo")
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (res[0] == undefined) {
        // console.log('no hay data abajo');
      } else {
        // console.log('Si hay');
        this.device2.show();
        // console.log('Ordenes en cola 2');
        this.orderOut2 = res;
        // console.log('down', this.orderOut2  );
      }
      
    });
  
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
