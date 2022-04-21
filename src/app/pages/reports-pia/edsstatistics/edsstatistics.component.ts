import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { GridComponent, PageSettingsModel, FilterService, FilterType, SortService, FilterSettingsModel, ToolbarItems,
  ExcelExportService, PdfExportService, PageService, EditService, ToolbarService  } from '@syncfusion/ej2-angular-grids';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
// import pdfMake from "pdfmake/build/pdfmake";  
// import pdfFonts from "pdfmake/build/vfs_fonts";
import { DatePipe } from '@angular/common'; 
import { NbToastrService } from '@nebular/theme';
import { ClickEventArgs } from '@syncfusion/ej2-navigations'; 

interface dataDate {
  StartTime: string;
}

interface dateDa {
  ZoneName: string;
  NumberTag: string;
  }

interface EdsSummary {
    Name: string;
    CountStatudBagAlarm: string;
    PercAlarm: string;
    CountStatudBagClear: string;
    PercClear: string;
    Total: string;
}

export interface edsStatistics {
  bagsalarmed: string;
  bagscleared: string;
  Edsfaults: string;
  Failurestartdate: string;
  Failureenddate: string;
}

@Component({
  selector: 'ngx-edsstatistics',
  templateUrl: './edsstatistics.component.html',
  styleUrls: ['./edsstatistics.component.scss'],
  providers: [ToolbarService, PageService, ExcelExportService, PdfExportService],
  encapsulation: ViewEncapsulation.None
})
export class EdsstatisticsComponent implements OnInit {

  public airForm: FormGroup;

  public edsStatisticsData: edsStatistics[];

  private alive = true;

  public daDate: EdsSummary[]=[];

  public filterOptions: FilterSettingsModel;

  public pageSettings: PageSettingsModel;

  public toolbar: ToolbarItems[] | object;

  public editSettings: Object;

  

  public reportServiceUrl3?: string;
  public reportServerUrl3?: string;
  public serviceAuthorizationToken?: string;
  public reportPath3?: string;

  @ViewChild('grid')
    public grid: GridComponent;

  get StartTime() { return this.airForm.get('StartTime'); }

  constructor(
    private fb: FormBuilder,
    private miDatePipe: DatePipe,
    private http: HttpClient,
    private toastrService: NbToastrService,
    private api: HttpService) { }

  ngOnInit(): void {
  //   this.ChargeData();
  //   this.pageSettings = { pageSize: 5 };
  //   this.filterOptions = {
  //     type: 'Menu',
  //  };
  // //  this.initForm();

  // this.dataReports();

  //  this.toolbar = [
  //   //  'ExcelExport', 'PdfExport',
  //  { text: 'Exportar Pdf', tooltipText: 'Click', prefixIcon: 'far fa-file-pdf', id: 'Click' },
  //  { text: 'Exportar Excel', tooltipText: 'Clicks', prefixIcon: 'far fa-file-excel', id: 'Clicks' }];

  } 

  dataReports() {
    
    this.reportServiceUrl3 = 'http://10.100.22.109:64332/reporting/reportservice/api/Viewer';
    this.reportServerUrl3 = 'http://10.100.22.109:64332/reporting/api/site/site1';
    this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiNzMxODczYjUtMDllNy00ODU4LWE0NGMtOWY0NGQ2NzJhMmFkIiwiSVAiOiIxMC4xMjAuMTguOCIsImlzc3VlZF9kYXRlIjoiMTY0NDMzMTQwMCIsIm5iZiI6MTY0NDMzMTQwMCwiZXhwIjoxNjQ0OTM2MjAwLCJpYXQiOjE2NDQzMzE0MDAsImlzcyI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSIsImF1ZCI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.A8PPwUtMfOExPyBcyyMKJkhgfxjL7HzI3VdQqhpV_mI';
    this.reportPath3 = '/Reports Pia/Informe ejecutivo BHS - SSI'
  }

  initForm() {
    this.airForm = this.fb.group({
      StartTime: ['', Validators.required]
      // EndTime: ['', Validators.required],
    });
  }

  date(StartTime: string){ 
    // debugger

    const fechaFormateada = this.miDatePipe.transform(StartTime, 'yyyy-MM-dd');

    console.log('fecha: ', fechaFormateada);
    

    console.log('test: ', StartTime);

    if (fechaFormateada == null) {
      // this.toastrService.info('', 'No pusiste la fecha.');
      this.toastrService.warning('', 'No pusiste la fecha.');
      // this.toastrService.show('', 'No pusiste la fecha.');
      // this.toastrService.primary('', 'No pusiste la fecha.');
      // this.toastrService.default('', 'No pusiste la fecha.');
      // this.toastrService.control('', 'No pusiste la fecha.');
    } else {
      this.http.get(this.api.apiUrlNode1 + '/GetEdsSummary?reportdate='+ fechaFormateada)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (res.length == 0){
        console.log("se encuentra vacío el arreglo")
        this.toastrService.danger('', 'No ha data.');
        }else {
        // console.log("no lo esta")
        
        }
        this.daDate=res;
        console.log('Da:', res );
      
    });
    }

  }

  toolbarClick(args: ClickEventArgs): void {
    switch (args.item.text) {
        /* tslint:disable */
        case 'Excel Export':
            this.grid?.excelExport(this.getExcelExportProperties());
            break;
        /* tslint:enable */
        case 'PDF Export':
            this.grid?.pdfExport(this.getPdfExportProperties());
            break;
    }
}

clickHandler(args: ClickEventArgs): void {
  debugger 

  let formulario = this.airForm.value;

switch (args.item.text) {

  case 'Exportar Pdf':

if(formulario.StartTime === ""){

  this.toastrService.warning('', 'No se puede exportar, no ha consultado.');

} else if (this.daDate.length == 0) {

  this.toastrService.danger('', 'No hay data, no se puede exportar..!');

}else {

  if (args.item.id === 'Click') {
    console.log('click: ', args);
    debugger
    this.grid?.pdfExport(this.getPdfExportProperties());
    console.log('Abrir pdf');
      // alert('Custom Toolbar Click...');
  }

}

break;

case 'Exportar Excel':
  
if(formulario.StartTime === ""){

  this.toastrService.warning('', 'No se puede exportar, no ha consultado.');

} else if (this.daDate.length === 0) {

  this.toastrService.danger('', 'No hay data, no se puede exportar..!');

}else {
  
  if (args.item.id === 'Clicks') {
    console.log('clicks: ', args);
    debugger
    // this.reconocer();
    this.grid?.excelExport(this.getExcelExportProperties());
    console.log('Descargar pdf');
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

  ChargeData() {
    this.http.get(this.api.apiUrlNode1 + '/eds')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      // tslint:disable-next-line: no-console
      console.log('edsStatisticsData: ', res);
      this.edsStatisticsData = res;
    });
    const contador = interval(40000)
    contador.subscribe((n) => {
      this.http.get(this.api.apiUrlNode1 + '/eds')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.edsStatisticsData = res;
      });
    });
  }

  //Funtion for genetate pdf
  generatePDF(action = 'open') {
    debugger
    let docDefinition = {
      content: [
        {
          text: 'Estadísticas de EDS',
          fontSize: 19,
          alignment: 'center',
          color: '#047886'
        },
        // {
        //   text: 'Daily CBIS Bag Volume Report',
        //   fontSize: 18,
        //   bold: true,
        //   alignment: 'center',
        //   decoration: 'underline',
        //   color: 'skyblue'
        // },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: '',
                bold:true
              },
              // {
              //   image: 'data:image/png;base64,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',
              //   width: 150,
              //   height: 70,
              // },
              // { text: 'Honduras' },
              // { text: 'palme@pal.com.co' },
              // { text: 12345678 }
            ],
            [
              {
                style: 'bigger',
                fontSize: 7,
                columns: [
                  'Nombre del sistema de detección:',
                  
                  // {
                  //   fontSize: 20,
                  //   text: 'TSIF CBSS',
                  // },
                  {
                    style: 'header',
                    fontSize: 8,
                    text: 'TSIF CBSS.'
                  }
                ]
              },
              {
                style: 'bigger',
                fontSize: 7,
                columns: [
                  'Aeropuerto:',
                  // {
                  //   fontSize: 20,
                  //   text: 'TSIF CBSS',
                  // },
                  {
                    style: 'header',
                    fontSize: 8,
                    text: 'TSA Systems Integration Facility'
                  }
                ]
              },
              {
                style: 'bigger',
                fontSize: 7,
                columns: [
                  'Terminal:',
                  // {
                  //   fontSize: 20,
                  //   text: 'TSIF CBSS',
                  // },
                  {
                    style: 'header',
                    fontSize: 8,
                    text: 'N/A'
                  }
                ]
              },
              // {
              //   text: `Fecha: ${new Date().toLocaleString()}`,
              //   alignment: 'right'
              // },
              // { 
              //   text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
              //   alignment: 'right'
              // },
              // { 
              //   text: `Nombre del sistema de detección: TSIF CBSS`,
              //   alignment: 'right'
              // },
              // { 
              //   text: `Aeropuerto: TSA Systems Integration Facility`,
              //   style: 'subheader',
              //   alignment: 'right'
              // },
              // { 
              //   text: `Terminal: N/A`,
              //   alignment: 'right'
              // }
            ]
          ]
        },
        {
          text: '',
          style: ''
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*'],
            body: [
              [{text: `Fecha de ejecución del informe: ${new Date().toLocaleString()}`,fontSize: 8,alignment: 'left'} 
              // {text: `Fecha: ${new Date().toLocaleString()}`,fontSize: 8,alignment: 'right'},
              // {text: 'I am auto sized.', noWrap: true},
              // {text: `Fecha: ${new Date().toLocaleString()}`,fontSize: 8,alignment: 'right', noWrap: true}
            ],
            ]
          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          style: 'tableExample',
          table: {
            // headerRows: 1,
            widths: ['*','*','*','*','auto','*'],
            body: [
              ['Nombre', 'Bag','Total', 'Alarm','Clear','Clean'],
              // ...this.daDate.map(p => ([p.Name, p.CountStatudBagAlarm, p.Total,p.PercAlarm,p.CountStatudBagClear,p.PercClear])),
              // [{text: 'Total Amount', colSpan: 3}, {}, {}, this.daDate.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },
        // {
        //   style: 'tableExample',
        //   table: {
        //     body: [
        //       ['Column 1', 'Column 2', 'Column 3'],
        //       ['One value goes here', 'Another one here', 'OK?']
        //     ]
        //   }
        // },
        // {
        //   text: 'Additional Details',
        //   style: 'sectionHeader'
        // },
        // {
        //     text: this.invoice.additionalDetails,
        //     margin: [0, 0 ,0, 15]          
        // },
        // {
        //   columns: [
        //     [{ qr: `${this.invoice.customerName}`, fit: '50' }],
        //     [{ text: 'Signature', alignment: 'right', italics: true}],
        //   ]
        // },
        // {
        //   text: 'Terms and Conditions',
        //   style: 'sectionHeader'
        // },
        // {
        //     ul: [
        //       'Order can be return in max 10 days.',
        //       'Warrenty of the product will be subject to the manufacturer terms and conditions.',
        //       'This is system generated invoice.',
        //     ],
        // }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };

    // if(action==='download'){
    //   pdfMake.createPdf(docDefinition).download();
    // }else if(action === 'print'){
    //   pdfMake.createPdf(docDefinition).print();      
    // }else{
    //   pdfMake.createPdf(docDefinition).open();      
    // }

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
