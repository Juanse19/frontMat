import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import {ApiGetService} from '../../../@auth/components/register/apiGet.services';
import { Router, ActivatedRoute } from '@angular/router';
import * as crypto from 'crypto-js'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import Swal from 'sweetalert2';

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

  get Value() { return this.licenForm.get('Value'); }

  constructor(
    private api: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private apiGetComp: ApiGetService,
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

    this.apiGetComp.GetJson(this.api.apiUrlNode1 +'/api/getlicenses').subscribe((res: any) => {
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
    // debugger
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
  
        this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/api/updatelicens', respons)
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
    
    // else {
    //   this.textoDesencriptado = crypto.AES.decrypt(this.destexto.trim(), this.desPass.trim()).toString(crypto.enc.Utf8);
    // }
}

ngOnDestroy(): void {
    this.alive = false;
  }

}
