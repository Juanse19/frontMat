import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { GridComponent, SortService, PageSettingsModel, FilterSettingsModel, ToolbarItems, CommandModel, ToolbarService, EditService, PageService, CommandColumnService, DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { switchMap, takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { UserStore } from '../../../@core/stores/user.store';
import { NbToastrService } from '@nebular/theme';
import { Browser, EmitType, L10n } from '@syncfusion/ej2-base';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
 
interface confi {
  Id?: number,
  Parameter?: string,
  Value?: string,
  CreateDate?: string,
  UpdateDate?: string,
  State?: number,
 }

  interface conC {
    Id?: number,
    Parameter?: string,
    Value?: string,
  }

 let conConf: conC;

 let REFERE: confi[]

 @Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-sita-message',
  templateUrl: './sita-message.component.html',
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
  // styleUrls: ['./sita-message.component.scss']
})
export class SitaMessageComponent implements OnInit {

  public dataRefe = REFERE;
 
  public pageSettings: PageSettingsModel;
  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
  public editparams: Object;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  public orderForm: FormGroup;
  public shipCityDistinctData: Object[];
  public shipCountryDistinctData: Object[];
  public submitClicked: boolean = false;
  public initialSort: Object;

  public select = false;
  private alive = true;
  mostrar: Boolean;
  public showCloseIcon: Boolean = true;

  public dataConf: confi;
  public dataConfigu: confi[] = [];
  public dataConfigu1: confi[] = [];

  get Parameter() { return this.orderForm.get('Parameter')}
  get Value() { return this.orderForm.get('Value')}

  @ViewChild('ejDialogTX') ejDialogTX: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;

  intervalSubscriptionM: Subscription;

  constructor(
    private api: HttpService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private apiGetComp: ApiGetService,
    public accessChecker: NbAccessChecker,
    private userStore: UserStore,
    ) { 
      
     }

    public targetElement: HTMLElement;
    public visible: Boolean = true;
    public hidden: Boolean = false;
    public position: object={ X: 'left', Y: 'top' };
    public initialPage: Object;

  ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true,  };

      this.pageSettings = { pageSizes: true, pageSize: 10 };
      this.filterOptions = {
        type: 'Menu',
     };

     this.ChargeDataConfi();
     
     this.commands = [
      { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
      // { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-check' } },
      // { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
      // { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' }}
    ];

    this.orderForm = new FormGroup({
      Id: new FormControl,
      Parameter: new FormControl(),
      Value: new FormControl()
   });

  }

// Initialize the Dialog component's target element.
public initilaizeTarget: EmitType<object> = () => {
  this.targetElement = this.container.nativeElement.parentElement;
    }

    public hideDialog: EmitType<object> = () =>  {
      this.ejDialogTX.hide();
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
    ];  

  createFormGroup(data: confi): FormGroup {
    return new FormGroup({
      // Id: new FormControl(data.Id, Validators.required),
      Parameter: new FormControl(data.Parameter, Validators.required),
      Value: new FormControl(data.Value, Validators.required)

    });
}

loadUser(id?) {
debugger
  this.orderForm.setValue({
    id: this.dataConf.Id ? this.dataConf.Id : '',
    role: conConf.Parameter ? conConf.Parameter : '',
    firstName: conConf.Value ? conConf.Value : '',
  });

}

  actionBegin(args) {
    if (args.requestType === 'beginEdit') {
      this.submitClicked = true;
      this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if(res){
          console.log('test', args.rowData.Id);
          args.cancel = true;
          this.ejDialogTX.show();
          this.orderForm.setValue({
            Id: args.rowData.Id ? args.rowData.Id : '',
            Parameter: args.rowData.Parameter ? args.rowData.Parameter : '',
            Value: args.rowData.Value ? args.rowData.Value : '',
          });
          
          // this.loadUser(args.rowData.Id)
        // console.log('Data',args.rowData.Id);
        // console.log('test', this.createFormGroup(args.rowData).value)
        // console.log('Prueba', this.orderForm.setValue = this.createFormGroup(args.rowData).value);
        // this.dataConf = args.rowData;
        // console.log('info', this.dataConf);
          
          this.select = false;
          this.mostrar = false;
        }else {
          this.select=true;
          this.mostrar=true;
          args.cancel = true;
        }
      });
    }

  }

  close(){
    this.ejDialogTX.hide();
  }

  updateData(){
    // debugger
    this.dataConf = this.orderForm.value
    
    var respon = 
    {
      Id: this.dataConf.Id,
      Parameter: this.dataConf.Parameter,
      Value: this.dataConf.Value 
  };
  console.log('Datas update', respon);
  
  this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/api/updateConf', respon)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      // console.log("Envió: ", res);
      this.ChargeDataConfi();
      });

    // console.log('Update configuration');
    this.ejDialogTX.hide();

  }

  reconocer() {

  
    this.accessChecker.isGranted('edit', 'ordertable')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if(res){ 
      Swal.fire({
      title: 'Desea Eliminar los datos del WCS?',
      text: `¡Eliminará toda la información!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!'
    }).then(result => {
      debugger 
      if (result.value) {
        debugger
  
        const currentUserId = this.userStore.getUser().id;
      const currentUser = this.userStore.getUser().firstName;
    // console.log("este es el usuario: ",this.userStore.getUser().firstName);
    var respons = 
    {
      user: currentUser,
      message:"Eliminó todo el WCS",
      users: currentUserId,  
  };
    this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/postSaveAlarmUser', respons)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
          //  console.log("Envió: ", res);
        });
  
        this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/api/deleteallposition')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
      });
   
         Swal.fire('¡Se Eliminaron Exitosamente', 'success');
         
     }
   });
           
         this.select = false;
         this.mostrar = false;
       }else {
         this.select=true;
         this.mostrar=true;
       }
     });
     
  } 

  ChargeDataConfi() {
    this.http.get(this.api.apiUrlNode1 + '/api/recepcion')
    .subscribe((res: any) => {
      //REPORTOCUPATION=res;
      this.dataConfigu = res;
      console.log("dataRefe:", this.dataConfigu);
      REFERE = res;
      this.dataRefe = REFERE;
      // console.log("Configuration:", this.dataConfigu);
      
    });

  }

  chargeData() {
    this.http.get(this.api.apiUrlNode1 + '/api/recepcion')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      // tslint:disable-next-line: no-console
      // console.log('teamsData: ', res);
      this.dataConfigu1 = res;
      this.bandaMCharge();
    });
    // const contador = interval(40000)
    // contador.subscribe((n) => {
    //   this.http.get(this.api.apiUrlNode1 + '/api/recepcion')
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((res: any) => {
    //     this.dataConfigu1 = res;
    //   });
    // });
  }

  public bandaMCharge(){

    if (this.intervalSubscriptionM) {
      this.intervalSubscriptionM.unsubscribe();
    }
    
    this.intervalSubscriptionM = interval(16000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/api/recepcion')),
    )
    .subscribe((res: any) => {
      this.dataConfigu1 = res;
        // console.log('Equipos:', this.bagMessageData);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
