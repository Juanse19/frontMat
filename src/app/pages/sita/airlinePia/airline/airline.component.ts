import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ApiGetService } from '../../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../../@core/backend/common/api/http.service';
import { GridComponent, SortService, PageSettingsModel, FilterSettingsModel, ToolbarItems, CommandModel, ToolbarService, EditService, PageService, CommandColumnService, DialogEditEventArgs, SaveEventArgs, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { switchMap, takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { UserStore } from '../../../../@core/stores/user.store';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../dashboard/services/MessageService';
import { AirlineCreateComponent } from '../airline-create/airline-create.component';
import { AirlineEditComponent } from '../airline-edit/airline-edit.component';
import { MatDialog } from '@angular/material/dialog';

interface airline {
  Id: number,
  airline_name?: string,
  iata_designator?: string,
  tree_digit_code?: string,
  icao_designator?: string,
  country_territory?: string,
  airline_state?: number,
  // state: string
}

let REFERE: airline[]

@Component({
  selector: 'ngx-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
})
@Injectable({
  providedIn: 'root'
})
export class AirlineComponent implements OnInit {

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
  public dataAirline?: airline[];
  public activarion: string;
  public modAirline: []

  subscription: Subscription;

  @ViewChild('grid') public grid: GridComponent;

  @ViewChild(AirlineCreateComponent, { static: true }) public dialog: AirlineCreateComponent;

  @ViewChild(AirlineCreateComponent) dialogCreate: AirlineCreateComponent;
  @ViewChild(AirlineEditComponent) dialogEdit: AirlineEditComponent;

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
    public dialogmaterial: MatDialog
    ) { 
      this.loadData();
      this.select = false;
     }

     loadData(){
      this.subscription = this.messageService.onMessage()
      .pipe(takeWhile(() => this.alive))
      .subscribe(message => {
        if (message.text=="PackageUpdate") {

          this.ChargeDataAirline();
          console.log('Cargo exitosamente..!');
          
        } 
      });
     }

     ngOnInit(): void {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true,  };
  
        this.pageSettings = { pageSizes: true, pageSize: 10 };
        this.filterOptions = {
          type: 'Menu',
       };
  
       this.ChargeDataAirline();
       
       this.commands = [
        { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
        { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-icons e-delete' } },
        // { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
        // { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' }}
      ];
    }

    rowSelected(args: RowSelectEventArgs) {
      // const rowHeight: number = this.grid!.getRows()[this.grid.getSelectedRowIndexes()[0]].scrollHeight;
      // this.grid.getContent().children[0].scrollTop = rowHeight * this.grid.getSelectedRowIndexes()[0];
    }

    public actionBegin(args) {
      if (( args.requestType === 'beginEdit')) {
        args.cancel = true;

        this.select = true;
        
      //  this.airlinePopup.openWindowForm(args.rowData);
       this.dialogEdit.openWindowForm(args.rowData);

      // let data = args.rowData

      //  const dialogRef = this.dialogmaterial.open(AirlineEditComponent, { data, });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      // });
  
      }
      if (( args.requestType === 'delete')) {
  
        
        Swal.fire({
          title: '¿Estás seguro que quieres eliminar el Reporte?',
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
  
            this.http.get(this.api.apiUrlNode1 + "/api/deleteAirline?Id=" + args.data[0].Id)
            .subscribe((res: any) => {
              this.ChargeDataAirline();
              Swal.fire('¡Se Eliminó Exitosamente', 'success');
  
            });
  
            this.ChargeDataAirline();
          }
  
  
         });
        args.cancel = true;
        }
  };
  
    ChargeDataAirline() {
      this.http.get(this.api.apiUrlNode1 + '/api/airlinePia')
      .subscribe((res: any) => {
        this.dataAirline = res;
      });
    }
  
    // openWindowForm() {
    //   this.windowService.open(AirlineCreateComponent, { title: `` });
    // }

    openFormCreate() {
      this.dialogCreate.openDialog();
      }
  
    ngOnDestroy() {
      this.alive = false;
    }

}
