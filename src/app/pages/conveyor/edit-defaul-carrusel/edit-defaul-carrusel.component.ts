import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { takeWhile } from 'rxjs/operators';
import { NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { MessageService } from '../../dashboard/services/MessageService';
import { UserStore } from '../../../@core/stores/user.store';
import { ButtonPropsModel, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

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

  public showCloseIcon: Boolean = true;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  public visible: Boolean = true;
  public hidden: Boolean = false;
  public title: string;
  public header: string;

  stateCheck: boolean;

  @ViewChild('formMakeup') formMakeup: DialogComponent;
 
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

    // this.editMakeForm.setValue({
    //   Value: MAKEData ? MAKEData : ''
    // });

    // this.editMakeForm.patchValue(MAKEData)

  }

  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }
  // Hide the Dialog when click the footer button.
  public hideDialog: EmitType<object> = () => {
  }
  // Enables the footer buttons
  public buttons: Object = [

  ];
  public dlgBtnClick = (): void => {
    this.formMakeup.hide();
    this.alive = false;
  }

  public dlgButtons: ButtonPropsModel[] = [{
    click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Aceptar', isPrimary: true }
  },
  { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }

  ];

  public isModal: boolean = true;

  public fieldsMake: Object = { text: "text", value: "text" };

  editUp(makeup){
    console.log('Edit Make', makeup);

    this.makeUpData = makeup
    MAKEData = makeup
    this.MaData = MAKEData

    if (MAKEData) {
      this.editMakeForm.setValue({
        Value: MAKEData ? MAKEData : ''
      });
    }

    this.header = 'Clasificación por defecto'
    this.formMakeup.show()

    // win = this.windowService.open(EditDefaulCarruselComponent, {  });

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
    this.toasterService.success("", "Se guardaron los cambios correctamente");
    this.close();
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

  close() {
    // win.close();
    this.formMakeup.hide();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
