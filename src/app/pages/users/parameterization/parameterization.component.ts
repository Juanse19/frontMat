import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { GridComponent, SortService, PageSettingsModel, FilterSettingsModel, ToolbarItems, CommandModel, ToolbarService, EditService, PageService, CommandColumnService, DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { UserStore } from '../../../@core/stores/user.store';
import { NbToastrService } from '@nebular/theme';
import { Browser, EmitType, L10n } from '@syncfusion/ej2-base';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';


interface confi {
  Id?: number,
  Parameter?: string,
  Value?: string,
  CreateDate?: string,
  UpdateDate?: string,
 }

 interface conC {
  Id?: number,
  Parameter?: string,
  Value?: string,
 }

 let conConf: conC;

 interface modeSic {
   ModoSic?: number; 
 }

 let modoCREAR: modeSic
{

};

interface gettoggle{
  Parameter?: string,
  value?: number,
  text?: string,
  values?: boolean,
}

let GETtoggle: gettoggle;
{

}

@Component({
  selector: 'ngx-parameterization',
  templateUrl: './parameterization.component.html',
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
  styleUrls: ['./parameterization.component.scss']
})
export class ParameterizationComponent implements OnInit {

  public pageSettings: PageSettingsModel;
  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
  public editparams: Object;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  public orderForm: FormGroup;
  public toggleForm: FormGroup;
  public shipCityDistinctData: Object[];
  public shipCountryDistinctData: Object[];
  public submitClicked: boolean = false;
  public initialSort: Object;

  masterSelected:boolean;
  public tooltiptext = {
    message: 'Desactivado dimansionado, activado officeId '
  }

  public select = false;
  private alive = true;
  mostrar: Boolean;
  public showCloseIcon: Boolean = true;

  public dataConf: confi;
  public dataConfigu: confi[] = [];

  public toggleText:string;
  public dataToggle: gettoggle;
  listToggle? = GETtoggle;
  public toggleNgModel:boolean;
  public trutog;

  get Parameter() { return this.orderForm.get('Parameter')}
  get Value() { return this.orderForm.get('Value')}

  // get value() { return this.toggleForm.get('value')}

  @ViewChild('ejDialogTX') ejDialogTX: DialogComponent;
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // @ViewChild('ModoSic') ModoSic: ElementRef;
  constructor(
    private api: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private apiGetComp: ApiGetService,
    public accessChecker: NbAccessChecker,
    private userStore: UserStore,
    private toasterService: NbToastrService,
  ) { 
    this.toggleLista();
    this.masterSelected = false;
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
    ];

    this.toggleForm = new FormGroup({
      value: new FormControl()
   });

    this.orderForm = new FormGroup({
      Id: new FormControl,
      Parameter: new FormControl(),
      Value: new FormControl()
   });

   this.toggleForm.setValue({
    value: this.listToggle?.values ? this.listToggle?.values : '',
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

  updateData(args){
    debugger
    this.dataConf = this.orderForm.value
    
    var respon = 
    {
      Id: this.dataConf.Id,
      Parameter: this.dataConf.Parameter,
      Value: this.dataConf.Value 
  };
  // console.log('Datas update', respon);
  
  this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/updateConf', respon)
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
    this.apiGetComp.PostJson(this.api.apiUrlNode + '/postSaveAlarmUser', respons)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
          //  console.log("Envió: ", res);
        });
  
        this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/deleteallposition')
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
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/configuration').subscribe((res: any) => {
      this.dataConfigu = res;
    });

  }

  toggleLista() {

    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/getModoSic')
    .subscribe((res: any) => {
      GETtoggle = res;
      this.listToggle = GETtoggle[0]
      console.log(this.listToggle);
      });
  }


  create(){

    let formulario = this.toggleForm.value;

    

    // this.masterSelected == true ? 0 : 1;

    // console.log('result value: ', formulario?.values != true ? this.trutog = 0 : this.trutog = 1);
    // formulario?.values != true ? this.trutog = 0 : this.trutog = 1

    // console.log('formulario', formulario?.value);
    // console.log('formulario', this.listToggle.values);
    
    debugger

    if (this.listToggle?.values === true) {
      debugger
      this.trutog = 1
      modoCREAR =
                {
                  ModoSic: this.trutog,
                }

    console.log('create', modoCREAR);

      this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/updateModoSic', modoCREAR).subscribe((res: any) => {
        this.toasterService.success(' actualizada con exito' );
        console.log('Guardo con exito');
        this.toggleLista();
        });
      
    } 
    
    if(this.listToggle?.values === false) {
      debugger
      this.trutog = 0
      modoCREAR =
                {
                  ModoSic: this.trutog,
                }

    console.log('create', modoCREAR);

      this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/updateModoSic', modoCREAR).subscribe((res: any) => {
        this.toasterService.success(' actualizada con exito' );
        console.log('Guardo con exito');
        this.toggleLista();
        });
    }

    // modoCREAR =
    //             {
    //               ModoSic: this.trutog,
    //             }

    // console.log('create', modoCREAR);
    
    // this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/updateModoSic', modoCREAR).subscribe((res: any) => {
    // this.toasterService.success(' actualizada con exito' );
    // console.log('Guardo con exito');
    // // this.toggleLista();
    // });


  }

  ngOnDestroy() {
    this.alive = false;
  }

}
