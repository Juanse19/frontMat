import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import Swal from 'sweetalert2'; 

import { HttpClient } from '@angular/common/http';
import { EditDefaulCarruselComponent } from '../edit-defaul-carrusel/edit-defaul-carrusel.component';
import { MessageService } from '../../dashboard/services/MessageService';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
 
interface make {
  // Id: string;
  // Parameter: string;
  Value?: string;
}

interface carr {
  text: string;
  id: string;
  color: string;
}

let MAKEData: make
{

};

@Component({
  selector: 'ngx-default-carousel',
  templateUrl: './default-carousel.component.html',
  styleUrls: ['./default-carousel.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class DefaultCarouselComponent implements OnInit {

  carruselFrom?: FormGroup;
  private alive = true;
  public makeUpData: make[]=[];
  public carrData: carr[] = [];
  message: string;

  @ViewChild(EditDefaulCarruselComponent) dialogEdit: EditDefaulCarruselComponent;

  get Value() { return this.carruselFrom.get('Value'); }

  subscription: Subscription;
  
  constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private api: HttpService,
        private apiGetComp: ApiGetService,
        private makeupPopup: EditDefaulCarruselComponent,
        private messageService: MessageService,) { 
          this.loadData()
        }

        loadData(){
          this.subscription = this.messageService.onMessage()
          .pipe(takeWhile(() => this.alive))
          .subscribe(message => {
            if (message.text=="PackageUpdate") {
    
              this.loadMakeUp();
              // console.log('Cargo exitosamente..!');
              
            } 
          });
         }

  ngOnInit(): void {
    this.message = 'Salida por la cual se desviará el equipaje que no es leído en los ATR de clasificación, no tiene información de BSM o tienen alguna novedad de AMS.';

    this.carruselFrom = this.fb.group({
     
      Value: this.fb.control('', [ Validators.required]),
      
    }); 

    this.loadMakeUp();
    

  }

  public fields1: Object = { text: "text", value: "text" };

  loadMakeUp(){

    this.apiGetComp.GetJson(this.api.apiUrlNode1 +'/api/makeupdefault').subscribe((res: any) => {

      this.makeUpData = res[0].Value;
     
      this.carruselFrom.setValue({
      Value: this.makeUpData ? this.makeUpData : ''
    });

    });
  }

  editMake() {
    // this.makeupPopup.editUp(this.makeUpData)
    this.dialogEdit.editUp(this.makeUpData);
  }

  

    ngOnDestroy(): void {
      this.alive = false;
    }

}
