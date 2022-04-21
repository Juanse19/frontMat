import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import {ApiGetService} from '../../../@auth/components/register/apiGet.services';
import { NbAccessChecker } from '@nebular/security';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDateService, NbToastrService, NbWindowService } from '@nebular/theme';
import * as crypto from 'crypto-js'; 
import { EditLicenComponent } from '../edit-licen/edit-licen.component'
import Swal from 'sweetalert2'; 

interface licens {
  // Id: string;
  // Parameter: string;
  Value?: string;
}

let MAKEData: licens
{

};
@Component({
  selector: 'ngx-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class LicenseComponent implements OnInit {

  licenForm: FormGroup;
  public select = false;
  private alive = true;
  mostrar: Boolean;
  public licesData: licens[]=[];
  desPass: string = 'Matec2021*';

  get Value() { return this.licenForm.get('Value'); }

  @ViewChild(EditLicenComponent, { static: true }) public modal: EditLicenComponent;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    public accessChecker: NbAccessChecker,
    private toasterService: NbToastrService,
    private windowService: NbWindowService,
    protected dateService: NbDateService<Date>
  ) { 

    // this.apiGetComp.GetJson(this.api.apiUrlNode1 +'/api/getlicenses').subscribe((res: any) => {
    //   // this.licesData.values = res[0].Value;
    //   this.licesData.values = crypto.AES.decrypt(res[0].Value.trim(), this.desPass.trim()).toString(crypto.enc.Utf8);
     
    //   console.log('Licencia Encriptada: ', res[0].Value);
      
    //   console.log('Licencias Desencriptada: ', this.licesData.values);
      

    // });
    // console.log(crypto.SHA512("string a encriptar").toString()); 
    this.accessChecker.isGranted('edit', 'users').subscribe((res: any) => {
      if(res){ 
        this.select = false;
        this.mostrar = false;
      }else {
        this.select=true;
        this.mostrar=true;
      }
      
    });
  }

  ngOnInit(): void {
    this.initUserForm();
    this.loadLices();
  }

  initUserForm() {
    this.licenForm = this.fb.group({
     
      Value: this.fb.control('', [ Validators.min(1),Validators.max(120)]),
      
    }); 
  } 

  loadLices(){

    this.apiGetComp.GetJson(this.api.apiUrlNode1 +'/api/getlicenses').subscribe((res: any) => {
      // this.licesData.values = res[0].Value;
      this.licesData.values = crypto.AES.decrypt(res[0].Value.trim(), this.desPass.trim()).toString(crypto.enc.Utf8);
     
      // console.log('Licencia Encriptada: ', res[0].Value);
      
      // console.log('Licencias Desencriptada: ', this.licesData.values);
      
      this.licenForm.setValue({
      Value: this.licesData.values ? this.licesData.values : ''
    });

    });

    // this.licenForm.setValue({
    //   Values: this.licesData.values ? this.licesData.values : ''
    // });
  }

  back() {
    // this.mostrar= false;
    this.router.navigate(['/pages/users/list']);
  }

  handleSuccessResponse() {
    this.toasterService.success('', '¡Guardado con exito!' );
    this.back();
  }
   
  handleWrongResponse() {
    this.toasterService.danger('', 'Error almacenando ');
  }

  edit(){
    this.router.navigate(['/pages/users/editlicen']);
  }

  modals(){

    let contraseña 

    Swal.fire({
      title: 'Ingresa contraseña',
      input: 'password',
      icon: 'warning',
      inputLabel: 'contraseña',
      inputPlaceholder: 'Ingresa contraseña',
      inputValidator: (value) => {
        if (!value) {
          return '¡Necesitas escribir algo!'
        }
      }
    }).then(result => {
      // debugger
      if (result.value) {
        if (this.desPass.trim() === result.value) {
          this.toasterService.success('', '¡Puede acceder a editar licencias!'); 
          this.edit();
        } else {
          
          Swal.fire(
            'Error',
            'Contraseña incorrecta :)',
            'error'
          )
        }
        
      }
    
        
     });
  }

  ClicModal() {
    this.modal.open();
    }

    openWindowForm() {
      this.windowService.open(EditLicenComponent, { title: `` });
    }

  saveData(){
  debugger
    let formulario = this.licenForm.value;
  
    if(formulario.Value){
  
    MAKEData = {
      // Parameter: 'Matec',
      Value: formulario.Value
    }
    debugger
    if (MAKEData == undefined) {
      this.handleWrongResponse();
    }else{
      this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/api/postdatalicens', MAKEData).subscribe((res:any)=>{
      this.handleSuccessResponse();
    });
  }
    
  } 
    
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
