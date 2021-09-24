import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import {ApiGetService} from '../../../@auth/components/register/apiGet.services';
import { Router, ActivatedRoute } from '@angular/router';
import * as crypto from 'crypto-js'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { NbAccessChecker } from '@nebular/security';
import { UserStore } from '../../../@core/stores/user.store';

interface licens {
  // Id: string;
  // Parameter: string;
  Value?: string;
}

let MAKEData: licens
{

};
let win:NbWindowRef;
@Component({
  selector: 'ngx-edit-licen',
  templateUrl: './edit-licen.component.html',
  styleUrls: ['./edit-licen.component.scss']
})
export class EditLicenComponent implements OnInit {

  enctexto: string;
  destexto: string;
  encPass: string;
  desPass: string = 'Matec2021*';
  textoEncriptado: string;
  textoDesencriptado: string;
  private alive = true;
  submitted: boolean = false;
  licenForm: FormGroup;
  public licesData: licens[]=[];
  public select = false;
  mostrar: Boolean;

  get Value() { return this.licenForm.get('Value'); }

  constructor(
    private api: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private apiGetComp: ApiGetService,
    public accessChecker: NbAccessChecker,
    private userStore: UserStore,
  ) { }

  open(){ 
    // console.log('modal');
  }

  ngOnInit(): void {
    this.convertirTexto;
    this.initUserForm();
    this.loadLices();
  }

  initUserForm() {
    this.licenForm = this.fb.group({
     
      Value: this.fb.control('', [ Validators.min(1),Validators.max(120)])
    }); 
  } 

  back() {
    // this.mostrar= false;
    this.router.navigate(['/pages/users/licenses']);
  }

  backs(){
    win.close();
  }

  loadLices(){

    this.apiGetComp.GetJson(this.api.apiUrlNode +'/api/getlicenses').subscribe((res: any) => {
      // this.licesData.values = res[0].Value;
      this.licesData.values = crypto.AES.decrypt(res[0].Value.trim(), this.desPass.trim()).toString(crypto.enc.Utf8);
     
      // console.log('Licencia Encriptada: ', res[0].Value);
      
      // console.log('Licencias Desencriptada: ', this.licesData.values);
      
      this.licenForm.setValue({
      Value: this.licesData.values ? this.licesData.values : '',
    });

    });

    // this.licenForm.setValue({
    //   Values: this.licesData.values ? this.licesData.values : ''
    // });
  }

  convertirTexto(conversion: string) {

    if (this.encPass === '') {
      alert('por favor ingresa la password');
    } else if (this.encPass === null) {
      alert('por favor ingresa la contraseña');
    } else if (this.encPass == undefined) {
      // alert('por favor ingresa la contraseña');
      Swal.fire({
        icon: 'error',
        timer: 2000,
        title: 'Oops...',
        text: 'Por favor ingresa la clave!'
      })
    } else {
    if (this.licenForm.valid) {
      if (conversion === 'encriptar') {
        if (this.encPass.trim() === this.desPass.trim()) {
          this.textoEncriptado = crypto.AES.encrypt(this.enctexto.trim(), this.encPass.trim()).toString();
        // console.log('encrip', this.textoEncriptado);
  
        let respons =
        {
          Value: this.textoEncriptado
        }
  
        this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/updatelicens', respons)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            this.toastrService.success('', '¡Se edito licencia con exito!'); 
            this.back();
            }); 
  
        // console.log('info licens', respons);
      
        } else {
          // this.toastrService.danger('', 'No conincide la contraseña.');
          Swal.fire({
            icon: 'error',
            timer: 2000,
            title: 'Oops...',
            text: 'Clave incorrecta!'
          })
        }
        
      } 
    } else {
      console.log('Not');
      
    }
  }

}

reconocer() {

  
  this.accessChecker.isGranted('edit', 'ordertable')
  .pipe(takeWhile(() => this.alive))
  .subscribe((res: any) => {
    if(res){ 
    Swal.fire({
    title: 'Desea Eliminar los datos del WCS?',
    text: `¡Eliminará toda la información!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, Eliminar!'
  }).then(result => {
    debugger 
    if (result.value) {
      debugger

      const currentUserId = this.userStore.getUser().id;
    const currentUser = this.userStore.getUser().firstName;
  // console.log("este es el usuario: ",this.userStore.getUser().firstName);
  var respons = 
  {
    user: currentUser,
    message:"Eliminó todo el WCS",
    users: currentUserId,  
};
  this.apiGetComp.PostJson(this.api.apiUrlNode + '/postSaveAlarmUser', respons)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
        //  console.log("Envió: ", res);
      });

      this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/deleteallposition')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
    });
 
       Swal.fire('¡Se Eliminaron Exitosamente', 'success');
       
   }
 });
         
       this.select = false;
       this.mostrar = false;
     }else {
       this.select=true;
       this.mostrar=true;
     }
   });
   
}

ngOnDestroy(): void {
    this.alive = false;
  }

}
