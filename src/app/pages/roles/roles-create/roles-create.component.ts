import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import Swal from "sweetalert2";
import { RoleCrudService } from "../../../@core/backend/common/services/role-crud.service";
import { RoleAccess } from "../../../@core/interfaces/common/roles";

 interface RolePermission {
  id: number;
  name: string;
  permission: Permission[];
}

 interface Permission {
  IdAccess: number;
  AccestypeName?: string;
  State: boolean;
}

@Component({
  selector: "ngx-roles-create",
  templateUrl: "./roles-create.component.html",
  styleUrls: ["./roles-create.component.scss"],
})
export class RolesCreateComponent implements OnInit {

  private alive = true;
  roleForm!: FormGroup;
  idRole!: string | null;
  title = 'Crear Role';

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  
  public toggleNgModel:boolean = false;
  public checkboxToggle: boolean = false;
  public rolePermission: RolePermission
  public permissions: Permission[] = [];
  public rolesAccess?: any;
  public rolesAccessV1?: [] | object;
  public accessDa?: any;
  public accessData: any;
  public dataAccess: any

  get roleID() { return this.roleForm.get('roleID'); }
  get roleName() { return this.roleForm.get('roleName'); }

  constructor(
    private roleService: RoleCrudService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.idRole = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.getAccess();
  }

  ngOnInit(): void {
    this.initRoleAccessForm();
    
    
    
  }

  initRoleAccessForm() {
    this.roleForm = this.formBuilder.group({
      roleID: ['', Validators.required],
      roleName: ['', Validators.required],
    });
  }

  getAccess(): void {
    this.roleService.getAccess()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((res: any) => {
    this.editar(); 
      this.accessDa = res.Access
    })
  }

  editar() {
    if (this.idRole !== null && this.idRole !== undefined) {

      this.title = 'Editar Role';
      let accessData;

      this.roleService.getRolesAccessId(this.idRole)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        
        // this.rolesAccessV1 = res;
        // console.log('res', res);
        
        accessData = res
        
        const accessArray = accessData.access;
       
       this.rolesAccess = accessArray

        this.roleForm.patchValue(res);

        this.updateCheckboxes();
      });
    }
  }

  updateCheckboxes() {
    this.accessDa.forEach(option => {
      option.selected = this.rolesAccess.some(rolesAccess => rolesAccess.IdAccess === option.IdAccess);
    });
  }

  onChange() {
    
    const data = {
       
      access: this.accessDa.filter(option => option.selected)

    };

    this.dataAccess = data.access;
    // console.log('data', data);
    
  }

  accionRole() {
    if (this.idRole === null) {
      this.createRole();
    } else {
      this.editRole(this.idRole);
    }
  }

  createRole() {
    let formProducto = this.roleForm.value;
    // console.log(formProducto.access.Length != 0 ? formProducto.access : null);

    
    const dataV3 = {
      "roleID": formProducto.roleID,
      "roleName": formProducto.roleName,
      "access": this.dataAccess
    }

    console.log('dataV3', dataV3);
    let repos
    this.roleService.createRole(dataV3).subscribe((res) => 
      {
        repos = res
        Swal.fire({
          title: repos.Message,
          text: repos.response,
          icon: 'success',
          timer: 2500,
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: '¡OK!'
        })
        this.router.navigate(['/pages/roles/list']);
        
      }
      );
  }

  editRole(id?: any) {
    let formProducto = this.roleForm.value;
    
    if (this.dataAccess == undefined) {
      this.router.navigate(['/pages/roles/list']);
    } else {

      const dataV4 = {
        "roleID": formProducto.roleID,
        "roleName": formProducto.roleName,
        "access": this.dataAccess
      }
  
      console.log('dataV4', dataV4);
      let repos
      this.roleService.editRole(id, dataV4)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        repos = res
          Swal.fire({
            title: repos.Message,
            text: repos.response,
            icon: 'success',
            timer: 2500,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '¡OK!'
          })
        this.router.navigate(['/pages/roles/list']);
      });

    }

    
  }

  public ngOnDestroy(): void {
    this.alive = false;
    // This aborts all HTTP requests.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();
}
}
