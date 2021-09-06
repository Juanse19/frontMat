import {Component} from '@angular/core';

@Component({
    selector: 'jac-app',
    templateUrl: './jac.component.html',

})

export class JacComponent {
    public nombre = 'Jac el mejor';

    public CambiarNombre() {
        // alert("Di clic");
        this.nombre = 'Julian Arango';

        alert(this.nombre);
    }
}
