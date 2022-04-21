/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy } from '@angular/core';

import { takeWhile } from 'rxjs/operators';
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
import { EditService, ToolbarService, PageService, NewRowPosition, FilterSettingsModel, ToolbarItems, EditEventArgs, CommandModel, CommandColumnService } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { LocalDataSource } from 'ng2-smart-table';
import { UsersService } from '../../../@core/backend/common/services/users.service'
import { User } from '../../../@core/interfaces/common/users'

@Component({
  selector: 'ngx-users-table',
  templateUrl: './users-table.component.html',
  providers: [ToolbarService, EditService, PageService, CommandColumnService],
  styleUrls: ['./users-table.component.scss'],

})
export class UsersTableComponent implements OnDestroy {

  private alive = true;

  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
    public editparams: Object;
    public pageSettings: Object;
    public filterOptions: FilterSettingsModel;
    public commands: CommandModel[];
    public userData: User[];

  settings = {
    mode: 'external',
    actions: {
      add: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      firstName: {
        title: 'Primer nombre',
        type: 'string',
      },
      lastName: {
        title: 'Apellido',
        type: 'string',
      },
      login: {
        title: 'Usuario',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      // states: {
      //   title: 'Estado',
      //   type: 'string',
      // },
      // licens_id: {
      //   title: 'Estado',
      //   type: 'string',
      // },
      // street: {
      //   title: 'Street',
      //   type: 'string',
      //   valuePrepareFunction: (cell, element) =>
      //     this.customDisplay(element.address, element.address.street),
      // },
      // city: {
      //   title: 'City',
      //   type: 'string',
      //   valuePrepareFunction: (cell, element) =>
      //     this.customDisplay(element.address, element.address.city),
      // },
      // zipcode: {
      //   title: 'Zip Code',
      //   type: 'number',
      //   valuePrepareFunction: (cell, element) =>
      //     this.customDisplay(element.address, element.address.zipCode),
      // },
    },
  };

  public source: DataSource;

  constructor(
    private usersService: UserData,
    private User: UsersService,
    private router: Router,
    private toastrService: NbToastrService,
    private userStore: UserStore,
    private api: HttpService,
    private apiGetComp: ApiGetService
    ) {
    this.loadData(); 
  }

  ngOnInit(): void {
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
      allowEditOnDblClick: false
    };
    this.pageSettings = { 
      pageSizes: true, 
      pageSize: 10 };
    this.filterOptions = {
      type: 'Menu',
   };
  //  this.editSettings = { allowEditing: true, allowAdding: false, allowDeleting: true , newRowPosition: 'Top' };
  //  this.toolbar = [{text: 'Edit'},{text: 'Delete'}];
   this.users();

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

  public get value() : string {
    return 
  }

  loadData() {
    this.source = this.usersService.gridDataSource;
    
  }

  users(){
    this.apiGetComp.GetJson(this.api.apiUrl + '/users',)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
        //  console.log("Users: ", res.items);
        this.userData = res.items
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
      // console.log('Editar');
      // console.log('Type edit: ', args.rowData.id);
      this.router.navigate([`/pages/users/edit/${args.rowData.id}`]);
      args.cancel = true;
    }
    if (( args.requestType === 'delete')) {
      const Id = 'Id';
      // console.log('Type Delete: ', args.data[0].id);
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
                  .delete(args.data[0].id)
                  .pipe(takeWhile(() => this.alive))
                  .subscribe((res) => {
          const currentUserId = this.userStore.getUser().id;
                const currentUser = this.userStore.getUser().firstName;
        // console.log("este es el usuario: ",this.userStore.getUser().firstName);
        var respons = 
        {
          user: currentUser,
          message:"Elimino un usuario",
          users: currentUserId,   
      };
        this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/postSaveAlarmUser', respons)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
              //  console.log("Envió: ", res);
              this.users();
              this.source.refresh();
              args.cancel = false;
            });
      
            Swal.fire('¡Se Eliminó Exitosamente', 'success');
            this.source.refresh();
        });
        }
      
          
       });
      args.cancel = true;
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
    message:"Elimino un usuario",
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

  add(){
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
