import { Component, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-sita",
  template: `
    <router-outlet> </router-outlet>
  `,
})

export class SitaComponent  {
 

  constructor(
  ) {}

  ngOnInit(): void {}

 
}