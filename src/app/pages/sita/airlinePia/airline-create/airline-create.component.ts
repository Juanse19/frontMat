import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef, Injectable } from "@angular/core";
import { NbWindowRef } from "@nebular/theme";
import { HttpService } from "../..//../../@core/backend/common/api/http.service";
import { ApiGetService } from "../../../../@auth/components/register/apiGet.services";
import { HttpClient } from "@angular/common/http";
import { takeWhile } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDateService, NbToastrService } from "@nebular/theme";
import { UserStore } from "../../../../@core/stores/user.store";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { MessageService } from "../../../dashboard/services/MessageService";
import { DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from "@syncfusion/ej2-base";

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

@Component({
  selector: 'ngx-airline-create',
  templateUrl: './airline-create.component.html',
  styleUrls: ['./airline-create.component.scss']
})
@Injectable({
  providedIn: 'root'
}) 
export class AirlineCreateComponent implements OnInit {

  public airlineForm: FormGroup;
  public airlineData: airline[] = [];
  private alive = true;
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

  @ViewChild('formAirline') formAirline: DialogComponent;

  constructor(
    // public windowRef: NbWindowRef,
    private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private fb: FormBuilder,
    private userStore: UserStore,
    private toasterService: NbToastrService,
    private messageService: MessageService,) {
      
     }

  ngOnInit(): void {
    this.airlineForm = this.fb.group({
      airline_name: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      iata_designator: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      // tree_digit_code: ['', {validators: [Validators.required, Validators.minLength(0), Validators.maxLength(999)]}],
      // tree_digit_code: [0, Validators.max(999)],
      tree_digit_code: [0, Validators.maxLength(3)],
      // tree_digit_code: [0, Validators.compose([Validators.min(100), Validators.max(999)])],
      icao_designator: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      airline_state: ['', {validators: [Validators.required, Validators.minLength(6)]}],
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

    this.formAirline.show();
    
  }

  save(){
    
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
    }
    // else if (
    //    formulario.tree_digit_code >= 1000 ) {
    //   this.toasterService.danger("", "Error, Debe ingresar solo 3 digitos.");
    // }
  //   else if (
  //     formulario.tree_digit_code.length > 0 && formulario.tree_digit_code.length < 3 ) {
  //    this.toasterService.danger("", "Error, Debe ingresar solo tres digitos.");
  //  } 
   else {

    if (formulario) {
      
      AirData = {
        airline_name: formulario.airline_name,
        iata_designator: formulario.iata_designator,
        tree_digit_code: formulario.tree_digit_code,
        icao_designator: formulario.icao_designator,
        airline_state: formulario.airline_state
      };

      if (AirData == undefined) {
        
        this.handleWrongResponse();
      } else {
        console.log('Data Airline', AirData);
        
      this.apiGetComp
      .PostJson(this.api.apiUrlNode1 + "/api/createAirline", AirData)
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
    this.airlineForm.reset();
    this.formAirline.hide();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
