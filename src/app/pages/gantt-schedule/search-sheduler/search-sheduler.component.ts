import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { NbToastrService } from '@nebular/theme';
import { CommandModel, FilterSettingsModel, GridComponent, PageSettingsModel, RowSelectEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WindowFormComponent } from '../window-form/window-form.component';

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

let GANTTLIST: gantt;

@Component({
  selector: 'ngx-search-sheduler',
  templateUrl: './search-sheduler.component.html',
  styleUrls: ['./search-sheduler.component.scss']
})
export class SearchShedulerComponent implements OnInit {

  public ganttData?: gantt[] = [];
  private alive = true;
  public airForm!: FormGroup;
  fromDate: string;
  toDate: string;
  validationResult: any;

  public StartDates: Date = new Date();
  public EndDate: Date = new Date();

  public pageSettings: PageSettingsModel;
  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
  public editparams: Object;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  public initialSort: Object;

  @ViewChild('grid') 
  public grid: GridComponent;

  @ViewChild(WindowFormComponent) public dialogCreate: WindowFormComponent;

  get Subject() { return this.airForm.get('Subject') }
  get ChuteName() { return this.airForm.get('taskID') }
  get taskID() { return this.airForm.get('taskID') }
  get taskName() { return this.airForm.get('taskName') }
  get IATA() { return this.airForm.get('IATA') }
  get StartTime() { return this.airForm.get('StartTime') }
  get EndTime() { return this.airForm.get('EndTime') }

  constructor(private miDatePipe: DatePipe,
    private http: HttpClient,
    private api: HttpService,
    private toasterService: NbToastrService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.date(this.StartDates, this.EndDate);

    this.initForm(); 

    this.pageSettings = { pageSize: 10 };
    this.filterOptions = {
    type: 'Menu',
 }
  }

  initForm() {
    this.airForm = this.fb.group({
      Subject: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      ProjectId: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      TaskId: this.fb.control('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
      StartDates: ['', Validators.required],
      EndDate: ['', Validators.required],
    });
  }

  openWindowForm() {
    this.dialogCreate.openDialog();
    // this.windowService.open(WindowFormComponent, { title: `` }); 
  }

  rowSelected(args: RowSelectEventArgs) {
    // const rowHeight: number = this.grid.getRows()[this.grid.getSelectedRowIndexes()[0]].scrollHeight;
    // this.grid.getContent().children[0].scrollTop = rowHeight * this.grid.getSelectedRowIndexes()[0];
  }

  public date(StartDates: Date, EndDate: Date) {


    const fechaFormateada = this.miDatePipe.transform(StartDates, 'yyyy-MM-dd');
    const fechaFormateadaeTD = this.miDatePipe.transform(EndDate, 'yyyy-MM-dd');

    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10);
    const fromDateObj = new Date(fechaFormateada);
    const toDateObj = new Date(fechaFormateadaeTD);

    if (fromDateObj < maxDate) {
      // alert('From date must be within the last 10 days');
      this.toasterService.warning("", "La fecha debe estar dentro de los últimos 10 días");
      return;
    }

    if (toDateObj < maxDate) {
      // alert('To date must be within the last 10 days');
      this.toasterService.warning("", "La fecha debe estar dentro de los últimos 10 de consulta");
      return;
    }

    if (toDateObj < fromDateObj) {
      // alert('To date cannot be earlier than From date');
      this.toasterService.warning("", "La fecha no puede ser diferente.");
      return;
    }

    
      this.http.get(this.api.apiUrlNode1 + '/resourceDataGantt?registerDateSTD=' + fechaFormateada + '&registerDateETD=' + fechaFormateadaeTD)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {

          if (res.length == 0) {

            this.toasterService.danger('', 'No ha data.');
            this.ganttData = res.length;
          } else {
            this.ganttData = res;
          }


        });
    

  }

  validateDateRange() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10);
    const fromDateObj = new Date(this.fromDate);
    const toDateObj = new Date(this.toDate);

    if (fromDateObj < maxDate) {
      alert('From date must be within the last 10 days');
      return;
    }

    if (toDateObj < maxDate) {
      alert('To date must be within the last 10 days');
      return;
    }

    if (toDateObj < fromDateObj) {
      alert('To date cannot be earlier than From date');
      return;
    }

      this.http.get(this.api.apiUrlNode1 + '/resourceDataGantt?registerDateSTD=' + this.fromDate + '&registerDateETD=' + this.toDate)
      .pipe(takeWhile(() => this.alive))
      .subscribe(result => {
        this.validationResult = result;
        console.log(this.validationResult);
        
      });

  }

  ngOnDestroy() {
    this.alive = false;
  }


}
