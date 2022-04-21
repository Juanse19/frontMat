/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/interfaces/common/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    actions: {
      add: true,
      edit: true,
      delete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false
      },
      firstName: {
        title: 'First Name',
        type: 'string',
        filter: false,
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
        filter: false,
        editable: false,
        addable: false
      },
      login: {
        title: 'Login',
        type: 'string',
        filter: false,
        editable: false,
        addable: false
      },
      email: {
        title: 'E-mail',
        type: 'string',
        filter: false,
        editable: false,
        addable: false
      },
      age: {
        title: 'Age',
        type: 'number',
        filter: false,
        editable: false,
        addable: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    // debugger
    console.log('Create Event In Console');
    console.log('insert', event);
    console.log('id', event.newData.id, '&', 'alias', event.newData.firstName);
    event.confirm.resolve();
  }

  onSaveConfirm(event) {
    // debugger
    console.log('Edit Event In Console');
    console.log('update', event);
    console.log('id', event.newData.id, '&', 'alias', event.newData.firstName);
    event.confirm.resolve();
  }

}
