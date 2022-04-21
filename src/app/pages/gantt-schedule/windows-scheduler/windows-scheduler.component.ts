import { Component, ElementRef, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import {ApiGetService} from '../../../@auth/components/register/apiGet.services';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbToastrService } from '@nebular/theme';

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
  Id: number;
  Subject: string;
  StartTime: string;
  EndTime: string;
  ProjectId: string;
  TaskId: string;
}

let AirData: makeData[]= []; 

let MAKEData: makeData
{

};



@Component({
  selector: 'ngx-windows-scheduler',
  templateUrl: './windows-scheduler.component.html',
  
  styleUrls: ['./windows-scheduler.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@Injectable({
  providedIn: 'root'
})
export class WindowsSchedulerComponent implements OnInit {

  private alive = true;

  airForm: FormGroup;
  selectedAir;
  public airlinesData: airLine [] = [];
  public carrData: carr [] = [];
  listaAir: airLine []=[];
  public date: Object = new Date();
  public format: string = 'Mm/dd/yyy HH:mm:ss';

  get Subject() { return this.airForm.get('Subject'); }
  get ProjectId() { return this.airForm.get('ProjectId'); }
  get TaskId() { return this.airForm.get('TaskId'); }
  get StartTime() { return this.airForm.get('StartTime'); }
  get EndTime() { return this.airForm.get('EndTime'); }

  public dateParser(data: string) {
    return new Date(data);
  }

  public showCloseIcon: Boolean = true;

  @ViewChild('device1') device1: DialogComponent;

  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

  public visible: Boolean = true;
  public hidden: Boolean = false;

 

  constructor(private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
    protected dateService: NbDateService<Date>) { 

    }

    public fields: Object = { text: 'text', value: 'id' };
    public fields1: Object = { text: 'text', value: 'text' };
  
    initForm() {
      this.airForm = this.fb.group({
        Subject: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
        ProjectId: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
        TaskId: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20),Validators.required]),
        StartTime: '',
        EndTime: ['', Validators.required],
        // cutLengthForm: this.fb.control(0, [Validators.minLength(3), Validators.maxLength(20)]),
        // cutCountForm: this.fb.control(2, [Validators.minLength(3), Validators.maxLength(20)]),
      });
    }

    public opendevice1(){
      // debugger
      this.device1.show();
    }

  ngOnInit(): void {
     this.initForm();
    this.ChangeAir();
    this.changeCarr();
  }

   // Initialize the Dialog component's target element.
   public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
      }
      // Hide the Dialog when click the footer button.
      public hideDialog: EmitType<object> = () => {
        
      }
      // Enables the footer buttons
      public buttons: Object = [
      
      ];

     

   

ChangeAir() {
  this.http.get(this.api.apiUrlNode1 + '/GetAirlineList')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.airlinesData=res;
      // console.log('Airlines:', res  );
    });
}

changeCarr() {
  this.http.get(this.api.apiUrlNode1 + '/GetMakeUpListNew')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.carrData=res;
      // console.log('Carr:', res  );
    });
}

handleSuccessResponse() {
  this.toasterService.success('', '¡Guardado con exito!' );
  this.close();
}
 
handleWrongResponse() {
  this.toasterService.danger('', 'Error almacenando ');
}

test(){
  console.log('Prueba');
  this.saveData();
}

save(){
  console.log('Guardo');
  debugger
  let formulario = this.airForm.value;

  if(formulario.ProjectId){
debugger
  MAKEData = {
    Id: formulario.id,
    Subject: formulario.Subject,
    ProjectId: formulario.ProjectId,
    TaskId: formulario.TaskId,
    StartTime: formulario.StartTime,
    EndTime: formulario.EndTime,
  }
  debugger
  console.log(MAKEData);
  
 
//   if (MAKEData == undefined) {
//     // this.handleWrongResponse();
//   }else{
//     debugger
//     this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/PostDataResourceNew', MAKEData).subscribe((res:any)=>{
//     // this.handleSuccessResponse();
//   });
// }
}
}

saveData(){
  
  let formulario = this.airForm.value;

  if(formulario.ProjectId){

  MAKEData = {
    Id: formulario.id,
    Subject: formulario.Subject,
    ProjectId: formulario.ProjectId,
    TaskId: formulario.TaskId,
    StartTime: formulario.StartTime,
    EndTime: formulario.EndTime,
  }
 
  if (MAKEData == undefined) {
    this.handleWrongResponse();
  }else{
    debugger
    this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/PostDataResourceNew', MAKEData).subscribe((res:any)=>{
    this.handleSuccessResponse();
  });
}

  // this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/PostDataResource', MAKEData).subscribe((res:any)=>{
  //   this.handleSuccessResponse();
  // });
  
} 
  
  // console.log('Data: ', MAKEData);

}

  close() {
    // this.windowRef.close();
  }

      ngOnDestroy() {
        this.alive = false;
      }

}
