import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'; 
import { takeWhile } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
 
interface efficiency {
  DestinationId: number,
  Description: string,
  Reads: number,
  NoReads: number,
  Error: number,
  Eficiencia: number,
  DateAdded: string,
}


@Component({
  selector: 'ngx-readerefficiency',
  templateUrl: './readerefficiency.component.html',
  styleUrls: ['./readerefficiency.component.scss']
})
export class ReaderefficiencyComponent implements OnInit {

  public airForm: FormGroup;
  private alive = true;
  public dataEfficiency: efficiency[];

  public acumulado = 0.0;
  public acumNr = 0.0;
  public acumR = 0.0;

  public acumPLevel1N = 0.0;
  public acumPLevel1R = 0.0;
  public acumPLevel1 = 0.0;

  public acumPLevel2N = 0.0;
  public acumPLevel2R = 0.0;
  public acumPLevel2 = 0.0;

  public acumPackingN = 0.0;
  public acumPackingR = 0.0;
  public acumPacking = 0.0;

  public acumVasN = 0.0;
  public acumVasR = 0.0;
  public acumVas = 0.0;

  public acumShippingR = 0.0;
  public acumShippingN = 0.0;
  public acumShipping = 0.0;

  public today: Date = new Date();

  constructor(
    public apiGetComp: ApiGetService,
    private api: HttpService,
    private fb: FormBuilder,
    private miDatePipe: DatePipe,
    private toastrService: NbToastrService,
    private http: HttpClient,
  ) { 
    
  }

  ngOnInit(): void {
    
    this.initForm();

  }

  initForm() {
    this.airForm = this.fb.group({
      StartTime: ['', Validators.required]
      // EndTime: ['', Validators.required],
    });
  }

  dates(StartTime: Date){

    const fechaFormateada = this.miDatePipe.transform(StartTime, 'yyyy-MM-dd');

    // console.log('fecha: ', fechaFormateada);
    

    // console.log('test: ', StartTime);
 
    if (fechaFormateada == null) {
      this.toastrService.warning('', 'No pusiste la fecha.');
    } else {
      this.http.get(this.api.apiUrlNode1 + '/api/GetEficienctiaBarCodeReaders?dateIni='+ fechaFormateada)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (res.length == 0){
        // console.log("se encuentra vacío el arreglo")
        this.toastrService.danger('', 'No ha data.');
        }else {
        // console.log("no lo esta")
        this.limpar();
      this.dataEfficiency = res;
      console.log('data', this.dataEfficiency);
      
      this.acumR = this.acumR + this.dataEfficiency[0].Reads
      this.acumNr = this.acumNr + this.dataEfficiency[0].NoReads

      if (this.acumR > 0) this.acumulado = (100 - ((this.acumNr / this.acumR) * 100));

      // this.dataEfficiency.forEach(quote => {

      //   // console.log('test',quote.Reads);
      //   this.acumR = this.acumR + quote.Reads
      //   this.acumNr = this.acumNr + quote.NoReads

      // if (this.acumR > 0) this.acumulado = (100 - ((this.acumNr / this.acumR) * 100));
      
      //  });
      
      }
    });
    }

  }

  limpar(): void {
    this.acumR = 0;
    this.acumNr = 0;
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
