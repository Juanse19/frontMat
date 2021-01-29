/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
// import { Injectable } from '@angular/core';
// import { HttpClient,HttpXhrBackend } from '@angular/common/http';
// import { HttpService } from '../@core/backend/common/api/http.service';

// let guestView:string[];
// let userView:string[];
// let adminView:string[];
// let userEdit:string[];
// let AdminEdit:string[];

// @Injectable({
//   providedIn: 'root'
// })
// export class  AccessGetRole{
//   constructor(private api: HttpService,
//     private http: HttpClient,){
//       this.http.get(this.api.apiUrlMatbox + "/userrole/getaccessroles?role=guest&accessType=view")
//       .subscribe((res: any)=>{
//         console.log(res);
//         guestView=res;
//       });
//   }

//   eView = () => {

//    ['devices', 'current-user']
// }

// // static eView() :string[] {


// //   const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));

//   // httpClient.get('test').subscribe(r => console.log(r));

//   // const httpClient =  InjectorInstance.get<HttpClient>(HttpClient);

//   let api= new HttpService(httpClient);

// httpClient.get(api.apiUrlMatbox + "/userrole/getaccessroles?role=guest&accessType=view")
// .subscribe((res:any)=>{
//   console.log(res);
//   guestView=res;
// });
// httpClient.get(api.apiUrlMatbox + "/userrole/getaccessroles?role=user&accessType=view")
// .subscribe((res:any)=>{
//   console.log(res);
//   userView=res;
// });
// httpClient.get(api.apiUrlMatbox + "/userrole/getaccessroles?role=user&accessType=edit")
// .subscribe((res:any)=>{
//   console.log(res);
//   userEdit=res;
// });
// httpClient.get(api.apiUrlMatbox + "/userrole/getaccessroles?role=admin&accessType=view")
// .subscribe((res:any)=>{
//   console.log(res);
//   adminView=res;
// });
// httpClient.get(api.apiUrlMatbox + "/userrole/getaccessroles?role=admin&accessType=edit")
// .subscribe((res:any)=>{
//   console.log(res);
//   AdminEdit=res;
// });
  
// return guestView;
//   // return ['devices', 'current-user'];
// }

// public static  authSettings = {
//     guest: {
//       view: AccessGetRole.eView()
//     },
//     user: {
//       parent: 'guest',
//         view: userView,
//         edit: userEdit,
//     },
//     admin: {
//       parent: 'user',
//         view: adminView,
//         edit: AdminEdit,
//     },
//   };
  
//   }

export const authSettings = {
  guest: {
    view: ['devices', 'current-user']
  },
  user: {
    parent: 'guest',
      view: ['devices', 'current-user'],
      edit: ['devices', 'current-user'],
  },
  admin: {
    parent: 'user',
      view: ['devices', 'current-user', 'users'],
      edit: ['devices', 'current-user', 'users'],
  },
};
