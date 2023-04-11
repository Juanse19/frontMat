import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef, Injectable } from "@angular/core";
import { NbWindowRef } from "@nebular/theme";
import { HttpService } from "../..//../@core/backend/common/api/http.service";
import { ApiGetService } from "../../../@auth/components/register/apiGet.services";
import { HttpClient } from "@angular/common/http";
import { takeWhile } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDateService, NbToastrService } from "@nebular/theme";
import { UserStore } from "../../../@core/stores/user.store";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { MessageService } from "../../dashboard/services/MessageService";
import { EmitType } from "@syncfusion/ej2-base";
import { DialogComponent } from "@syncfusion/ej2-angular-popups";

interface confi {
  Id?: number,
  Parameter?: string,
  Value?: string,
  // CreateDate?: string,
  // UpdateDate?: string,
  State?: number,
  Category: string,
  Description: string,
  Type: string,
  Value01?: string,
 }

 let ReportData: confi;

@Component({
  selector: 'ngx-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class CreateReportComponent implements OnInit {

  public reportForm: FormGroup;
  public reportData: confi[] = [];
  private alive = true;
  public dataCategory = []
  public stateCheck = false;

  public showCloseIcon: Boolean = true;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  public visible: Boolean = true;
  public hidden: Boolean = false;
  public title: string;
  public header: string;

  @ViewChild('formReport') formReport: DialogComponent;

  constructor(
    private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private fb: FormBuilder,
    private userStore: UserStore,
    private toasterService: NbToastrService,
    private messageService: MessageService,) {
      this.category();
     }

  public fields: Object = { text: "nombre", value: "nombre" };

  ngOnInit(): void {

    this.reportForm = this.fb.group({
      Parameter: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      Value: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      State: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      Category: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      Description: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      Type: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      Value01: ['', {validators: [Validators.required, Validators.minLength(3)]}],
    });

  }

  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
      }
      public hideDialog: EmitType<object> = () => {
      }
      public buttons: Object = [

      ];

  openDialog() {
    this.formReport.show();
  }

  category() {
    
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/api/getcategories')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      // console.log(res);
      
        this.dataCategory = res;
    });
  }

  save(){
    
    
    let formulario = this.reportForm.value

    if (formulario.Parameter == "" &&
      formulario.Value == "" &&
      formulario.Category == "" &&
      formulario.Description == "" &&
      formulario.Type == ""
    ) {
      this.toasterService.danger("", "No dejes ningun dato vacio");
    } else if (
      formulario.Parameter == "" ||
      formulario.Value == "" ||
      formulario.Category == "" ||
      formulario.Description == "" ||
      formulario.Value01 == ""
    ) {
      this.toasterService.danger("", "Error, No dejes ningun campo vacio.");
    } else {

    if (formulario) {
      
      ReportData = {
        Parameter: formulario.Parameter,
        Value: formulario.Value,
        Category: formulario.Category,
        Description: formulario.Description,
        State: formulario.State,
        Type: 'Reports',
        Value01: formulario.Value01
      };

      if (ReportData == undefined) {
        
        this.handleWrongResponse();
      } else {

      this.apiGetComp
      .PostJson(this.api.apiUrlNode1 + "/api/createReport", ReportData)
      .subscribe((res: any) => {
        this.handleSuccessResponse();
        this.messageService.sendMessage("PackageUpdate");
      });
    }
    } 
  }
    
  }

  handleSuccessResponse() {
    this.toasterService.success("", "¡Guardado con exito!");
    this.close();
  }

  handleWrongResponse() {
    this.toasterService.danger("", "Error almacenando ");
  }

  close() {
    // this.windowRef.close();
    this.resetForm();
    this.formReport.hide();
  }

  resetForm() {
    this.reportForm.reset();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
