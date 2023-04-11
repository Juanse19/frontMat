import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandColumnService, CommandModel, EditService, FilterSettingsModel, GridComponent, PageService, RowSelectEventArgs, SortService, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs/Observable';
import { takeWhile } from 'rxjs/operators';
import { UserRoleService } from '../../../@core/backend/common/services/user-role.service';
import { UserRole } from '../../../@core/interfaces/common/userRole';
import { Router } from '@angular/router';
import { InitUserService } from '../../../@theme/services/init-user.service';
import { NbAuthService } from '@nebular/auth';


@Component({
  selector: 'ngx-user-roles',
  templateUrl: './user-roles.component.html',
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService, UserRoleService],
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  public alive = true;
  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
  public pageSettings: Object;
  public filterOptions: FilterSettingsModel;
  public commands: CommandModel[];

  public uRoleData: Observable<UserRole[]>
  public uRoleDataV1$: Observable<any>
  public access: any;

  @ViewChild('grid') public grid: GridComponent;

  constructor(private userRoleService: UserRoleService, 
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
    this.getUserR();

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
      allowEditOnDblClick: false
    };
    this.pageSettings = {
      pageSizes: true,
      pageSize: 10
    };
    this.filterOptions = {
      type: 'Menu',
    };

    this.commands = [
      {
        type: 'Edit',
        buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' }
      }
    ];

  }

  rowSelected(args: RowSelectEventArgs) {
    // const rowHeight: number = this.grid!.getRows()[this.grid.getSelectedRowIndexes()[0]].scrollHeight;
    // this.grid.getContent().children[0].scrollTop = rowHeight * this.grid.getSelectedRowIndexes()[0];
  }

  getUserR() {

    this.userRoleService.getUserRol()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.uRoleData = res.Users
      });

    // this.uRoleDataV1$ = this.userRoleService.getUserRole().pipe(takeWhile(() => this.alive));
  }


  actionBegin(args) {

    if (args.requestType === "beginEdit") {
      args.cancel = true;
      if (this.access?.includes('userRole.edit')) {
        const { rowData } = args

        this.router.navigate([`pages/roles/role-assignation/${rowData.Id}`])
      }
      
    }

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
