import { State } from './../../dashboard/_interfaces/MatBox.model';
import { Component, OnInit } from '@angular/core';
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
import { Browser, L10n } from '@syncfusion/ej2-base';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import Swal from 'sweetalert2'; 

interface orderPosition {
  Id: number,
  Orden: number,
  Destino: number,
  IdOrder: number,
  IdDevice: number,
  Source: string,
  Target: string,
  Index: number,
  Position: number,
  CutLength: number,
  CutsCount: number,
  CutsCountOriginal: number,
  Stuck: boolean,
  Invested: boolean,
  Lock: boolean,
  Express: boolean,
  Estado: number,
  TimeStamp: string
 }

 let position: orderPosition;

//  L10n.load({
//   'en-US': {
//       grid: {
//           'SaveButton': 'Submit',
//           'CancelButton': 'Discard'
//       }
//   }
// });

@Component({
  selector: 'ngx-orderposition',
  templateUrl: './orderposition.component.html',
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
  styleUrls: ['./orderposition.component.scss']
})
export class OrderpositionComponent implements OnInit {

  public pageSettings: PageSettingsModel;


  public editSettings: Object;
  // public toolbar: string[];
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
  public dataposorder: orderPosition;
  public dataOrposition: orderPosition[]=[];
  position: any;

  // get OrderID(): AbstractControl  { return this.orderForm.get('OrderID'); }

  // get CustomerName(): AbstractControl { return this.orderForm.get('CustomerName'); }

  // get OrderDate(): AbstractControl { return this.orderForm.get('OrderDate'); }

  // get Id(): AbstractControl { return this.orderForm.get('Id')}
  get Orden() { return this.orderForm.get('Id')}
  get Destino() { return this.orderForm.get('Id')}
  get Index() { return this.orderForm.get('Id')}
  get Position() { return this.orderForm.get('Id')}
  get Stuck() { return this.orderForm.get('Id')}
  get Invested() { return this.orderForm.get('Id')}
  get Lock() { return this.orderForm.get('Id')}
  get Express() { return this.orderForm.get('Id')}
  get State() { return this.orderForm.get('Id')}
  get TimeStamp() { return this.orderForm.get('Id')}


  constructor(
    public accessChecker: NbAccessChecker,
    private toastrService: NbToastrService,
    public apiGetComp: ApiGetService,
    private api: HttpService,
    private userStore: UserStore,
    private fb: FormBuilder) { }

    ngOnInit(): void {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };

      this.pageSettings = { pageSizes: true, pageSize: 10 };
      this.filterOptions = {
        type: 'Menu',
     };

      this.ChargeDataOrdenPosition();


      this.toolbar = [
        //  {text: 'Delete', prefixIcon: 'fas fa-check'},
       { text: '', tooltipText: 'Eliminar todo', prefixIcon: 'e-icons e-delete', id: 'Click' }];

       this.commands = [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-info' } },
        // { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-check' } },
        // { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
        // { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' }}
      ];

    }


    createFormGroup(data: orderPosition): FormGroup {
      return new FormGroup({
        Id: new FormControl(data.Id, Validators.required),
        Orden: new FormControl(data.Orden, Validators.required),
        Destino: new FormControl(data.Destino, Validators.required),
        Index: new FormControl(data.Index, Validators.required),
        Position: new FormControl(data.Position, Validators.required),
        Stuck: new FormControl(data.Stuck, Validators.required),
        Invested: new FormControl(data.Invested, Validators.required),
        Lock: new FormControl(data.Lock, Validators.required),
        Express: new FormControl(data.Express, Validators.required),
        State: new FormControl(data.Estado, Validators.required),
        TimeStamp: new FormControl(data.TimeStamp, Validators.required)

      });
  }

    clickHandler(args: ClickEventArgs): void {
      if (args.item.id === 'Click') {
        // console.log('Boton eliminar todo');

        this.reconocer();
      }
    }

    actionBegin(args) {
      if (args.requestType === 'beginEdit') {
        this.submitClicked = false;
        this.accessChecker.isGranted('edit', 'ordertable')
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          if(res){
            // debugger
            

          // console.log('Data',args.rowData.Id);
          // console.log('test', this.createFormGroup(args.rowData).value)
          // console.log('Prueba', this.orderForm.setValue = this.createFormGroup(args.rowData).value);
          this.dataposorder = args.rowData;
          // console.log('info', this.dataposorder);

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

    reconocer() {

      this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if(res){ 
        Swal.fire({
        title: 'Desea Eliminar las inducciones?',
        text: `¡Eliminará todas las inducciones!`,
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
    message:"Eliminó todas las induccione (OrderPosition)",
    users: currentUserId,  
};
  this.apiGetComp.PostJson(this.api.apiUrlNode + '/postSaveAlarmUser', respons)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
        //  console.log("Envió: ", res);
      });

        
            var respon = 
              {
                UserIdAcknow: currentUserId
              };
   
        this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/deleteallposition', respon)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          this.ChargeDataOrdenPosition();
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

  //   actionBegin(args): void {

  //     if (args.requestType === 'beginEdit') {
  //         this.submitClicked = false;
  //         debugger

  //         console.log('Data',args.rowData.Id);
  //         console.log('test', this.createFormGroup(args.rowData).value)
  //         // console.log('Prueba', this.orderForm.setValue = this.createFormGroup(args.rowData).value);
  //         this.dataposorder = args.rowData;
  //         console.log('info', this.dataposorder);

  //     }
    
  // }

    ChargeDataOrdenPosition() {
      this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/orderposition').subscribe((res: any) => {
        //REPORTOCUPATION=res;
        // console.log("Orden Position:", res);
        this.dataOrposition = res;
      });
      // const contador = interval(60000)
      // contador.subscribe((n) => {
      //   this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/orderposition').subscribe((res: any) => {
      //     //REPORTOCUPATION=res;
      //     this.dataOrposition = res;
      //   });
      // });

    }

    ngOnDestroy() {
      this.alive = false;
    }

}
