import { Component, OnInit, ViewChild } from '@angular/core';
import {
  SortService,
  EditService, CommandColumnService, CommandModel, ToolbarService, PageService, ToolbarItems, GridComponent, FilterSettingsModel, RowSelectEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { takeWhile } from 'rxjs/operators';
import { SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import Swal from 'sweetalert2';
import { RoleCrudService } from '../../../@core/backend/common/services/role-crud.service';
import { Router } from '@angular/router';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { InitUserService } from '../../../@theme/services/init-user.service';


@Component({
  selector: 'ngx-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
})
export class RolesTableComponent implements OnInit {

  public dataGrid
  public alive = true;
  public commands: CommandModel[];
  public editSettings: Object;
  public pageSettings: Object;
  public toolbar!: ToolbarItems[] | object;
  public filterOptions: FilterSettingsModel;
  public access?: any;

  @ViewChild('grid') public grid: GridComponent;

  constructor(private roleCrud: RoleCrudService, 
    private router: Router, 
    protected initUserService: InitUserService,
    private authService: NbAuthService) {
      this.authService.getToken()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res:any) => {
        this.access = res.accessTokenPayload.user.access;
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

    this.getRolesData()

    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];

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
        this.router.navigate([`pages/roles/edit-rol/${args.rowData.Id}`])
      }

    }

    if (args.requestType === "delete") {
      args.cancel = true;
      if (this.access?.includes('role.delete')) {
        const { Id, Name } = args.data[0]


        Swal.fire({
          title: 'Desea Borrar este role?',
          text: `¿Desea el role #${Id} - ${Name}?`,
          icon: 'error',
          timer: 3500,
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: "No, Eliminar",
          confirmButtonText: '¡Sí, Eliminar!',
        }).then((result) => {

          if (result.isConfirmed) {

            this.roleCrud.deleteRole(Id)
              .pipe(takeWhile(() => this.alive))
              .subscribe(res => {
                this.getRolesData()
                Swal.fire({
                  title: 'Se elimino correctamente',
                  icon: 'success',
                  timer: 2500,
                });
              }, err => {
                console.log(err)
                Swal.fire({
                  title: 'Hubo un error',
                  text: "Intentelo nuevamente",
                  icon: 'error',
                  timer: 2500,
                });
              })
          }

        })
        args.cancel = true;
      }

    }
  }


  getRolesData() {
    this.roleCrud.getRoles()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        console.log(res);

        this.dataGrid = res.Roles
      });

  }

  addRole() {
    this.router.navigate(['/pages/roles/create-rol/']);
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
