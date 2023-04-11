import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleCrudService } from '../../../@core/backend/common/services/role-crud.service';
import { UsersService } from '../../../@core/backend/common/services/users.service';
import { filter, map, takeWhile } from 'rxjs/operators';
import { SwalCorrect, SwalError } from '../../../@components/swal-simple-message/swalAlerts';

interface User {
  UserId: number,
  Usuario: string,
  Role: string[]
}

@Component({
  selector: 'ngx-assing-role-users',
  templateUrl: './assing-role-users.component.html',
  styleUrls: ['./assing-role-users.component.scss']
})
export class AssingRoleUsersComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
    private roleService: RoleCrudService, 
    private userService: UsersService, 
    private _formBuilder: FormBuilder,
    private router: Router,) { }
    alive = true;
  @ViewChild("rolesForm") form: NgForm

  public userdId: string

  public userInfo: User | null = null

  public userRoles: string[]

  public rolesList: string[]

  public isSubmitAvailable: boolean = false



  getInfoUser(): void {
    this.roleService.getUserRole(Number(this.userdId))
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: User) => {
      this.userInfo = res
      this.userRoles = res.Role
    })
  }

  getRoles(): void {
    this.roleService.getRoles()
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      const roleStringArray = (res.Roles as any).map(x => x.Name)

      // console.log( roleStringArray );

      this.rolesList = roleStringArray
    })
  }

  isAvailable(form) {
    const actualRolesSelecteds: string[] = Object.entries(form.value).filter(([key, value]) => value === true).map(x => x[0]);

    return (actualRolesSelecteds.length <= 0);
  }

  assingRolesToUsers() {
    const newRoles = Object.entries(this.form.value).filter(([key, value]) => value === true).map(x => x[0]);

    this.roleService.asingRolesToUser(this.userInfo.UserId, this.userInfo.Usuario, newRoles)
    .pipe(takeWhile(() => this.alive))
    .subscribe(res => {
      SwalCorrect("Roles asignados correctamente")
      this.router.navigate(['/pages/roles/user-roles']);
    }, err => {
      SwalError("Ocurrio un error")
    }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.userdId = id

      this.getInfoUser()
    })

    this.getRoles()
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
