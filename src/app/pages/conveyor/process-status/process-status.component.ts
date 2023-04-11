import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-process-status',
  templateUrl: './process-status.component.html',
  styleUrls: ['./process-status.component.scss']
})
export class ProcessStatusComponent {
  @Input() status: any;
  statusText: string;
  statusClass: string;

  constructor() {
  }

  ngOnInit() {

    switch (this.status) {
      case 'Apagado':
        this.statusText = 'Apagado';
        this.statusClass = 'status-Apagado';
        break;
      case 'Activo':
        this.statusText = 'Activo';
        this.statusClass = 'status-Adelante';
        break;
      case 'Encendido Reversa':
        this.statusText = 'Encendido Reversa';
        this.statusClass = 'status-Reversa';
        break;
      case 'Falla':
        this.statusText = 'Falla';
        this.statusClass = 'status-Falla';
        break;
      case'Acumulacion':
        this.statusText = 'Acumulacion';
        this.statusClass = 'status-Acumulacion';
        break;
      case 'Atasque':
        this.statusText = 'Atasque';
        this.statusClass = 'status-Atasque';
        break;
      case 'Ahorro de energia':
        this.statusText = 'Ahorro de energia';
        this.statusClass = 'status-Ahorro';
        break;
      case 'Bloqueado':
        this.statusText = 'Bloqueado';
        this.statusClass = 'status-Bloqueado';
        break;
      case 'Alarma Seccionardor Abierto':
        this.statusText = 'Alarma Seccionardor Abierto';
        this.statusClass = 'status-Alarma';
        break;
      case 'Motor con paro de emergencia activo':
        this.statusText = 'Motor con paro de emergencia activo';
        this.statusClass = 'status-Motor';
        break;
      // case 9:
      //   this.statusText = 'Motor con paro de emergencia activo';
      //   this.statusClass = 'status-Motor';
      //   break;
    }
  }
}