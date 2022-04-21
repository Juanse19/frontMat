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
  public dataPackages:PackagesWIP[]=[];
  public numeroAlarmas : {NumeroAlarmas:number} = {NumeroAlarmas:0}
  public dataPackageWip: PackagesWIP[]=this.dataPackages;
  public dataPackageST1: PackagesWIP[]=this.dataPackages;
  public dataPackageST2: PackagesWIP[]=this.dataPackages;
  public dataPackageST3: PackagesWIP[]=this.dataPackages;
  public dataPackageST4: PackagesWIP[]=this.dataPackages;
  public dataPackageST5: PackagesWIP[]=this.dataPackages;
  public dataPackageST6: PackagesWIP[]=this.dataPackages;
  public dataPackageST7: PackagesWIP[]=this.dataPackages;
  public dataPackageST8: PackagesWIP[]=this.dataPackages;
  public dataPackageST9: PackagesWIP[]=this.dataPackages;
  public dataPackageST10: PackagesWIP[]=this.dataPackages;
  public dataPackageST11: PackagesWIP[]=this.dataPackages;
  public dataPackageST12: PackagesWIP[]=this.dataPackages;
  public dataPackageST13: PackagesWIP[]=this.dataPackages;
  public dataPackageST14: PackagesWIP[]=this.dataPackages;
  public dataPackageST15: PackagesWIP[]=this.dataPackages;
  public dataPackageCT_1: PackagesWIP[]=this.dataPackages;
  public dataPackageCT_2: PackagesWIP[]=this.dataPackages;
  public dataPackageCT1: PackagesWIP[]=this.dataPackages;
  public dataPackageCT2: PackagesWIP[]=this.dataPackages;
  public dataPackageTM: PackagesWIP[]=this.dataPackages;
  public dataPackageTF1: PackagesWIP[]=this.dataPackages;
  public dataPackageTF2: PackagesWIP[]=this.dataPackages;
  public dataPackageID12: PackagesWIP[]=this.dataPackages;
  public dataPackageID22: PackagesWIP[]=this.dataPackages;
  public dataPackageIM1: PackagesWIP[]=this.dataPackages;
  public dataPackageIM2: PackagesWIP[]=this.dataPackages;
  public dataPackageIM3: PackagesWIP[]=this.dataPackages;
  public dataPackageIM4: PackagesWIP[]=this.dataPackages;
  public dataPackageIM5: PackagesWIP[]=this.dataPackages;
  public dataPackageIM6: PackagesWIP[]=this.dataPackages;
  public dataPackageIM7: PackagesWIP[]=this.dataPackages;
  
  private intervalSubscriptions:  Subscription;
  private intervalSubscriptionsAlarm:  Subscription;


  public alive=true;
  public aliveAlarm= true;
  
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
    this.packageInit();
  }
  
ngOnInit(){

}

private packageInit(){
let emptyPackage:PackagesWIP={
  cutLength:1,
  description:"",
  id:-1,
  idMaquina:1,
  name:"",
  visible:false,
  order:"",
  valor:"",
  state:0,
  ngStyle:{
    fill:"0",
    width:1,
    fillOpacity:0,
    x:0,
    height:1,
    y:0
  }
};
for(let i=0; i<10;i++){
  this.dataPackages.push(emptyPackage);
}


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
      
}


public GetDataAlarmManual(){
  this.aliveAlarm=true;
  // debugger
  if (this.intervalSubscriptionsAlarm) {
    this.intervalSubscriptionsAlarm.unsubscribe();
  }

  this.intervalSubscriptionsAlarm = interval(5000)
  .pipe(
    takeWhile(() => this.aliveAlarm),
    switchMap(() => this.http.get(this.api.apiUrlNode1 + '/GetNumberAlarm')),
  )
  .subscribe((res: any) => {
    this.numeroAlarmas=res[0];
  });



}


}