
// import { states } from './../../conveyor/_interfaces/MatBag.model';
/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { takeUntil, takeWhile} from 'rxjs/operators';

import { NbToastrService } from '@nebular/theme';

import {User, UserData} from '../../../@core/interfaces/common/users';
import {EMAIL_PATTERN, NgxResetPasswordComponent, NUMBERS_PATTERN} from '../../../@auth/components';
import {NbAuthOAuth2JWTToken, NbTokenService} from '@nebular/auth';
import {UserStore} from '../../../@core/stores/user.store';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import {ApiGetService} from '../../../@auth/components/register/apiGet.services';
import { NbAccessChecker } from '@nebular/security';
import * as crypto from 'crypto-js'; 
import { getDeepFromObject } from '../../../@auth/helpers';
import { NB_AUTH_OPTIONS, NbAuthSocialLink, NbAuthService, NbAuthResult } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';


interface Roles {
  id?: number;
  name: string;
}

interface licens {
  Id?: string;
  Parameter?: string;
  Value?: string;
}

interface states {
  states: string;
  Name: string;
}

interface licensActive {
  Licens_id: number;
}

interface licen {
  Value: string;
}

let LICENS: licen[] = [

];

let LICENDa: licen; 

let IDLICEN: number;

export enum UserFormMode {
  VIEW = 'View',
  EDIT = 'Editar',
  ADD = 'Agregar',
  EDIT_SELF = 'Editar propio',
}

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class UserComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  selectedRole;
  selectedLis;
  selectedState;
  listaRoles:Roles[]=[];
  listaLicens:states[]=[];
  listaUsers:states[]=[];
  licenTotalData: licen[]=[];
  licData = IDLICEN;
  licenAcitveTotalData: any;
  public select = false;
  public selectLicen: Boolean;
  private alive = true;
  mostrar: Boolean;
  ocultar: Boolean;
  isDisabled: Boolean;
  desPass: string = 'Matec2021*';
  
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  

  protected readonly unsubscribe$ = new Subject<void>();

  get firstName() { return this.userForm.get('firstName'); }

  get lastName() { return this.userForm.get('lastName'); }

  get login() { return this.userForm.get('login'); }
  
  get role() { return this.userForm.get('role'); }

  get email() { return this.userForm.get('email'); }

  get password() { return this.userForm.get('password'); }

  get confirmPassword() { return this.userForm.get('confirmPassword'); }

  get age() { return this.userForm.get('age'); }

  get state() { return this.userForm.get('state'); }

  get licens() { return this.userForm.get('licens'); }

  get street() { return this.userForm.get('address').get('street'); }

  get city() { return this.userForm.get('address').get('city'); }

  get zipCode() { return this.userForm.get('address').get('zipCode'); }

  

  mode: UserFormMode;
  setViewMode(viewMode: UserFormMode) {
    this.mode = viewMode;
  }

  constructor(
              public accessChecker: NbAccessChecker,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              private usersService: UserData,
              private router: Router,
              private route: ActivatedRoute,
              private tokenService: NbTokenService,
              private userStore: UserStore,
              private toasterService: NbToastrService,
              private fb: FormBuilder,
              private httpService: HttpService,
              private apiGetComp: ApiGetService,
              private api: HttpService,
              private http: HttpClient,
              public resetPassword: NgxResetPasswordComponent) {

                this.http.get(this.api.apiUrlNode +'/api/getvalidation')
                .pipe(takeWhile(() => this.alive))
                .subscribe((res: any) => {
                  this.licenAcitveTotalData=res[0]?.Licens_id;
                  console.log('getvalidation', this.licenAcitveTotalData);
                });

                this.http.get(this.api.apiUrlNode +'/api/getroles')
                .pipe(takeWhile(() => this.alive))
                .subscribe((res: any) => {
                  // console.log('getroles', this.listaRoles);
                  this.listaRoles=res;
                });

                this.http.get(this.api.apiUrlNode +'/api/getuserstate')
                .pipe(takeWhile(() => this.alive))
                .subscribe((res: any) => {
                  // console.log('getuserstate', this.listaLicens);
                  this.listaUsers=res;
                  this.listaLicens=res;
                });

                this.apiGetComp.GetJson(this.api.apiUrlNode +'/api/getlicenses').subscribe((res: any) => {
                  // console.log('getlicenses', this.licData);
                  this.licData = crypto.AES.decrypt(res[0].Value.trim(), this.desPass.trim()).toString(crypto.enc.Utf8);
                  
                });

                
                
                // this.accessChecker.isGranted('edit', 'users').subscribe((res: any) => {
                //   if(res){ 
                //     this.select = false;
                //     this.mostrar = false;
                //   }else {
                //     this.select=true;
                //     this.mostrar=true;
                //     this.selectLicen = true;
                //     this.isDisabled = true;
                //   }
                // });
  }

  ngOnInit(): void {
    this.initUserForm();
    this.loadUserData();
  }

  initUserForm() {

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.userForm = this.fb.group({
      id: this.fb.control(''),
      // role: this.fb.control(''),
      licens: new FormControl(0, Validators.required),
      state: this.fb.control(0, Validators.required),
      firstName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      login: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      age: new FormControl(0, Validators.required),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
      address: this.fb.group({
        street: this.fb.control(''),
        city: this.fb.control(''),
        zipCode: this.fb.control(''),
      }),
    }); 
  }

  get canEdit(): boolean {
    return this.mode !== UserFormMode.VIEW;
  }

  

  loadUserData() {
    const id = this.route.snapshot.paramMap.get('id');
    const isProfile = this.route.snapshot.queryParamMap.get('profile');
    if (isProfile) {
      this.setViewMode(UserFormMode.EDIT_SELF);
      this.loadUser();
    } else {
      if (id) {
        // const currentUserId = this.userStore.getUser().id;
        // this.setViewMode(currentUserId.toString() === id ? UserFormMode.EDIT_SELF : UserFormMode.EDIT);
        this.loadUser(id);
      } else {
        this.setViewMode(UserFormMode.ADD);
        this.ocultar=true;
        
      }
    }
  }

  loadUser(id?) {
    console.log(id);
    
    const loadUser = this.mode === UserFormMode.EDIT_SELF
      ? this.usersService.getCurrentUser() : this.usersService.get(id);
    loadUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => { 
        // debugger
        if(user.licens_id === null )
          {
            this.apiGetComp.GetJson(this.api.apiUrlNode +'/userrole/getrolebyuser?idUser='+user.id)
            .pipe(takeWhile(() => this.alive))
            .subscribe((res: any) => {
              // console.log('data Rols: ', res);
              console.log('si');
              if (res == undefined) {
                return user.role = '';
              }  
              else if (res.length == 0) {
                // console.log('No hay rol');
              }
              else {
                user.role=res[0].name;
              }
              // debugger
              if (this.licenAcitveTotalData >= this.licData || user.licens_id == undefined ) {
                // console.log('no tienes mas licencias');
                if (user.licens_id == 2) {
                  this.selectLicen=true;
                } else if (user.licens_id == undefined) {
                  this.selectLicen=true;
                } else if (user.licens_id == 0) {
                  this.selectLicen=true;
                }
                
              } 

              // console.log('data rol:', user.role);
              // console.log('data rol:', user.role, 'DataLicens:', user.licens_id);
             
            this.userForm.setValue({
              id: user.id ? user.id : '',
              // role: user.role ? user.role : '',
              firstName: user.firstName ? user.firstName : '',
              lastName: user.lastName ? user.lastName : '',
              login: user.login ? user.login : '',
              age: user.age ? user.age : '',
              state: user.states ? user.states : '',
              licens: user.licens_id ? user.licens_id : '',
              email: user.email,
              
              address: {
                street: (user.address && user.address.street) ? user.address.street : '',
                city: (user.address && user.address.city) ? user.address.city : '',
                zipCode: (user.address && user.address.zipCode) ? user.address.zipCode : '',
              },
            });
          },
        );
          }  else {
            // }
            // this.apiGetComp.GetJson(this.api.apiUrlNode +'/userrole/getrolebyuser?idUser='+user.id)
            // .pipe(takeWhile(() => this.alive))
            // .subscribe((res: any) => {
          
              console.log('no');
              console.log('licenAcitveTotalData', this.licenAcitveTotalData, 'licData', this.licData);
              
              
              // if (res == undefined) {
              //   return user.role = '';
              // }  
              // else if (res.length == 0) {
              
              // }
              // else {
              //   user.role=res[0].name;
              // }
              if (this.licenAcitveTotalData >= this.licData) {
               
                if (user.licens_id == 2) {
                  this.selectLicen=true;
                  this.userForm.controls.licens.disable();
                } else if (user.licens_id == undefined) {
                  this.selectLicen=true;
                } else if (user.licens_id == 0) {
                  this.selectLicen=true;
                }
                
              }  

            this.userForm.setValue({
              id: user.id ? user.id : '',
              // role: user.role ? user.role : '',
              firstName: user.firstName ? user.firstName : '',
              lastName: user.lastName ? user.lastName : '',
              login: user.login ? user.login : '',
              age: user.age ? user.age : 0,
              state: user.states ? user.states : '',
              licens: user.licens_id ? user.licens_id : '',
              email: user.email,
              password: '123456',
              confirmPassword: '123456',
              address: {
                street: (user.address && user.address.street) ? user.address.street : '',
                city: (user.address && user.address.city) ? user.address.city : '',
                zipCode: (user.address && user.address.zipCode) ? user.address.zipCode : '',
              },
            });
          // },
        // );
     }
  
      });
  }


  convertToUser(value: any): User {
    const user: User = value;
    return user;
  }

  changepass(){
    this.router.navigate(['/auth/reset-password/'+this.userForm.value.id]);
  }

  save() {
    const user: User = this.convertToUser(this.userForm.value);
  
    console.log(user);
    
    
    if (this.licenAcitveTotalData >= this.licData) {
 
      if (user.licens_id == 2) {
        this.selectLicen=true;
      }
    } else {
      console.log('aun tenes licencias');
      
    }

    let observable = new Observable<User>();
    if (this.mode === UserFormMode.EDIT_SELF) {
      
    //   const currentUserId = this.userStore.getUser().id;
    //   const currentUser = this.userStore.getUser().firstName;

    //   var respons = 
    //     {
    //         user: currentUser,
    //         message:"Edito usuario", 
    //         users: currentUserId,
    // };
    //   this.apiGetComp.PostJson(this.api.apiUrlNode + '/postSaveAlarmUser', respons)
    //     .pipe(takeWhile(() => this.alive))
    //     .subscribe((res: any) => {
       
    //       }); 
          
          

      this.usersService.updateCurrent(user)
      .pipe(takeWhile(() => this.alive))
      .subscribe((result: any) => {   
      
    //   this.apiGetComp.PostJson(this.api.apiUrlNode + '/update', user)
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((res: any) => {
        
    //   });
     
    //   var respon = 
    //   {
    //       user: user.id,
    //       sesion: 0, 
          
    // };
    // this.apiGetComp.PostJson(this.api.apiUrlNode + '/updateSesion', respon)
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((res: any) => {
      
    //     });

        // var userRole = {
        //   IdUser:user.id,
        //   Role:user.role
        // };
        // this.apiGetComp.PostJson(this.api.apiUrlNode + '/userrole/postupdateroleuser',userRole)
        // .pipe(takeWhile(() => this.alive))
        // .subscribe();
          // this.tokenService.set(new NbAuthOAuth2JWTToken(result, 'email', new Date()));
          this.handleSuccessResponse();
        },
        err => {
          this.handleWrongResponse();
        });
    } else {
      observable = user.id
        ? this.usersService.update(user)
        : this.usersService.create(user);
    }

    observable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        
      // this.apiGetComp.PostJson(this.api.apiUrlNode + '/update', user)
      // .pipe(takeWhile(() => this.alive))
      // .subscribe((res: any) => {
        
      // });

      
    //   var respon = 
    //   {
    //       user: user.id,
    //       sesion: 0, 
          
    // };
    // this.apiGetComp.PostJson(this.api.apiUrlNode + '/updateSesion', respon)
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((res: any) => {
    //   //  console.log("Envió: ", res);
    //     });

        // var userRole = {
        //   IdUser:user.id,
        //   Role:user.role
        // };
        // this.apiGetComp.PostJson(this.api.apiUrlNode + '/userrole/postupdateroleuser',userRole)
        // .pipe(takeWhile(() => this.alive))
        // .subscribe();

        this.handleSuccessResponse();
      },
      err => {
      this.handleWrongResponse();
    });
  // }
  }

  handleSuccessResponse() {
    this.toasterService.success('', `Usuario ${this.mode === UserFormMode.ADD ? 'Creado' : 'Actualizado'}!`);
    this.back();
  }

  handleWrongResponse() {
    this.toasterService.danger('', `¡Este correo electrónico ya existe!`);
  }

  back() {
    
    this.router.navigate(['/pages/users/list']);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.alive = false;
  }
}
