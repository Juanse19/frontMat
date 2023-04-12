import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import Swal from 'sweetalert2'; 

import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../dashboard/services/MessageService';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EdittargetATRComponent } from '../edittarget-atr/edittarget-atr.component';
import { NbAuthService } from '@nebular/auth';

interface make {
  Value?: string;
}

interface carr {
  text: string;
  id: string;
  color: string;
}

let MAKEData: make
{

};


@Component({
  selector: 'ngx-target-atr',
  templateUrl: './target-atr.component.html',
  styleUrls: ['./target-atr.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class TargetATRComponent implements OnInit {

  targetFrom?: FormGroup;
  private alive = true;
  public targetATR: make[]=[];
  message: string;

  get Value() { return this.targetFrom.get('Value'); }

  subscription: Subscription;

  public access?: any;

  @ViewChild(EdittargetATRComponent) dialogEdit: EdittargetATRComponent;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private editTarget: EdittargetATRComponent,
    private messageService: MessageService,
    private authService: NbAuthService) {
      this.loadData()
      this.authService.getToken()
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          this.access = res.accessTokenPayload.user.access;
        });
    }

    loadData(){
      this.subscription = this.messageService.onMessage()
      .pipe(takeWhile(() => this.alive))
      .subscribe(message => {
        if (message.text=="PackageUpdate") {

          this.loadTargetATR();
          // console.log('Cargo exitosamente..!');
          
        } 
      });
     }

  ngOnInit(): void {
    this.message = 'Parámetro con el cual se compara la eficiencia real vs la eficiencia calculada para los ATR’s en los reportes.';

    this.targetFrom = this.fb.group({
     
      Value: this.fb.control('', [ Validators.required]),
      
    }); 

    this.loadTargetATR();

  }

  loadTargetATR(){

    this.apiGetComp.GetJson(this.api.apiUrlNode1 +'/api/targetatr').subscribe((res: any) => {

      this.targetATR = res[0].Value;
      
      this.targetFrom.setValue({
      Value: this.targetATR ? this.targetATR : ''
    });

    });
  }

  editMake() {
    // this.editTarget.editUp(this.targetATR);
    this.dialogEdit.editUp(this.targetATR);
  }


  ngOnDestroy(): void {
    this.alive = false;
  }

}
