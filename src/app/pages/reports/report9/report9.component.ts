import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-report9',
  templateUrl: './report9.component.html',
  styleUrls: ['./report9.component.scss']
})
export class Report9Component implements OnInit {

  public reportServiceUrl?: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public reportPath?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
