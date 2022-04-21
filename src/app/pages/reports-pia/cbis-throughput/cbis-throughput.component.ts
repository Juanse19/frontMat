import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { GridComponent, PageSettingsModel, FilterService, FilterType, SortService, FilterSettingsModel, ToolbarItems,
  ExcelExportService, PdfExportService, PageService, EditService, ToolbarService  } from '@syncfusion/ej2-angular-grids';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { DatePipe } from '@angular/common'; 
import { NbToastrService } from '@nebular/theme';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';


export interface cbisHourly {
  CreateDate: string;
  NumberBags: string;
  Alarms: string;
}

@Component({
  selector: 'ngx-cbis-throughput',
  templateUrl: './cbis-throughput.component.html',
  providers: [ToolbarService, PageService, ExcelExportService, PdfExportService],
  styleUrls: ['./cbis-throughput.component.scss']
})
export class CbisThroughputComponent implements OnInit {

  public airForm: FormGroup;

  public dataCbis: cbisHourly []=[];

  private alive = true;

  public filterOptions: FilterSettingsModel;

  public pageSettings: PageSettingsModel;

  public toolbar: ToolbarItems[] | object;

  public editSettings: Object;

  public reportServiceUrl?: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public reportPath?: string;

  @ViewChild('grid')
    public grid: GridComponent;

    

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private miDatePipe: DatePipe,
    private api: HttpService,
    private toastrService: NbToastrService,
    protected dateService: NbDateService<Date>) { }

  ngOnInit(): void {
    this.pageSettings = { pageSize: 10 };
    this.filterOptions = {
      type: 'Menu',
   };
    // this.initForm();
    
    this.dataReport();

    this.toolbar = [
      //  'ExcelExport', 'PdfExport',
     { text: 'Exportar Pdf', tooltipText: 'Click', prefixIcon: 'far fa-file-pdf', id: 'Click' },
     { text: 'Exportar Excel', tooltipText: 'Clicks', prefixIcon: 'far fa-file-excel', id: 'Clicks' }];

  }

  dataReport() {
    // this.reportServiceUrl = 'http://10.100.22.92:51801/reporting/reportservice/api/Viewer';
    // this.reportServerUrl = 'http://10.100.22.92:51801/reporting/api/site/matreport';
    // this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYTIyYzM1MmItOGVkOC00NTlkLWFlZjQtZGZkMmQ3NmViNmQ3IiwiSVAiOiIxMC4xMDAuMjIuOTIiLCJpc3N1ZWRfZGF0ZSI6IjE2NDM3NDkyNTMiLCJuYmYiOjE2NDM3NDkyNTMsImV4cCI6MTY0NDM1NDA1MywiaWF0IjoxNjQzNzQ5MjUzLCJpc3MiOiJodHRwOi8vMTAuMTAwLjIyLjkyOjUxODAxL3JlcG9ydGluZy9zaXRlL21hdHJlcG9ydCIsImF1ZCI6Imh0dHA6Ly8xMC4xMDAuMjIuOTI6NTE4MDEvcmVwb3J0aW5nL3NpdGUvbWF0cmVwb3J0In0.mZ5wg2NpdwXDoRaplL7vDuP-TWbYfC3cc4yaDrKAR70';
    // this.reportPath = '/Sample Reports/Rendimiento por hora CBIS'
  }

  initForm() {
    this.airForm = this.fb.group({
      StartTime: ['', Validators.required]
      // EndTime: ['', Validators.required],
    });
  }

  date(StartTime: string){
    debugger

    const fechaFormateada = this.miDatePipe.transform(StartTime, 'yyyy-MM-dd');

    // console.log('fecha: ', fechaFormateada);
    

    // console.log('test: ', StartTime);

    if (fechaFormateada == null) {
      this.toastrService.warning('', 'No pusiste la fecha.');
    } else {
      this.http.get(this.api.apiUrlNode1 + '/api/GetCbisHourlyThroughputReport?reportdate='+ fechaFormateada)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (res.length == 0){
        // console.log("se encuentra vacío el arreglo")
        this.toastrService.danger('', 'No ha data.');
        }else {
        // console.log("no lo esta")
        }
      this.dataCbis=res;
      // console.log('Da:', res );
      
    });
    }

  }

  clickHandler(args: ClickEventArgs): void {
    debugger 
  
    let formulario = this.airForm.value;
  
  switch (args.item.text) {
  
    case 'Exportar Pdf':
  
  if(formulario.StartTime === ""){
  
    this.toastrService.warning('', 'No se puede exportar, no ha consultado.');
  
  } else if (this.dataCbis.length == 0) {
  
    this.toastrService.danger('', 'No hay data, no se puede exportar..!');
  
  }else {
  
    if (args.item.id === 'Click') {
      // console.log('click: ', args);
      // debugger
      this.grid?.pdfExport(this.getPdfExportProperties());
      // console.log('Abrir pdf');
        // alert('Custom Toolbar Click...');
    }
  
  }
  
  break;
  
  case 'Exportar Excel':
    
  if(formulario.StartTime === ""){
  
    this.toastrService.warning('', 'No se puede exportar, no ha consultado.');
  
  } else if (this.dataCbis.length === 0) {
  
    this.toastrService.danger('', 'No hay data, no se puede exportar..!');
  
  }else {
    
    if (args.item.id === 'Clicks') {
      // console.log('clicks: ', args);
      debugger
      // this.reconocer();
      this.grid?.excelExport(this.getExcelExportProperties());
      // console.log('Descargar pdf');
        // alert('Custom Toolbar Click...');
    }
  
  }
  
  break;
  
  }
  
  }

  private getDate(): string {
    let date: string = '';
    date += ((new Date()).getMonth().toString()) + '/' + ((new Date()).getDate().toString());
    return date += '/' + ((new Date()).getFullYear().toString());
  }
  private getExcelExportProperties(): any {
    return {
        header: {
            headerRows: 7,
            rows: [
                {
                    index: 1,
                    cells: [
                        /* tslint:disable-next-line:max-line-length */
                        { index: 1, colSpan: 5, value: 'MatBag', style: { fontColor: '#71ACD2', fontSize: 25, hAlign: 'Center', bold: true } }
                    ]
                },
                {
                    index: 3,
                    cells: [
                        /* tslint:disable-next-line:max-line-length */
                        { index: 1, colSpan: 2, value: 'Adventure Traders', style: { fontColor: '#C67878', fontSize: 15, bold: true } },
                        { index: 4, value: 'INVOICE NUMBER', style: { fontColor: '#C67878', bold: true } },
                        { index: 5, value: 'DATE', style: { fontColor: '#C67878', bold: true }, width: 150 }
                    ]
                },
                {
                    index: 4,
                    cells: [
                        { index: 1, colSpan: 2, value: '2501 Aerial Center Parkway' },
                        { index: 4, value: 2034 },
                        { index: 5, value: this.getDate(), width: 150 }
                    ]
                },
                {
                    index: 5,
                    cells: [
                        { index: 1, colSpan: 2, value: 'Tel +1 888.936.8638 Fax +1 919.573.0306' },
                        { index: 4, value: 'CUSOTMER ID', style: { fontColor: '#C67878', bold: true } },
                        { index: 5, value: 'TERMS', width: 150, style: { fontColor: '#C67878', bold: true } }
                    ]
                },
                {
                    index: 6,
                    cells: [
                        { index: 4, value: 564 },
                        { index: 5, value: 'Net 30 days', width: 150 }
                    ]
                }
            ]
        },
  
        footer: {
            footerRows: 5,
            rows: [
                /* tslint:disable-next-line:max-line-length */
                { cells: [{ colSpan: 6, value: 'Thank you for your business!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] },
                { cells: [{ colSpan: 6, value: '!Visit Again!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] }
            ]
        },
        
        fileName: "exceldocument.xlsx"
    };
  }
  /* tslint:disable-next-line:no-any */
  private getPdfExportProperties(): any {
    return {
        header: {
            fromTop: 0,
            height: 120,
            contents: [
                {
                    type: 'Text',
                    value: 'MatBag',
                    position: { x: 280, y: 0 },
                    style: { textBrushColor: '#71ACD2', fontSize: 25 },
                },
                {
                    type: 'Text',
                    value: 'INVOICE NUMBER',
                    position: { x: 500, y: 30 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'Date',
                    position: { x: 600, y: 30 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                }, {
                    type: 'Text',
                    value: '223344',
                    position: { x: 500, y: 50 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: this.getDate(),
                    position: { x: 600, y: 50 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'CUSTOMER ID',
                    position: { x: 500, y: 70 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'TERMS',
                    position: { x: 600, y: 70 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                }, {
                    type: 'Text',
                    value: '223',
                    position: { x: 500, y: 90 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'Net 30 days',
                    position: { x: 600, y: 90 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'Adventure Traders',
                    position: { x: 20, y: 30 },
                    style: { textBrushColor: '#C67878', fontSize: 20 }
                },
                {
                    type: 'Text',
                    value: '2501 Aerial Center Parkway',
                    position: { x: 20, y: 65 },
                    style: { textBrushColor: '#000000', fontSize: 11 }
                },
                {
                    type: 'Text',
                    value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
                    position: { x: 20, y: 80 },
                    style: { textBrushColor: '#000000', fontSize: 11 }
                },
            ]
        },
        footer: {
            fromBottom: 160,
            height: 100,
            contents: [
                {
                    type: 'Text',
                    value: 'Thank you for your business !',
                    position: { x: 250, y: 20 },
                    style: { textBrushColor: '#C67878', fontSize: 14 }
                },
                {
                    type: 'Text',
                    value: '! Visit Again !',
                    position: { x: 300, y: 45 },
                    style: { textBrushColor: '#C67878', fontSize: 14 }
                }
            ]
        },
        
        fileName: "pdfdocument.pdf"
    };
  }
  
    ngOnDestroy() {
      this.alive = false;
    }

}
