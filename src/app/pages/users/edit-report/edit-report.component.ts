import {ChangeDetectionStrategy,Component,ElementRef,Injectable,OnInit,ViewChild, ViewEncapsulation,} from "@angular/core";
import {ButtonPropsModel, DialogComponent, ResizeDirections,} from "@syncfusion/ej2-angular-popups";
import { EmitType } from "@syncfusion/ej2-base";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { ApiGetService } from "../../../@auth/components/register/apiGet.services";
import { HttpClient } from "@angular/common/http";
import { takeWhile } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDateService, NbToastrService,NbWindowRef,NbWindowService,} from "@nebular/theme";
import { UserStore } from "../../../@core/stores/user.store";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { MessageService } from "../../dashboard/services/MessageService";

interface confi {
  Id: number,
  Parameter?: string,
  Value?: string,
  State?: number,
  Category?: string,
  Description?: string,
  // Type: string,
  Value01?: string,
 }

 interface categoryData {
    id: number;
    nombre: string;
    descripcion: string;
  }

 let ReportsData: confi;

 let reportCategory: categoryData;

 let win: NbWindowRef;

 @Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'ngx-edit-report',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-report.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./edit-report.component.scss']
})

export class EditReportComponent implements OnInit {

  public reportsForm: FormGroup;
  public reportData: confi[] = [];
  private alive = true;
  public dataCategory = []
  public cateData: categoryData[]
  public repoDa = ReportsData;
  public CategoryData = reportCategory;

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

  @ViewChild('formReport') formReport: DialogComponent;

  get Parameter() {
    return this.reportsForm.get("Parameter");
  }
  get Value() {
    return this.reportsForm.get("Value");
  }
  get Category() {
    return this.reportsForm.get("Category");
  }
  get Description() {
    return this.reportsForm.get("Description");
  }
  get Type() {
    return this.reportsForm.get("Type");
  }
  

  constructor(private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
    private userStore: UserStore,
    private windowService: NbWindowService,
    private messageService: MessageService,) { 
      this.category();
    }

    public fields: Object = { text: "nombre", value: "nombre" };
    
  ngOnInit(): void {

    this.initForm();
    // this.loadDataForm();
    
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
    this.formReport.hide();
    this.alive = false;
  }

  public dlgButtons: ButtonPropsModel[] = [{
    click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Aceptar', isPrimary: true }
  },
  { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }

  ];

  public isModal: boolean = true;

  category() {
    
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/api/getcategories')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
        reportCategory = res;
        this.CategoryData = reportCategory;
        this.dataCategory = res;
        // console.log('Category', this.CategoryData);
        
    });
  }



  loadDataForm(){
    this.reportsForm.setValue({
      Id: ReportsData.Id,
      Parameter: ReportsData.Parameter,
      Value: ReportsData.Value,
      State: ReportsData.State,
      Category: ReportsData.Category,
      Description: ReportsData.Description,
      Value01: ReportsData.Value01
      // Type: ReportsData.Type,
  });
  }

  initForm() {
    this.reportsForm = this.fb.group({
      Id: this.fb.control(-1),
      Parameter: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
      Value: this.fb.control(1, [Validators.minLength(3), Validators.maxLength(20)]),
      State: this.fb.control(1, [Validators.minLength(3), Validators.maxLength(20)]),
      Category: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      Description: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20)]),
      Value01: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      // Type: this.fb.control(2, [Validators.minLength(3), Validators.maxLength(20)]),
    });
  }

  openWindowForm(reports: confi) { 
    ReportsData = reports;
    this.repoDa = ReportsData

    if (ReportsData) {
      this.reportsForm.setValue({
        Id: ReportsData.Id,
        Parameter: ReportsData.Parameter,
        Value: ReportsData.Value,
        State: ReportsData.State,
        Category: ReportsData.Category,
        Description: ReportsData.Description,
        Value01: ReportsData.Value01
        // Type: ReportsData.Type,
    });
    }

    this.formReport.show();

    // console.log('ReportData', ReportsData);
  }

  handleSuccessResponse() {
    this.toasterService.success("", "¡Se edito con exito!");
    this.close();
  }

  handleWrongResponse() {
    this.toasterService.danger("", "Error almacenando ");
  }

  editData(){
    // console.log('Edit', this.reportsForm.value);
    let formulario = this.reportsForm.value

    if (formulario.Parameter == "" &&
      formulario.Value == "" &&
      formulario.Category == "" &&
      formulario.Description == "" &&
      formulario.Type == "" ||
      formulario.Value01 == ""
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
      
      ReportsData = {
        Id: formulario.Id,
        Parameter: formulario.Parameter,
        Value: formulario.Value,
        Category: formulario.Category,
        State: formulario.State,
        Description: formulario.Description,
        Value01: formulario.Value01
      };

      if (ReportsData == undefined) {
        this.handleWrongResponse();
      } else {

    this.apiGetComp
    .PostJson(this.api.apiUrlNode1 + "/api/updateReport", this.reportsForm.value)
    .subscribe((res: any) => {
      this.messageService.sendMessage("PackageUpdate");
      this.handleSuccessResponse();
    });

  }
} 
}
  }

  close() {
    this.formReport.hide();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
