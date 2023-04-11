import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injectable,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  ButtonPropsModel,
  DialogComponent,
  ResizeDirections,
} from "@syncfusion/ej2-angular-popups";
import { EmitType } from "@syncfusion/ej2-base";
import { HttpService } from "../../../@core/backend/common/api/http.service";
import { ApiGetService } from "../../../@auth/components/register/apiGet.services";
import { HttpClient } from "@angular/common/http";
import { takeWhile } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NbDateService,
  NbToastrService,
  NbWindowRef,
  NbWindowService,
} from "@nebular/theme";
import { UserStore } from "../../../@core/stores/user.store";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { MessageService } from "../../dashboard/services/MessageService";

interface airLine {
  id?: string;
  AirlineCode?: string;
  AirlineIATA?: string;
  text?: string;
  color?: string;
}

interface carr {
  text?: string;
  id?: string;
  color?: string;
}

interface makeData {
  Id: number;
  subject: string;
  startTime: string;
  endTime: string;
  taskId: string;
  airlinesId: string;
  chuteName: string;
  idUser: number;
}

interface gantt {
  Id?: number;
  taskName?: string;
  Subject?: string;
  IATA?: string;
  startTime?: string;
  endTime?: string;
  ChuteName?: string;
  taskID?: string;
}

let AirData: makeData[] = [];

let GANTTD: gantt;

let AirChange: airLine;
let MakeChange: carr;

let MAKEData: makeData;
{
}

// let win: NbWindowRef;

@Component({
  selector: "ngx-windows-scheduler",
  templateUrl: "./windows-scheduler.component.html",
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./windows-scheduler.component.scss"],
  // encapsulation: ViewEncapsulation.None,
})
@Injectable({
  providedIn: "root",
})
export class WindowsSchedulerComponent implements OnInit {
  private alive = true;

  airForm: FormGroup;
  selectedAir;
  public airlinesData: airLine[] = [];
  public carrData: carr[] = [];
  listaAir: airLine[] = [];
  changeAir = AirChange;
  changeMake = MakeChange;
  public date: Object = new Date();
  public format: string = "Mm/dd/yyy HH:mm:ss";
  // public close = true;
  public taskI: string;

  get Subject() {
    return this.airForm.get("Subject");
  }
  get ChuteName() {
    return this.airForm.get("taskID");
  }
  get taskID() {
    return this.airForm.get("taskID");
  }
  get taskName() {
    return this.airForm.get("taskName");
  }
  get IATA() {
    return this.airForm.get("IATA");
  }
  get StartTime() {
    return this.airForm.get("StartTime");
  }
  get EndTime() {
    return this.airForm.get("EndTime");
  }

  public dateParser(data: string) {
    return new Date(data);
  }

  public showCloseIcon: Boolean = true;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  public visible: Boolean = true;
  public hidden: Boolean = false;
  public title: string;
  public header: string;

  @ViewChild('formAir') formAir: DialogComponent;

  constructor(
    private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
    private userStore: UserStore,
    private windowService: NbWindowService,
    private miDatePipe: DatePipe,
    private messageService: MessageService,
    protected dateService: NbDateService<Date>
  ) {
    this.taskI = "MA";
    this.ChangeAir();
    this.changeCarr();
  }

  public fieldsMake: Object = { text: "text", value: "text" };
  public fieldsAir: Object = { text: "text", value: "text" };

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
    this.formAir.hide();
    this.alive = false;
  }

  public dlgButtons: ButtonPropsModel[] = [{
    click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Aceptar', isPrimary: true }
  },
  { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }

  ];

  public isModal: boolean = true;

  loadDataForm() {
    this.airForm.setValue({
      Id: GANTTD.Id,
      Subject: GANTTD.Subject,
      taskName: GANTTD.taskName,
      taskID: GANTTD.taskID,
      ChuteName: GANTTD.ChuteName,
      StartTime: GANTTD.startTime,
      EndTime: GANTTD.endTime,
    });
  }

  initForm() {
    this.airForm = this.fb.group({
      Id: this.fb.control(-1),
      Subject: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
      ChuteName: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
      taskID: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
      taskName: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
      StartTime: ["", Validators.required],
      EndTime: ["", Validators.required],
    });
  }

  openWindowForm(nombreWindow: string, ganttDATA: gantt) {
    GANTTD = ganttDATA;

    // console.log(GANTTD);
    

    if (GANTTD) {
      this.airForm.setValue({
        Id: GANTTD.Id,
        Subject: GANTTD.Subject,
        taskName: GANTTD.taskName,
        taskID: GANTTD.taskID,
        ChuteName: GANTTD.ChuteName,
        StartTime: GANTTD.startTime,
        EndTime: GANTTD.endTime,
      });
    }

    this.formAir.show();

    // win = this.windowService.open(WindowsSchedulerComponent, {
    //   title: nombreWindow,
    // });
  }

  ChangeAir() {
    this.http
      .get(this.api.apiUrlNode1 + "/api/getairlinelist")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        // this.airlinesData=res;
        AirChange = res;
        this.changeAir = AirChange;
        // console.log('Airlines:', res  );
      });
  }

  changeCarr() {
    this.http
      .get(this.api.apiUrlNode1 + "/api/getmakeupList")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        // this.carrData=res;
        MakeChange = res;
        this.changeMake = MakeChange;
        // console.log('Carr:', res  );
      });
  }

  handleSuccessResponse() {
    this.toasterService.success("", "¡Se edito con exito!");
    this.close();
  }

  handleWrongResponse() {
    this.toasterService.danger("", "Error almacenando ");
  }

  editData() {
    const currentUserId = this.userStore.getUser().id;

    const task = "MA_2";

    let formulario = this.airForm.value;

    // debugger

    // if (
    //   formulario.EndTime == "" &&
    //   formulario.ProjectId == "" &&
    //   formulario.StartTime == "" &&
    //   formulario.Subject == "" &&
    //   formulario.TaskId == ""
    // ) {
    //   this.toasterService.danger("", "No dejes ningun dato vacio");
    // } else if (
    //   formulario.ProjectId == "" ||
    //   formulario.Subject == "" ||
    //   formulario.TaskId == ""
    // ) {
    //   this.toasterService.danger("", "Error No dejes ningun campo vacio.");
    // } else if (
    //   formulario.StartTime == "" ||
    //   formulario.StartTime == null ||
    //   formulario.StartTime == undefined
    // ) {
    //   this.toasterService.danger("", "Ingresa las fechas ");
    // } else if (
    //   formulario.EndTime == "" ||
    //   formulario.EndTime == null ||
    //   formulario.EndTime == undefined
    // ) {
    //   this.toasterService.danger("", "Ingresa las fechas ");
    // } 
   
    

    

      if (formulario.Subject) {

        const fromDateObj = new Date(formulario.StartTime);
        const toDateObj = new Date(formulario.EndTime);

        const fechaSTD = this.miDatePipe.transform(
          this.airForm.controls.StartTime.value,
          "yyyy-MM-dd HH:mm:ss"
        );
        const fechaETD = this.miDatePipe.transform(
          this.airForm.controls.EndTime.value,
          "yyyy-MM-dd HH:mm:ss"
        );

        MAKEData = {
          Id: formulario.Id,
          airlinesId: formulario.taskName,
          subject: formulario.Subject,
          startTime: fechaSTD,
          endTime: fechaETD,
          chuteName: formulario.ChuteName,
          idUser: currentUserId,
          taskId: task,
        };

        // console.log("fechas ini", fechaSTD[1]);
        // console.log("fechas fin", fechaETD[11]);
        if (fromDateObj > toDateObj) {
          // console.log('From date cannot be later than To date');
          this.toasterService.warning("", "La fecha no puede ser diferente.");
          return;
        }

        // if (fechaSTD[9] !== fechaETD[9]) {
        //   this.toasterService.warning("", "La fecha no puede ser diferente.");
        // }
        // else if (fechaETD[11] < fechaSTD[11]) {
        //   this.toasterService.warning("", "la hora no puede ser menor.");
        // } 
        // else if (fechaETD[11] > fechaSTD[11]) {
        //   this.toasterService.warning("", "la hora no puede ser menor.");
        // } 
        else {
          if (MAKEData == undefined) {
            this.handleWrongResponse();
          } else {
            // console.log("MAKEData", MAKEData);
            this.apiGetComp
              .PostJson(this.api.apiUrlNode1 + "/api/updateflight", MAKEData)
              .subscribe((res: any) => {
                this.messageService.sendMessage("PackageUpdate");
                this.handleSuccessResponse();
              });
          }
        }
      }
    
  }

  delete() {

    const currentUserId = this.userStore.getUser().id;



    var respons = {
      Id: GANTTD.Id,
      taskId: this.taskID,
    };

    let formulario = this.airForm.value;

    Swal.fire({
      title: "Desea eliminar vuelo asignado?",
      text: `¡Eliminará un vuelo asignado manual!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, Eliminar!",
      cancelButtonText: "No, Eliminar",
    }).then((result) => {
      // debugger
      if (result.value) {
        this.apiGetComp
          .GetJson(this.api.apiUrlNode1 + "/api/deleteFlight?id=" + GANTTD.Id + "&taskId=" + this.taskI + "&idUser=" + currentUserId + "&subject=" + formulario.Subject)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            // console.log("Se envió", res);
            this.messageService.sendMessage("PackageUpdate");
          });
        // Swal.fire('¡Se Eiliminó Exitosamente', 'success');
        Swal.fire({
          icon: "warning",
          timer: 2000,
          text: "¡Se Eiliminó Exitosamente!",
        });
        this.close();
        this.messageService.sendMessage("PackageUpdate");
        // this.back();
      }
    });
  }


  close() {
    // this.windowRef.close();
    this.resetForm();
    this.formAir.hide();
  }

  resetForm() {
    this.airForm.reset();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
