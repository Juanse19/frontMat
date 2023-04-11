/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, Input, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-validation-message',
  styleUrls: ['./validation-message.component.scss'],
  template: `
      <div class="warning">
          <!-- <span class="caption status-danger"
             *ngIf="showMinLength"> Min {{ label }} length is {{ minLength }} symbols </span> -->
             <span class="caption status-danger"
             *ngIf="showMinLength"> La longitud mínima de la {{ label }} es de {{ minLength }} símbolos </span>
          <span class="caption status-danger"
             *ngIf="showMaxLength"> la longitud máxima de {{ label }} es de {{ maxLength }} símbolos </span>
          <span class="caption status-danger" *ngIf="showPattern"> Incorrecta {{ label }} </span>
          <span class="caption status-danger" *ngIf="showRequired"> Se requiere confirmar contraseña</span>
          <span class="caption status-danger" *ngIf="showMin">Valor mínimo de {{ label }} is {{ min }}</span>
          <span class="caption status-danger" *ngIf="showMax">Valor máximo de {{ label }} is {{ max }}</span>
      </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxValidationMessageComponent),
      multi: true,
    },
  ],
})
export class NgxValidationMessageComponent {
  @Input()
  label: string = '';

  @Input()
  showRequired?: boolean;

  @Input()
  min?: number;

  @Input()
  showMin?: boolean;

  @Input()
  max?: number;

  @Input()
  showMax: boolean;

  @Input()
  minLength?: number;

  @Input()
  showMinLength?: boolean;

  @Input()
  maxLength?: number;

  @Input()
  showMaxLength?: boolean;

  @Input()
  showPattern?: boolean;
}
