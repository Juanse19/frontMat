import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import {
  SortService,
  EditService, CommandColumnService, CommandModel, ToolbarService, PageService, ToolbarItems, GridComponent, FilterSettingsModel, RowSelectEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { takeWhile } from 'rxjs/operators';
import { MaintenanceService } from '../../../@core/backend/common/services/maintenance.service';
import Swal from 'sweetalert2';
import { WindowMaintenanceComponent } from '../window-maintenance/window-maintenance.component';
import { Subscription } from 'rxjs';
import { MessageService } from '../../dashboard/services/MessageService';
import { maintenance } from '../interface/maintenance.interface';

@Component({
  selector: 'ngx-maintenance-table',
  templateUrl: './maintenance-table.component.html',
  styleUrls: ['./maintenance-table.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
})
@Injectable({
  providedIn: 'root'
})
export class MaintenanceTableComponent implements OnInit {
 
  public dataMaintenanceGrid?: maintenance[];
  public alive = true;
  public select = false;
  public commands: CommandModel[];
  public editSettings: Object;
  public pageSettings: Object;
  public toolbar!: ToolbarItems[] | object;
  public filterOptions: FilterSettingsModel;
  public access?: any;

  subscription: Subscription;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild(WindowMaintenanceComponent) dialogEdit?: WindowMaintenanceComponent;

  constructor(private router: Router,
    private maintenanceService: MaintenanceService,
    private messageService: MessageService,
    private authService: NbAuthService) {

      this.loadData();
      this.select = false;

    this.authService.getToken()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.access = res.accessTokenPayload.user.access;
      });
      
  }

  loadData(){
    this.subscription = this.messageService.onMessage()
    .pipe(takeWhile(() => this.alive))
    .subscribe(message => {
      if (message.text=="PackageUpdate") {

        this.getMaintenanceData();
        console.log('Cargo exitosamente..!');
        
      } 
    });
   }

  ngOnInit(): void {

    this.editSettings = {
      allowEditing: true,
      // allowAdding: true,
      allowDeleting: true,
      // mode: 'Normal',
      // allowEditOnDblClick: false
    };
    this.pageSettings = {
      pageSizes: true,
      pageSize: 10
    };
    this.filterOptions = {
      type: 'Menu',
    };

    this.getMaintenanceData()

    this.commands = [
    { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },];

  }

  rowSelected(args: RowSelectEventArgs) {
    // const rowHeight: number = this.grid!.getRows()[this.grid.getSelectedRowIndexes()[0]].scrollHeight;
    // this.grid.getContent().children[0].scrollTop = rowHeight * this.grid.getSelectedRowIndexes()[0];
  }

  actionBegin(args: any) {

    if (args.requestType === "beginEdit") {
      args.cancel = true;
      if (this.access?.includes('role.edit')) {
        args.cancel = true;
        this.select = true;
        
        this.dialogEdit.openWindowForm(args.rowData);
      }

    }

    // if (args.requestType === "delete") {
    //   args.cancel = true;
    //   if (this.access?.includes('role.delete')) {
    //     const { Id, Name } = args.data[0]


    //     Swal.fire({
    //       title: 'Desea Borrar este role?',
    //       text: `¿Desea el role #${Id} - ${Name}?`,
    //       icon: 'error',
    //       timer: 3500,
    //       showCancelButton: true,
    //       showConfirmButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       cancelButtonText: "No, Eliminar",
    //       confirmButtonText: '¡Sí, Eliminar!',
    //     }).then((result) => {

    //       if (result.isConfirmed) {

    //         // this.roleCrud.deleteRole(Id)
    //         //   .pipe(takeWhile(() => this.alive))
    //         //   .subscribe(res => {
    //         //     this.getRolesData()
    //         //     Swal.fire({
    //         //       title: 'Se elimino correctamente',
    //         //       icon: 'success',
    //         //       timer: 2500,
    //         //     });
    //         //   }, err => {
    //         //     console.log(err)
    //         //     Swal.fire({
    //         //       title: 'Hubo un error',
    //         //       text: "Intentelo nuevamente",
    //         //       icon: 'error',
    //         //       timer: 2500,
    //         //     });
    //         //   })
    //       }

    //     })
    //     args.cancel = true;
    //   }

    // }
  }


  getMaintenanceData() {
    this.maintenanceService.getMaintenance()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.dataMaintenanceGrid = res
      });

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
