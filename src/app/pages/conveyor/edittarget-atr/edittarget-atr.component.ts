import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'ngx-edittarget-atr',
  templateUrl: './edittarget-atr.component.html',
  styleUrls: ['./edittarget-atr.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class EdittargetATRComponent implements OnInit {

  editTargetFrom?: FormGroup;
  private alive = true;
  public targetATR: make[]=[];
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

  @ViewChild('formAtr') formAtr: DialogComponent;

  get Value() { return this.editTargetFrom.get('Value'); }

  constructor(
    private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private messageService: MessageService,
    private toasterService: NbToastrService,
    private userStore: UserStore,) {
}

ngOnInit(): void {

  this.editTargetFrom = this.fb.group({
   
    Value: new FormControl(0, Validators.required),
    // Value: this.fb.control('', [Validators.minLength(1), Validators.maxLength(3)]),
    
  }); 

  

  // this.editMakeForm.patchValue(MAKEData)

}

checkGate(): boolean {
    
  const form = this.editTargetFrom;

  return form?.value.Value > 100 && form?.controls.Value.touched

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
  this.formAtr.hide();
  this.alive = false;
}

public dlgButtons: ButtonPropsModel[] = [{
  click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Aceptar', isPrimary: true }
},
{ click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }

];

public isModal: boolean = true;


editUp(makeup){
 
  this.targetATR = makeup
  MAKEData = makeup
  this.MaData = MAKEData

  if (MAKEData) {
    
  }

  this.editTargetFrom.setValue({
    Value: MAKEData ? MAKEData : ''
  });

  this.header = 'Eficiencia para los ATR';
  this.formAtr.show()

}

handleSuccessResponse() {
  this.toasterService.success("", "¡Se edito con exito!");
  this.close();
}

editData(){
  console.log('cumple', this.editTargetFrom.value);
  
  const currentUserId = this.userStore.getUser().id;
  const currentUser = this.userStore.getUser().email;
  if(this.editTargetFrom.valid){
    this.apiGetComp
    .PostJson(this.api.apiUrlNode1 + "/api/updatetargetatr", this.editTargetFrom.value)
    .subscribe((res: any) => {
      const respons = {
        user: currentUser,
        message: 'actualizó targetATR por defecto',
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

disabledFormButton() {
  
  const form = this.editTargetFrom;

  return form?.value.Value > 100 ? true : false

  // return this.editTargetFrom.value.lenght > 100 ? false : true
  // return this.editTargetFrom?.status === "INVALID" ? (true) : (false)
}

close() {
  this.formAtr.hide()
}

ngOnDestroy() {
  this.alive = false;
}

}
