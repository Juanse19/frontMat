import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { Sic } from '../../../pages/dashboard/_interfaces/MatBox.model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';



@Component({
  selector: 'ngx-sic',
  templateUrl: './sic.component.html',
  styleUrls: ['./sic.component.scss']
})
export class SicComponent implements OnInit {

  private alive = true;
  
  /** Table de infromación Sic */
  settings5 = {
    actions: {
      add: false,
      edit: false,
    },
    
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number', 
        filter: false,
        hide: true,

      },
      listaCorteSIC: {
        title: 'ListaCorte',
        type: 'string',
        filter: false,
      },
      listaCorrtrim: {
        title: 'ListaTrim',
        type: 'number',
        filter: false,
      },
      orden: {
        title: 'Orden',
        type: 'number',
        filter: false,
      },
      pedido: {
        title: 'Pedido',
        type: 'number',
        filter: false,
      },
      tarjeta: {
        title: 'Tarjeta',
        type: 'string',
        filter: false,
      },
      longitudOrden_Planeado: {
        title: 'LogitudOrden',
        type: 'number',
        filter: false,
      },
      numeroCortes: {
        title: 'NumeroCorte',
        type: 'number',
        filter: false,
      },
      largoLamina_Planeado: {
        title: 'LargoLamina',
        type: 'number',
        filter: false,
      },
      anchoLamina_Planeado: {
        title: 'AnchoLamina',
        type: 'number',
        filter: false,
      },
      espesorLamina_Planeado: {
        title: 'EspesorLamina',
        type: 'number',
        filter: false,
      },
      origen: {
        title: 'Origen',
        type: 'string',
        filter: false,
      },
      destino: {
        title: 'Destino',
        type: 'string',
        filter: false,
      },
      hojasParaHacer_Planeado: {
        title: 'HojasParaHacer',
        type: 'number',
        filter: false,
      },
      estado: {
        title: 'Estado',
        type: 'string',
        filter: false,
      },
    },
  };

  source5: LocalDataSource = new LocalDataSource();
  public ReportSic: Sic[];

  constructor( 
    public apiGetComp: ApiGetService,
    private http: HttpClient,
    private toastrService: NbToastrService,
    private api: HttpService
    
    ) { 
      this.ChargeReportSic();
    }

  ngOnInit(): void {
  } 

  ChargeReportSic() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetOrderSic')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Ocupacion:", res);
      this.ReportSic = res;
      this.source5.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetOrderSic')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.ReportSic = res;
        this.source5.load(res);
      });
    });

  }

  onDelete($event: any) {
  //   Swal.fire({
  //     title: 'Desea eliminar?',
  //     text: `¡Eliminará un campo en Sic!`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: '¡Sí, Eliminar!'
  //   }).then(result => {
  //     if (result.value) {
  //       // this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/DeleteOrderSic', $event.data.id)
  //       // .pipe(takeWhile(() => this.alive))
  //       // .subscribe((res: any) => {
  //       //   console.log('Eliminado: ',res);
  //       //   Swal.fire('¡Se eliminó Exitosamente', 'success');
  //       // });
  //   //   this.http.get(this.api.apiUrlMatbox + "/Orders/SyncOrder")
  //   //   .subscribe((res:any)=>{
  //   //   Swal.fire('¡Se sincronizo Exitosamente', 'success');
  //   // });
  //   // Swal.fire('¡Se sincronizo Exitosamente', 'success');

  // // this.http.delete(this.api.apiUrlMatbox + "/Orders/DeleteOrderSic", $event.data.id+  { observe: 'response' })
  // // .pipe()
  // // .subscribe(resp => {
    
  // // } , err => console.log(err));
  // //Swal.fire('¡Se Eliminó Exitosamente', 'success');
  //     }
  //   });

  //   if (confirm('Are you sure wants to delete item?') && $event.data.id) {
  //     // this.usersService
  //     //   .delete($event.data.id)
  //     //   .pipe(takeWhile(() => this.alive))
  //     //   .subscribe((res) => {
  //     //     // if (res) {
  //     //     //   this.toastrService.success('', 'Item deleted!');
  //     //     //   this.source.refresh(); 
  //     //     // } else {
  //     //     //   this.toastrService.danger('', 'Algo salio mal.');
  //     //     // }
  //     //   });
  //     this.http.delete(this.api.apiUrlMatbox + "/Orders/DeleteOrderSic", $event.data.id+  { observe: 'response' })
  // .pipe()
  // .subscribe(resp => {
    
  // });

  //   }

  
  }

  onDeleteConfirm(event) {

    let sicDate = {id: event.data.id};
    if (confirm('Are you sure wants to delete item?') && event.data.id) {
      this.http.delete(this.api.apiUrlMatbox + "/Orders/DeleteOrderSic?id="+event.data.id)
  // .pipe()
        .pipe(takeWhile(() => this.alive))
        .subscribe((res:any) => {
          if (res) {
            this.toastrService.success('', 'Item deleted!');
            this.source5.refresh(); 
          } else {
            this.toastrService.danger('', 'Algo salio mal.');
          }
        });
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
