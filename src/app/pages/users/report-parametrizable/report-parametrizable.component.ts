import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { GridComponent, SortService, PageSettingsModel, FilterSettingsModel, ToolbarItems, CommandModel, ToolbarService, EditService, PageService, CommandColumnService, DialogEditEventArgs, SaveEventArgs, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { switchMap, takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { UserStore } from '../../../@core/stores/user.store';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { Browser, EmitType, L10n } from '@syncfusion/ej2-base';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Dialog, DialogComponent } from '@syncfusion/ej2-angular-popups';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CreateReportComponent } from '../create-report/create-report.component';
import { Subscription } from 'rxjs';
import { MessageService } from '../../dashboard/services/MessageService';
import { EditReportComponent } from '../edit-report/edit-report.component';


interface confi {
  Id: number,
  Parameter?: string,
  Value?: string,
  CreateDate?: string,
  UpdateDate?: string,
  State?: number,
  Category: string,
  Description: string,
  Type: string,
  Value01?: string,
}

interface conC {
  Id?: number,
  Parameter?: string,
  Value?: string,
  Category: string,
  Description: string,
  Type: string,
}

let conConf: conC;

let REFERE: confi[]



@Component({
  selector: 'ngx-report-parametrizable',
  templateUrl: './report-parametrizable.component.html',
  styleUrls: ['./report-parametrizable.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
})
@Injectable({
  providedIn: 'root'
})
export class ReportParametrizableComponent implements OnInit {

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

  public dataConf: conC[];
  public dataConfigu: conC[];

  subscription: Subscription;

  @ViewChild('grid') public grid: GridComponent;

  @ViewChild(CreateReportComponent) public dialogCreate: CreateReportComponent;

  // @ViewChild(CreateReportComponent) dialogs: CreateReportComponent;
  @ViewChild(EditReportComponent) dialogEdit: EditReportComponent;

  constructor(
    private api: HttpService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private apiGetComp: ApiGetService,
    public accessChecker: NbAccessChecker,
    private windowService: NbWindowService,
    private userStore: UserStore,
    private messageService: MessageService,
  ) {
    this.loadData();
  }

  loadData() {
    this.subscription = this.messageService.onMessage()
      .pipe(takeWhile(() => this.alive))
      .subscribe(message => {
        if (message.text == "PackageUpdate") {

          this.ChargeDataConfi();
          //console.log('Cargo exitosamente..!');

        }
      });
  }

  ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, };

    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this.filterOptions = {
      type: 'Menu',
    };

    this.ChargeDataConfi();

    this.commands = [
      { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
      { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-icons e-delete' } },
      // { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
      // { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' }}
    ];
  }


  rowSelected(args: RowSelectEventArgs) {
    // const rowHeight: number = this.grid.getRows()[this.grid.getSelectedRowIndexes()[0]].scrollHeight;
    // this.grid.getContent().children[0].scrollTop = rowHeight * this.grid.getSelectedRowIndexes()[0];
  }

  public actionBegin(args) {
    if ((args.requestType === 'beginEdit')) {
      args.cancel = true;

      this.dialogEdit.openWindowForm(args.rowData);

    }
    if ((args.requestType === 'delete')) {


      Swal.fire({
        title: '¿Esta seguro que quiere eliminar el Reporte?',
        text: `¡Se eliminará el Reporte!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, Eliminar!',
        cancelButtonText: "No, Eliminar",
      }).then(result => {
        // debugger
        if (result.value) {

          this.http.get(this.api.apiUrlNode1 + "/api/deleteReport?Id=" + args.data[0].Id)
            .subscribe((res: any) => {
              this.ChargeDataConfi();
              Swal.fire('Se eliminó exitosamente');

            });

          this.ChargeDataConfi();
        }


      });
      args.cancel = true;
    }
  };

  ChargeDataConfi() {
    this.http.get(this.api.apiUrlNode1 + '/api/reportsConfiguration')
      .subscribe((res: any) => {
        this.dataConfigu = res;
        //console.log('dataConfigu', this.dataConfigu);

        REFERE = res;
        this.dataRefe = REFERE;
      });
  }

  openFormCreate() {
    this.dialogCreate.openDialog();
    }

  ngOnDestroy() {
    this.alive = false;
  }

}
