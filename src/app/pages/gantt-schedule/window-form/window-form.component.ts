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

interface airLine {
  AirlineId: string;
  AirlineCode: string;
  AirlineICAO: string;
  AirlineName: string;
  AirlineColor: string;
}

interface carr {
  text: string;
  id: string;
  color: string;
}

interface makeData {
  // Id: number;
  subject: string;
  startTime: string;
  endTime: string;
  projectId: string;
  AirlinesId: string;
  idUser: number;
}

let AirData: makeData[] = [];

let MAKEData: makeData;
{
}

let win: NbWindowRef;

@Component({
  selector: "ngx-window-form",
  templateUrl: "./window-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./window-form.component.scss"],
})
export class WindowFormComponent implements OnInit {
  airForm: FormGroup;
  selectedAir;
  public airlinesData: airLine[] = [];
  public carrData: carr[] = [];
  listaAir: airLine[] = [];
  private alive = true;
  public date: Object = new Date();
  public format: string = "Mm/dd/yyy HH:mm:ss";

  get Subject() {
    return this.airForm.get("Subject");
  }
  get ProjectId() {
    return this.airForm.get("ProjectId");
  }
  get TaskId() {
    return this.airForm.get("TaskId");
  }
  get StartTime() {
    return this.airForm.get("StartTime");
  }
  get EndTime() {
    return this.airForm.get("EndTime");
  }
  // get idUser() { return this.airForm.get('idUser'); }

  public dateParser(data: string) {
    return new Date(data);
  }

  constructor(
    public windowRef: NbWindowRef,
    private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private fb: FormBuilder,
    private userStore: UserStore,
    private toasterService: NbToastrService,
    private messageService: MessageService,
    private miDatePipe: DatePipe,
    protected dateService: NbDateService<Date>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.ChangeAir();
    this.changeCarr();
  }

  public fields: Object = { text: "text", value: "id" };
  public fields1: Object = { text: "text", value: "text" };

  initForm() {
    this.airForm = this.fb.group({
      Subject: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
      ProjectId: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
      TaskId: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
      StartTime: "",
      EndTime: ["", Validators.required],
      // idUser: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
      // cutLengthForm: this.fb.control(0, [Validators.minLength(3), Validators.maxLength(20)]),
      // cutCountForm: this.fb.control(2, [Validators.minLength(3), Validators.maxLength(20)]),
    });
  }

  ChangeAir() {
    this.http
      .get(this.api.apiUrlNode1 + "/api/getairlinelist")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.airlinesData = res;
        // console.log('Airlines:', res  );
      });
  }

  changeCarr() {
    this.http
      .get(this.api.apiUrlNode1 + "/api/getmakeupList")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.carrData = res;
        // console.log('Carr:', res  );
      });
  }

  handleSuccessResponse() {
    this.toasterService.success("", "¡Guardado con exito!");
    this.close();
  }

  handleWrongResponse() {
    this.toasterService.danger("", "Error almacenando ");
  }

  saveData() {
    const currentUserId = this.userStore.getUser().id;

    let formulario = this.airForm.value;

    // debugger

    if (
      formulario.EndTime == "" &&
      formulario.ProjectId == "" &&
      formulario.StartTime == "" &&
      formulario.Subject == "" &&
      formulario.TaskId == ""
    ) {
      this.toasterService.danger("", "No dejes ningun dato vacio");
    } else if (
      formulario.Subject == "" ||
      formulario.TaskId == ""
    ) {
      this.toasterService.danger("", "Error No dejes ningun campo vacio.");
    } else if (
      formulario.StartTime == "" ||
      formulario.StartTime == null ||
      formulario.StartTime == undefined
    ) {
      this.toasterService.danger("", "Ingresa las fechas ");
    } else if (
      formulario.EndTime == "" ||
      formulario.EndTime == null ||
      formulario.EndTime == undefined
    ) {
      this.toasterService.danger("", "Ingresa las fechas ");
    } else {
      
      if (formulario.ProjectId) {
        const fechaSTD = this.miDatePipe.transform(
          this.airForm.controls.StartTime.value,
          "yyyy-MM-dd HH:mm:ss"
        );
        // "yyyy-MM-dd h:mm:ss a z"
        // "yyyy-MM-dd h:mm:ss a zzzz"
        const fechaETD = this.miDatePipe.transform(
          this.airForm.controls.EndTime.value,
          "yyyy-MM-dd HH:mm:ss"
        );

        MAKEData = {
          // Id: formulario.id,
          idUser: currentUserId,
          AirlinesId: formulario.TaskId,
          projectId: formulario.ProjectId,
          subject: formulario.Subject,
          startTime: fechaSTD,
          endTime: fechaETD,
        };

        console.log("fechas ini", fechaSTD);
        console.log("fechas fin", fechaETD);

        if (fechaSTD[9] == fechaETD[10]) {
          this.toasterService.warning("", "La fecha no puede ser diferente.");
        } 
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
            // console.log(MAKEData);
            
            this.apiGetComp
              .PostJson(this.api.apiUrlNode1 + "/api/createflight", MAKEData)
              .subscribe((res: any) => {
                this.handleSuccessResponse();
                this.messageService.sendMessage("PackageUpdate");
              });
          }
        }
      }
    }
  }

  close() {
    this.windowRef.close();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
