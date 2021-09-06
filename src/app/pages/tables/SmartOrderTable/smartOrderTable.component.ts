import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import {ApiGetService} from '../OrderTable/apiGet.services'
import { Router } from '@angular/router';
import {HttpService} from '../../../@core/backend/common/api/http.service'


interface Ordenes {
  // id?: number;
  order: string;
  name: string;
  description: string;
  reference: string;
  orderLength: number;
}

let ORDENES: Ordenes[]= [
  

];

@Component({
  selector: 'ngx-smartOrderTable',
  templateUrl: './smartOrderTable.component.html',
  styleUrls: ['./smartOrderTable.component.scss'],
})
export class SmartOrderTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  
    columns: {
      order: {
        title: 'Order',
        type: 'string',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      reference: {
        title: 'Reference',
        type: 'string',
      },
      orderLength: {
        title: 'OrderLength',
        type: 'number',
      },  
    },
  };

 
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,
    public apiGetComp: ApiGetService, private router: Router
    ,private api: HttpService
    ) {
    // const data = this.service.getData();
    this.apiGetComp.GetJson(this.api.apiUrlMatbox +'/Orders/ObtenerOrders').subscribe((res:any)=>{
      // console.log(res)
      ORDENES = res;     
      this.source.load(ORDENES);

      });
    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  createUser() {
    this.router.navigate(['/pages/users/add/']);
    // this.router.navigate(['.../WindowOrderPopup/windowsOrderPopup.component']);

  }

  // onEdit($event: any) {
  //   this.router.navigate([`/pages/users/edit/${$event.data.id}`]);
  // }


  
}
