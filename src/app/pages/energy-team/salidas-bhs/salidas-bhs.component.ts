import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-salidas-bhs',
  templateUrl: './salidas-bhs.component.html',
  styleUrls: ['./salidas-bhs.component.scss']
})
export class SalidasBhsComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  bhs1() {
    this.router.navigate(['/pages/conveyor/bhs1']);
   }

   bhs2() {
    this.router.navigate(['/pages/conveyor/bhs2']);
   }

   bhs3() {
    this.router.navigate(['/pages/conveyor/bhs3']);
   }

   bhs4() {
    this.router.navigate(['/pages/zone-teams/teamal']);
   }

   bhs5() {
    this.router.navigate(['/pages/zone-teams/teamsfc']);
   }

   bhs6() {
    this.router.navigate(['/pages/zone-teams/teamcl']);
   }

   bhs7() {
    this.router.navigate(['/pages/zone-teams/teamosr']);
   } 

   bhs8() {
    this.router.navigate(['/pages/conveyor/bhs8']);
   }

   bhs9() {
    this.router.navigate(['/pages/zone-teams/teamss']);
   }

   bhs10() {
    this.router.navigate(['/pages/conveyor/bhs10']);
   }

}
