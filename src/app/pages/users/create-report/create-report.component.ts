import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
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

interface confi {
  Id?: number,
  Parameter?: string,
  Value?: string,
  // CreateDate?: string,
  // UpdateDate?: string,
  // State?: number,
  Category: string,
  Description: string,
  Type: string,
 }

 let ReportData: confi;

@Component({
  selector: 'ngx-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {

  public reportForm: FormGroup;
  public reportData: confi[] = [];
  private alive = true;
  public dataCategory = []

  constructor(public windowRef: NbWindowRef,
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
    // this.dataCategory = [
    //   {
    //     id: 1,
    //     nombre: 'Vuelos',
    //     descripcion: 'categoria vuelos'
    //   },
    //   {
    //     id: 2,
    //     nombre: 'Operacion',
    //     descripcion: 'categoria operacion'
    //   },
    //   {
    //     id:3,
    //     nombre: 'Mantenimiento',
    //     descripcion: 'categoria mantenimiento'
    //   }
    // ]

    this.reportForm = this.fb.group({
      Parameter: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      Value: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      State: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      Category: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      Description: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      Type: ['', {validators: [Validators.required, Validators.minLength(3)]}],
    });

  }

  category() {
    
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/api/getcategories')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
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
      formulario.Description == "" 
    ) {
      this.toasterService.danger("", "Error, No dejes ningun campo vacio.");
    } else {

    if (formulario) {
      
      ReportData = {
        Parameter: formulario.Parameter,
        Value: formulario.Value,
        Category: formulario.Category,
        Description: formulario.Description,
        Type: 'Reports',
       
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
    this.windowRef.close();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
