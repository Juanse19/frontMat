import { ChangeDetectionStrategy, Component, ElementRef, Inject, Injectable, OnInit, ViewChild, ViewEncapsulation, } from "@angular/core";
import { HttpService } from "../../../../@core/backend/common/api/http.service";
import { ApiGetService } from "../../../../@auth/components/register/apiGet.services";
import { HttpClient } from "@angular/common/http";
import { takeWhile } from "rxjs/operators";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NbDateService, NbToastrService, NbWindowRef, NbWindowService, } from "@nebular/theme";
import { UserStore } from "../../../../@core/stores/user.store";
import { MessageService } from "../../../dashboard/services/MessageService";
import { ButtonPropsModel, DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from "@syncfusion/ej2-base";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface airline {
  Id?: number,
  airline_name?: string,
  iata_designator?: string,
  tree_digit_code?: string,
  icao_designator?: string,
  //country_territory?: string,
  airline_state?: number
}

let AirData: airline;

//  let win: NbWindowRef;

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'ngx-airline-edit',
  templateUrl: './airline-edit.component.html',
  styleUrls: ['./airline-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AirlineEditComponent implements OnInit {

  public airlineForm: FormGroup;
  public airlineData: airline[] = [];
  private alive = true;
  public airlineDa = AirData;
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

  @ViewChild('formAirline') formAirline: DialogComponent; 



  get airline_name() {
    return this.airlineForm.get("airline_name");
  }
  get iata_designator() {
    return this.airlineForm.get("iata_designator");
  }
  get tree_digit_code() {
    return this.airlineForm.get("tree_digit_code");
  }
  get icao_designator() {
    return this.airlineForm.get("icao_designator");
  }
  get airline_state() {
    return this.airlineForm.get("airline_state");
  }

  constructor(private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
    private userStore: UserStore,
    private windowService: NbWindowService,
    private messageService: MessageService,
    // public dialogRef: MatDialogRef<AirlineEditComponent>,
    // @Inject(MAT_DIALOG_DATA) private data: any
  ) {

  }

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
    this.formAirline.hide();
    this.alive = false;
  }

  public dlgButtons: ButtonPropsModel[] = [{
    click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Aceptar', isPrimary: true }
  },
  { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }

  ];

  public isModal: boolean = true;

  loadDataForm() {
    this.airlineForm.setValue({
      Id: AirData.Id,
      airline_name: AirData.airline_name,
      iata_designator: AirData.iata_designator,
      tree_digit_code: AirData.tree_digit_code,
      icao_designator: AirData.icao_designator,
      airline_state: AirData.airline_state
    });


  }

  initForm() {
    this.airlineForm = new FormGroup({
      Id: this.fb.control(-1),
      airline_name: new FormControl(''),
      iata_designator: new FormControl(''),
      tree_digit_code: new FormControl(''),
      icao_designator: new FormControl(''),
      airline_state: new FormControl(''),
    });
  }

  openWindowForm(airlines: airline) {
    AirData = airlines;
    this.airlineDa = AirData

    if (AirData) {
      this.header = ''
      this.airlineForm.setValue({
        Id: AirData.Id,
        airline_name: AirData.airline_name,
        iata_designator: AirData.iata_designator,
        tree_digit_code: AirData.tree_digit_code,
        icao_designator: AirData.icao_designator,
        airline_state: AirData.airline_state
      });
      this.formAirline.show();
    }



    // win = this.windowService.open(AirlineEditComponent, {  });
  }

  handleSuccessResponse() {
    this.toasterService.success("", "¡Se edito con exito!");
    this.close();
  }

  handleWrongResponse() {
    this.toasterService.danger("", "Error almacenando ");
  }

  editData() {

    let formulario = this.airlineForm.value

    if (formulario.airline_name == "" && formulario.iata_designator == "" &&
      formulario.tree_digit_code == "" && formulario.icao_designator == ""
    ) {
      this.toasterService.danger("", "No dejes ningun dato vacio");
    } else if (
      formulario.airline_name == "" ||
      formulario.iata_designator == "" ||
      formulario.tree_digit_code == "" ||
      formulario.icao_designator == "" ||
      formulario.icao_designator == null
    ) {
      this.toasterService.danger("", "Error, No dejes ningun campo vacio.");
    } else if (
      formulario.tree_digit_code >= 999) {
      this.toasterService.danger("", "Error, Debe ingresar solo 3 digitos .");
    } else if (
      formulario.tree_digit_code.length < 1 && formulario.tree_digit_code.length <= 3) {
      this.toasterService.danger("", "Error, Debe ingresar solo tres digitos.", formulario.tree_digit_code.length);
    } else {

      if (formulario) {

        AirData = {
          Id: formulario.Id,
          airline_name: formulario.airline_name,
          iata_designator: formulario.iata_designator,
          tree_digit_code: formulario.tree_digit_code,
          icao_designator: formulario.icao_designator,
          airline_state: formulario.airline_state
        };

        if (AirData == undefined) {
          this.handleWrongResponse();
        } else {
          console.log('Edit Data', this.airlineForm.value);

          this.apiGetComp
            .PostJson(this.api.apiUrlNode1 + "/api/updateAirline", this.airlineForm.value)
            .subscribe((res: any) => {
              this.messageService.sendMessage("PackageUpdate");
              this.handleSuccessResponse();
            });

        }
      }
    }
  }

  close(): void {
    this.formAirline.hide();
    // this.dialogRef.close();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
