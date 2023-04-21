/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, ViewChild } from '@angular/core';

import { takeUntil, takeWhile } from 'rxjs/operators';
import { UserData } from '../../../@core/interfaces/common/users';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import {
  NgxFilterByNumberComponent,
} from '../../../@components/custom-smart-table-components/filter-by-number/filter-by-number.component';
import { UserStore } from '../../../@core/stores/user.store';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import Swal from 'sweetalert2';
import { EditService, ToolbarService, PageService, NewRowPosition, FilterSettingsModel, ToolbarItems, EditEventArgs, CommandModel, CommandColumnService, GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from '../../../@core/backend/common/services/users.service'
import { User } from '../../../@core/interfaces/common/users'
import { NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

interface UserChange {
  id: number,
  login: string,
  firstName: string,
  lastName: string,
  email: string,
  states: number,
  licens_id: string,
}

@Component({
  selector: 'ngx-users-table',
  templateUrl: './users-table.component.html',
  providers: [ToolbarService, EditService, PageService, CommandColumnService],
  styleUrls: ['./users-table.component.scss'],

})
export class UsersTableComponent implements OnDestroy {

  private alive = true;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
  public editparams: Object;
  // public pageSettings: Object;
  public filterOptions: FilterSettingsModel;
  public commands: CommandModel[];
  public userData: User[];
  public usersChange: UserChange[]

  @ViewChild('grid')
  public grid: GridComponent;

  public source: DataSource;
  public access?: any;

  constructor(
    private usersService: UserData,
    private User: UsersService,
    private router: Router,
    private toastrService: NbToastrService,
    private userStore: UserStore,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private authService: NbAuthService,
    private http: HttpClient,
  ) {
    this.loadData();
    this.authService.getToken()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res:any) => {
        this.access = res.accessTokenPayload.user.access;
      });
  }

  ngOnInit(): void {

    this.changeUser();

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
      allowEditOnDblClick: false
    };
    // this.pageSettings = { 
    //   pageSizes: true, 
    //   pageSize: 10 };
    this.filterOptions = {
      type: 'Menu',
    };
    //  this.editSettings = { allowEditing: true, allowAdding: false, allowDeleting: true , newRowPosition: 'Top' };
    //  this.toolbar = [{text: 'Edit'},{text: 'Delete'}];
    //  this.users();

    this.commands = [
      {
        type: 'Edit',
        buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' }
      },
      {
        type: 'Delete',
        buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' }
      }
    ];

  }

  public get value(): string {
    return
  }

  loadData() {
    this.source = this.usersService.gridDataSource;

  }

  rowSelected(args: RowSelectEventArgs) {
    const rowHeight: number = this.grid.getRows()[this.grid.getSelectedRowIndexes()[0]].scrollHeight;
    this.grid.getContent().children[0].scrollTop = rowHeight * this.grid.getSelectedRowIndexes()[0];
  }

  changeUser() {
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/api/users')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.usersChange = res
        // console.log("Users change: ", this.usersChange);
      });
  }

  users() {
    this.http.get(`${this.api.apiUrl}/users`)
    .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        //  console.log("Users: ", res);
        let datav = res.items ? res.items : res.Users;
        this.userData = datav;
        // console.log("Users: ", this.userData);

      });
  }

  createUser() {
    this.router.navigate(['/pages/users/add/']);
  }

  onEdit($event: any) {
    this.router.navigate([`/pages/users/edit/${$event.data.id}`]);
  }

  actionBegin(args) {
    if (args.requestType == 'beginEdit') {
      args.cancel = true;
      if (this.access?.includes('user.edit')) {
        this.router.navigate([`/pages/users/edit/${args.rowData.id}`]);
        args.cancel = true;
      }
    }
    if ((args.requestType === 'delete')) {
      args.cancel = true;
      
      if (this.access?.includes('user.delete')) {
        const Id = 'Id';
        const { id } = args.data[0]

      if (args.data[0].id === this.userStore.getUser().id) {
        return Swal.fire('Error', 'No puede borrar el usuario logueado', 'error');
      }

      Swal.fire({
        title: '¿Estás seguro que quieres eliminar el Usuario?',
        text: `¡Se eliminará el usuario!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, Eliminar!',
        cancelButtonText: "No, Eliminar",
      }).then(result => {
        // debugger
        if (result.value) {
          this.usersService
            .delete(args.data[0].id)
            .pipe(takeWhile(() => this.alive))
            .subscribe((res) => {
              this.changeUser();

              Swal.fire({
                title: 'Se eliminó exitosamente',
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
            });
        }


      });
      args.cancel = true;
    }
  }

  }

  onDelete(args) {

    Swal.fire({
      title: '¿Estás seguro que quieres eliminar el Usuario?',
      text: `¡Se eliminará el usuario!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!'
    }).then(result => {
      // debugger
      if (result.value) {
        this.usersService
          .delete(args.data[0].Id)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res) => {
            const currentUserId = this.userStore.getUser().id;
            const currentUser = this.userStore.getUser().firstName;
            // console.log("este es el usuario: ",this.userStore.getUser().firstName);
            var respons =
            {
              user: currentUser,
              message: "Elimino un usuario",
              users: currentUserId,
            };
            this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/postSaveAlarmUser', respons)
              .pipe(takeWhile(() => this.alive))
              .subscribe((res: any) => {
                //  console.log("Envió: ", res);
              });

            Swal.fire('¡Se Eliminó Exitosamente', 'success');
            this.source.refresh();
          });
      }


    });

  }

  add() {
    // return this.router.navigateByUrl('/auth/register');
    this.router.navigate(['/pages/users/add/']);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private customDisplay(conditionValue: any, displayValue: string) {
    return conditionValue ? displayValue : '';
  }
}
