import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { GridComponent, PageSettingsModel, FilterSettingsModel, ToolbarItems, CommandModel, ToolbarService, EditService, PageService, CommandColumnService, DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { UserStore } from '../../../@core/stores/user.store';
import { NbToastrService } from '@nebular/theme';
import { Browser, L10n } from '@syncfusion/ej2-base';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import Swal from 'sweetalert2'; 

interface logRoutes {
  Id: number,
  Route: string,
  CreateDate: string,
 }

@Component({
  selector: 'ngx-routes',
  templateUrl: './routes.component.html',
  providers: [ToolbarService, EditService, PageService, CommandColumnService],
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

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

  public select = false;
  private alive = true;
  mostrar: Boolean;

  public dataLog: logRoutes;
  public dataRoutes: logRoutes[] = [];

  constructor(
    public accessChecker: NbAccessChecker,
    private toastrService: NbToastrService,
    public apiGetComp: ApiGetService,
    private api: HttpService,
    private userStore: UserStore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };

      this.pageSettings = { pageSizes: true, pageSize: 10 };
      this.filterOptions = {
        type: 'Menu',
     };

     this.ChargeDataLogRoutes();

     this.commands = [
      { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-info' } },
      // { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-check' } },
      // { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
      // { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' }}
    ];

  }

  createFormGroup(data: logRoutes): FormGroup {
    return new FormGroup({
      Id: new FormControl(data.Id, Validators.required),
      Route: new FormControl(data.Route, Validators.required),
      CreateDate: new FormControl(data.CreateDate, Validators.required)

    });
}

  actionBegin(args) {
    if (args.requestType === 'beginEdit') {
      this.submitClicked = false;
      this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if(res){
          debugger
          

        console.log('Data',args.rowData.Id);
        console.log('test', this.createFormGroup(args.rowData).value)
        // console.log('Prueba', this.orderForm.setValue = this.createFormGroup(args.rowData).value);
        this.dataLog = args.rowData;
        // console.log('info', this.dataLog);

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

  ChargeDataLogRoutes() {
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/routes').subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Routes:", res);
      this.dataRoutes = res;
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
