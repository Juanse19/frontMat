import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-bhs-dashboard',
  templateUrl: './bhs-dashboard.component.html',
  styleUrls: ['./bhs-dashboard.component.scss']
})
export class BhsDashboardComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  navigateSalidas() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }

  navigateLlegadas() {
    this.router.navigate(['/pages/conveyor/info']);
    return false;
  }

}
