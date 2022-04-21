import { Component, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-reports",
  template: `
    <router-outlet> </router-outlet>
  `,
})

export class ReportsComponent  {
 

  constructor(
  ) {}

  ngOnInit(): void {}

 
}