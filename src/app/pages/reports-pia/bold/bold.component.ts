import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-bold',
  templateUrl: './bold.component.html',
  styleUrls: ['./bold.component.scss']
})
export class BoldComponent implements OnInit {

  title = 'reportdesignerapp';
  public serviceUrl: string;

    constructor() {
        this.serviceUrl = "https://demos.boldreports.com/services/api/ReportingAPI";
    }

  ngOnInit(): void {
  }

}
