import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { takeWhile } from 'rxjs/operators';
import { NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { MessageService } from '../../dashboard/services/MessageService';
import { UserStore } from '../../../@core/stores/user.store';

interface make {
  Value?: string;
}

interface carr {
  text: string;
  id: string;
  color: string;
}

let MAKEData: make

let win: NbWindowRef;

@Component({
  selector: 'ngx-edit-defaul-carrusel',
  templateUrl: './edit-defaul-carrusel.component.html',
  styleUrls: ['./edit-defaul-carrusel.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class EditDefaulCarruselComponent implements OnInit {

  editMakeForm?: FormGroup;
  private alive = true;
  public makeUpData: make;
  public carrData: carr[] = [];
  public MaData = MAKEData;

  constructor(
        private http: HttpClient,
        private api: HttpService,
        private apiGetComp: ApiGetService,
        private fb: FormBuilder,
        private windowService: NbWindowService,
        private messageService: MessageService,
        private toasterService: NbToastrService,
        private userStore: UserStore,) {
        this.changeCarr();
   }

  ngOnInit(): void {

    this.editMakeForm = this.fb.group({
     
      Value: this.fb.control('', [ Validators.required]),
      
    }); 

    this.editMakeForm.setValue({
      Value: MAKEData ? MAKEData : ''
    });

    // this.editMakeForm.patchValue(MAKEData)

  }

  public fieldsMake: Object = { text: "text", value: "text" };

  editUp(makeup){
    console.log('Edit Make', makeup);

    this.makeUpData = makeup
    MAKEData = makeup
    this.MaData = MAKEData
    win = this.windowService.open(EditDefaulCarruselComponent, {  });

  }

  changeCarr() {
    this.http.get(this.api.apiUrlNode1 + "/api/getmakeupListV2")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.carrData = res;
        // console.log('Carr:', res  );
      });
  }

  handleSuccessResponse() {
    this.toasterService.success("", "¡Se edito con exito!");
    this.closes();
  }

  editData(){
    const currentUserId = this.userStore.getUser().id;
    const currentUser = this.userStore.getUser().email;
    if(this.editMakeForm.valid){
      this.apiGetComp
      .PostJson(this.api.apiUrlNode1 + "/api/updatemakeupdefault", this.editMakeForm.value)
      .subscribe((res: any) => {
        const respons = {
          user: currentUser,
          message: 'actualizó carrusel por defecto',
          users: currentUserId,
        };
        this.apiGetComp
          .PostJson(this.api.apiUrlNode1 + '/postSaveAlarmUser', respons)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
          });
      this.messageService.sendMessage("PackageUpdate");
      this.handleSuccessResponse();
    });
    }
      
  }

  closes() {
    win.close();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
