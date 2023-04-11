// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'ngx-custom-toast',
//   template: `
//     <div>
//       <h3>test</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Nombre</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr >
//             <td>1</td>
//             <td>sfc</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   `,
// })
// export class CustomToastsComponent implements OnInit {

  
//     constructor() {
//     }

//     ngOnInit(): void {
//     }

// }


import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-custom-toast',
  template: `
    <div class="toast" >
      <div class="toast__header">{{ header }}</div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Consumo (KWH)</th>
            <th>Cantidad Maletas</th>
            <th>TiempoOn</th>
            <th>TiempoOff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ nombre }}</td>
            <td>{{ estado }}</td>
            <td>{{ consumo }}</td>
            <td>{{ cantidadMaletas }}</td>
            <td>{{ tiempoOn }}</td>
            <td>{{ tiempoOff }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
//   styleUrls: ['./toast.component.css']
})
export class CustomToastsComponent {
  @Input() header: string;
  @Input() nombre: string;
  @Input() estado: string;
  @Input() consumo: string;
  @Input() cantidadMaletas: string;
  @Input() tiempoOn: string;
  @Input() tiempoOff: string;
  visible = false;

  show() {
    this.visible = true;
    setTimeout(() => this.hide(), 5000);
  }

  hide() {
    this.visible = false;
  }
}