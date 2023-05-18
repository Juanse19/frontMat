import { Component, ElementRef, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { maintenance } from '../interface/maintenance.interface';
import { ButtonPropsModel, DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { MaintenanceService } from '../../../@core/backend/common/services/maintenance.service';
import { SwalCorrect, SwalError } from '../../../@components/swal-simple-message/swalAlerts';
import Swal from 'sweetalert2';
import { MessageService } from '../../dashboard/services/MessageService';

let REFERE: maintenance[]

let ManData: maintenance;

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'ngx-window-maintenance',
  templateUrl: './window-maintenance.component.html',
  styleUrls: ['./window-maintenance.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WindowMaintenanceComponent implements OnInit {

  public alive = true;

  public maintenanceForm: FormGroup;
  public maintencanceData: maintenance[] = [];
  public maintenDa = ManData;
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

  @ViewChild('formMaintenance') formMaintenance: DialogComponent; 

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private maintenanceService: MaintenanceService,) { }

  ngOnInit(): void {
    this.initForm()
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
    this.formMaintenance.hide();
    this.alive = false;
  }

  public dlgButtons: ButtonPropsModel[] = [{
    click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Aceptar', isPrimary: true }
  },
  { click: this.dlgBtnClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }

  ];

  public isModal: boolean = true;

  initForm() {
    this.maintenanceForm = new FormGroup({
      Id: this.fb.control(-1),
      Line: new FormControl(''),
      Device: new FormControl(''),
      Sequence: new FormControl(''),
      RegisterDateInitialOperation: new FormControl(''),
      TimeOperationTotal: new FormControl(''),
      TimeOperationPartial: new FormControl(''),
      TimeNewMaintenance: new FormControl(''),
      TimeResertMaintenance: new FormControl(''),
      TimeIniForPartial: new FormControl(''),
    });
  }
  
  openWindowForm(maintenance: any) {

    console.log('maintenance', maintenance);
    
    ManData = maintenance;
    this.maintenDa = ManData

    if (ManData) {
      this.header = ''
      this.maintenanceForm.setValue({
        Id: ManData.Id,
        Line: ManData.Line,
        Device: ManData.Device,
        Sequence: ManData.Sequence,
        RegisterDateInitialOperation: ManData.RegisterDateInitialOperation,
        TimeOperationTotal: ManData.TimeOperationTotal,
        TimeOperationPartial: ManData.TimeOperationPartial,
        TimeNewMaintenance: ManData.TimeNewMaintenance,
        TimeResertMaintenance: ManData.TimeResertMaintenance,
        TimeIniForPartial: ManData.TimeIniForPartial
      });

      this.formMaintenance.show();
    }
  }

  editData() {

    let formulario = this.maintenanceForm.value

    const newDeviceBody = {
      device: this.maintenanceForm.value.Device,
      newtime: this.maintenanceForm.value.TimeNewMaintenance
    }

    console.log('newDeviceBody', newDeviceBody);
    

    this.maintenanceService.createMaintenance(newDeviceBody).subscribe( (res: any) => {
          Swal.fire({
            title: res.mensaje,
            text:'',
            icon: 'success',
            timer: 2500,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: '¡OK!'
          })
          this.messageService.sendMessage("PackageUpdate");
      // SwalCorrect("creado correctamente")
      this.close()
    }, (err: any) => {
      SwalError("Hubo un error", err.error.Error)
    })

  }

  resetData(device: any) {
    this.maintenanceService.resetMaintenance(device).subscribe( (res: any) => {
      Swal.fire({
        title: res.mensaje,
        text:'',
        icon: 'success',
        timer: 2500,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '¡OK!'
      })
      this.messageService.sendMessage("PackageUpdate");
  // SwalCorrect("creado correctamente")
  this.close()
}, (err: any) => {
  SwalError("Hubo un error", err.error.Error)
})
  }

  close(): void {
    this.formMaintenance.hide();
    // this.dialogRef.close();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
