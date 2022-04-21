import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { HttpService } from '../../../../@core/backend/common/api/http.service';
import {ApiGetService} from '../../../../@auth/components/register/apiGet.services';
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

let win:NbWindowRef;

@Component({
  selector: 'ngx-window-form',
  templateUrl: './window-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./window-form.component.scss']
})
export class WindowFormComponent implements OnInit {

  airForm: FormGroup;
  selectedAir;
  public airlinesData: airLine [] = [];
  public carrData: carr [] = [];
  listaAir: airLine []=[];
  private alive=true;
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

  constructor(public windowRef: NbWindowRef,
    private http: HttpClient,
        private api: HttpService,
        private apiGetComp: ApiGetService,
        private fb: FormBuilder,
        private toasterService: NbToastrService,
        protected dateService: NbDateService<Date>) { 
   
  }

  ngOnInit(): void {
    this.initForm();
    this.ChangeAir();
    this.changeCarr();
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
    this.windowRef.close();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
