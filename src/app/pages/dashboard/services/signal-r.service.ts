import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {IdMaquinas, IdWip, MachineColor, PackagesWIP} from '../_interfaces/MatBox.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { delay, map, mergeMap, subscribeOn, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { interval, Subscription,from } from 'rxjs';

// const options = {
//   transport: signalR.HttpTransportType.ServerSentEvents,
//   logging: signalR.LogLevel.Trace,
//   accessTokenFactory: () => "Some Token",
// };
@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnInit {
  public dataPackages:PackagesWIP[];
  public numeroAlarmas : {numeroAlarmas:number} = {numeroAlarmas:0}
  public dataPackageWip: PackagesWIP[];
  public dataPackageST1: PackagesWIP[];
  public dataPackageST2: PackagesWIP[];
  public dataPackageST3: PackagesWIP[];
  public dataPackageST4: PackagesWIP[];
  public dataPackageST5: PackagesWIP[];
  public dataPackageST6: PackagesWIP[];
  public dataPackageST7: PackagesWIP[];
  public dataPackageST8: PackagesWIP[];
  public dataPackageST9: PackagesWIP[];
  public dataPackageST10: PackagesWIP[];
  public dataPackageST11: PackagesWIP[];
  public dataPackageST12: PackagesWIP[];
  public dataPackageST13: PackagesWIP[];
  public dataPackageST14: PackagesWIP[];
  public dataPackageST15: PackagesWIP[];
  public dataPackageCT_1: PackagesWIP[];
  public dataPackageCT_2: PackagesWIP[];
  public dataPackageCT1: PackagesWIP[];
  public dataPackageCT2: PackagesWIP[];
  public dataPackageTM: PackagesWIP[];
  public dataPackageTF1: PackagesWIP[];
  public dataPackageTF2: PackagesWIP[];
  public dataPackageID12: PackagesWIP[];
  public dataPackageID22: PackagesWIP[];
  public dataPackageIM1: PackagesWIP[];
  public dataPackageIM2: PackagesWIP[];
  public dataPackageIM3: PackagesWIP[];
  public dataPackageIM4: PackagesWIP[];
  public dataPackageIM5: PackagesWIP[];
  public dataPackageIM6: PackagesWIP[];
  public dataPackageIM7: PackagesWIP[];
  
  private intervalSubscriptions:  Subscription;

  public alive=true;
  
  private hubConnectionAlarmas: signalR.HubConnection;
  private hubConnectionPackageWip: signalR.HubConnection;
    

  public startConnectionAlarmas = () => {
    this.ngOnInit();
    
        let accessToken = "some token";
        var options = {
          transport: signalR.HttpTransportType.ServerSentEvents,
          logging: signalR.LogLevel.Trace,
          accessTokenFactory: () => accessToken
      };

  this.hubConnectionAlarmas = new signalR.HubConnectionBuilder()
  .withUrl(this.api.apiUrlMatSignalR + '/sralarms',options)
  .build();
  this.hubConnectionAlarmas.serverTimeoutInMilliseconds = 4000;
  
  this.hubConnectionAlarmas.on('transferalarmdata', (data)=>{
    this.numeroAlarmas=data;
    // console.log(data);
  });

  this.hubConnectionAlarmas
  .start()
  .then(()=>console.log('Connection started GetMachineColor'))
  .catch(
    err=>console.log('Error while starting connection MachineColor: ' + err,
    this.startConnectionAlarmas()    
    ))

}




public startConnectionPackageWip = (id:number) => {

    
  let accessToken = "some token";
  var options = {
      transport: signalR.HttpTransportType.ServerSentEvents,
      logging: signalR.LogLevel.Trace,
      accessTokenFactory: () => accessToken
  };

this.hubConnectionPackageWip = new signalR.HubConnectionBuilder()
.withUrl(this.api.apiUrlMatSignalR + '/showpackage?idMaquina=' + id ,options)
.build();
this.hubConnectionPackageWip.serverTimeoutInMilliseconds = 4000;

this.hubConnectionPackageWip.on('transfershowpackagedata', (data)=>{
  
  if(data.length>0){
    // this.hubConnectionPackageWip.stop;
    // console.log(data+id);
    // this.datas[id]=data;
    this.dataPackages=data;
    // console.log(this.dataPackages);
    
  this.AsignarDatosWip(data);
  // this.startConnectionPackageWip(id);
//   this.hubConnectionPackageWip
// .start()
// .then(()=>console.log('Connection started PAckage'))
// .catch(err=>console.log('Error while starting PAckage: ' + err
// // this.startConnectionPackageWip(id)
// ));
  }
});

this.hubConnectionPackageWip
.start()
.then(()=>console.log('Connection started PAckage'))
.catch(err=>console.log('Error while starting PAckage: ' + err,
this.startConnectionPackageWip(id)
))

}

// public addTransferMachineColorDataListener = () => {
// this.hubConnectionMachineColor.on('transfermachinecolordata', (data)=>{
// this.dataMachineColor=data;
// console.log(data);

// })
// }

AsignarDatosWip(data:any){
  this.dataPackageWip=data;
  if (this.dataPackageWip[0].idMaquina==IdWip.ST1)
  {
    this.dataPackageST1=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST2)
  {
    this.dataPackageST2=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST3)
  {
    this.dataPackageST3=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST4)
  {
    this.dataPackageST4=data;
    for(let i = 0; i < 8 ; i++){ 
      this.dataPackageST4[i].ngStyle.y= (-106/105)*this.dataPackageST4[i].ngStyle.x+303;//Y=-106/105*X+303
      this.dataPackageST4[i].ngStyle.x=0;
      this.dataPackageST4[i].ngStyle.height=this.dataPackageST4[i].ngStyle.width;
      this.dataPackageST4[i].ngStyle.width=15;
    }
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST5)
  {
    this.dataPackageST5=data;
    for(let i = 0; i < 8 ; i++){ 
      this.dataPackageST5[i].ngStyle.y= (-106/105)*this.dataPackageST5[i].ngStyle.x+303;//Y=-106/105*X+303
      this.dataPackageST5[i].ngStyle.x=0;
      this.dataPackageST5[i].ngStyle.height=this.dataPackageST5[i].ngStyle.width;
      this.dataPackageST5[i].ngStyle.width=17;
    }
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST6)
  {
    this.dataPackageST6=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST7)
  {
    this.dataPackageST7=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST8)
  {
    this.dataPackageST8=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST9)
  {
    this.dataPackageST9=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST10)
  {
    this.dataPackageST10=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST11)
  {
    this.dataPackageST11=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST12)
  {
    this.dataPackageST12=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST13)
  {
    this.dataPackageST13=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST14)
  {
    this.dataPackageST14=data;
  }else 
  if (this.dataPackageWip[0].idMaquina==IdWip.ST15)
  {
    this.dataPackageST15=data;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.CT_1)
  {
    this.dataPackageCT_1=data;
    this.dataPackageCT_1[0].ngStyle.x=10
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.CT_2)
  {
    this.dataPackageCT_2=data;
    this.dataPackageCT_2[0].ngStyle.x=30
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.CT1)
  {
    this.dataPackageCT1=data;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.CT2)
  {
    this.dataPackageCT2=data;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.TM)
  {
    this.dataPackageTM=data;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.TF1)
  {
    this.dataPackageTF1=data;
  }  
  if (this.dataPackageWip[0].idMaquina==IdWip.TF2)
  {
    this.dataPackageTF2=data;
  } 
  if (this.dataPackageWip[0].idMaquina==IdWip.ID12)
  {
    this.dataPackageID12=data;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.ID22)
  {
    this.dataPackageID22=data;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.IM1)
  {
    this.dataPackageIM1=data;
    this.dataPackageIM1[1].ngStyle.x=22;
    this.dataPackageIM1[2].ngStyle.x=43;
    this.dataPackageIM1[3].ngStyle.x=41;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.IM2)
  {
    this.dataPackageIM2=data;
    for(let i = 0; i < 8 ; i++){ 
      this.dataPackageIM2[i].ngStyle.y= (-106/105)*this.dataPackageIM2[i].ngStyle.x+303;//Y=-106/105*X+303
      this.dataPackageIM2[i].ngStyle.x=0;
      this.dataPackageIM2[i].ngStyle.height=this.dataPackageIM2[i].ngStyle.width;
      this.dataPackageIM2[i].ngStyle.width=15;
    }

  }
  if (this.dataPackageWip[0].idMaquina==IdWip.IM3)
  {
    this.dataPackageIM3=data;
     for(let i = 0; i < 8 ; i++){ 
      this.dataPackageIM3[i].ngStyle.y= (-106/105)*this.dataPackageIM3[i].ngStyle.x+303;//Y=-106/105*X+303
      this.dataPackageIM3[i].ngStyle.x=0;
      this.dataPackageIM3[i].ngStyle.height=this.dataPackageIM3[i].ngStyle.width;
      this.dataPackageIM3[i].ngStyle.width=17;
    }
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.IM4)
  {
    this.dataPackageIM4=data;
    for(let i = 0; i < 8 ; i++){ 
      this.dataPackageIM4[i].ngStyle.y= (-106/105)*this.dataPackageIM4[i].ngStyle.x+303;//Y=-106/105*X+303
      this.dataPackageIM4[i].ngStyle.x=0;
      this.dataPackageIM4[i].ngStyle.height=this.dataPackageIM4[i].ngStyle.width;
      this.dataPackageIM4[i].ngStyle.width=15;
    }
    // this.dataPackageIM4[1].ngStyle.y=303;
    // this.dataPackageIM4[1].ngStyle.x=0;
    // this.dataPackageIM4[1].ngStyle.y=288;
    // this.dataPackageIM4[1].ngStyle.x=0;
    // this.dataPackageIM4[2].ngStyle.y=273;
    // this.dataPackageIM4[2].ngStyle.x=0;
    // this.dataPackageIM4[3].ngStyle.y=257;
    // this.dataPackageIM4[3].ngStyle.x=0;
    // this.dataPackageIM4[4].ngStyle.y=242;
    // this.dataPackageIM4[4].ngStyle.x=0;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.IM5)
  {
    this.dataPackageIM5=data;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.IM6)
  {
    this.dataPackageIM6=data;
  }
  if (this.dataPackageWip[0].idMaquina==IdWip.IM7)
  {
    this.dataPackageIM7=data;
  }
}

constructor(private api: HttpService,
  private http: HttpClient,
  ){    

  }
  
ngOnInit(){

}

public GetDataManual(){
  this.alive=true;

  if (this.intervalSubscriptions) {
    this.intervalSubscriptions.unsubscribe();
  }

let i=0;

let deviceArray:string[]=[];
for (var clave in IdWip){

  deviceArray.push(IdWip[clave]);

}


// this.intervalSubscriptions = interval(1000)
from(deviceArray)
.pipe(
  takeWhile(() => this.alive),
mergeMap((idDevice) => interval(1000)
.pipe(
  takeWhile(() => this.alive)
  ,switchMap(() => this.http.get(this.api.apiUrlMatbox + "/Orders/GetPackagesWIP?idDevice="+ idDevice)),
))
)
.subscribe((res: any) => {
          this.AsignarDatosWip(res);
        });
      
  //     var idMachine=IdWip[clave];

  //        let intervalSubscription = new interval(1000)
  //       .pipe(
  //         takeWhile(() => this.alive),
  //         switchMap(() => this.http.get(this.api.apiUrlMatbox + "/Orders/GetPackagesWIP?idDevice="+ idMachine)),
  //       )
  //       .subscribe((res: any) => {
  //         this.AsignarDatosWip(res);
  //       });
  //  this.intervalSubscriptions.push(intervalSubscription);
         
      // var idMachine=IdWip[clave];
      // this.http.get(this.api.apiUrlMatbox + "/Orders/GetPackagesWIP?idDevice="+ idMachine)
      // .subscribe((res: any)=>{
      //   // console.log(res);
      //   this.AsignarDatosWip(res);
      // });




}



}
