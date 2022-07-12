import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-llegadas-bhs',
  templateUrl: './llegadas-bhs.component.html',
  styleUrls: ['./llegadas-bhs.component.scss']
})
export class LlegadasBhsComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  ib1() {
    this.router.navigate(['/pages/conveyor/ib1'],{skipLocationChange: true});
   }

   ib2() {
    this.router.navigate(['/pages/conveyor/ib2'],{skipLocationChange: true});
   }

   ib3() {
    this.router.navigate(['/pages/conveyor/ib3'],{skipLocationChange: true});
   }

}
