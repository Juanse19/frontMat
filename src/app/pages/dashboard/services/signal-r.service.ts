import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {IdWip, MachineColor, PackagesWIP} from '../_interfaces/MatBox.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public dataPackages:PackagesWIP[];
  public dataMachineColor:MachineColor;
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
  
  
  private hubConnectionMachineColor: signalR.HubConnection;
  private hubConnectionPackageWip: signalR.HubConnection;
  
  public startConnectionMachineColor = () => {

    
        let accessToken = "some token";
        var options = {
            transport: signalR.HttpTransportType.ServerSentEvents,
            logging: signalR.LogLevel.Trace,
            accessTokenFactory: () => accessToken
        };

  this.hubConnectionMachineColor = new signalR.HubConnectionBuilder()
  .withUrl(this.api.apiUrlMatSignalR + '/machinecolor',options)
  .build();
  this.hubConnectionMachineColor.serverTimeoutInMilliseconds = 9999999999999;
  
  this.hubConnectionMachineColor.on('transfermachinecolordata', (data)=>{
    this.dataMachineColor=data;
    //console.log(data);
  });

  this.hubConnectionMachineColor
  .start()
  .then(()=>console.log('Connection started GetMachineColor'))
  .catch(err=>console.log('Error while starting connection: ' + err))

}

// public addTransferMachineColorDataListener = () => {
//   this.hubConnectionMachineColor.on('transfermachinecolordata', (data)=>{
//     this.dataMachineColor=data;
//     console.log(data);
    
//   })
// }
////////////////////////////////////////////////////////////


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
this.hubConnectionPackageWip.serverTimeoutInMilliseconds = 9999999999999;

this.hubConnectionPackageWip.on('transfershowpackagedata', (data)=>{
  
  if(data.length>0){

    // console.log(data+id);
    // this.datas[id]=data;
    this.dataPackages=data;
    console.log(this.dataPackages);
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
    }else 
    if (this.dataPackageWip[0].idMaquina==IdWip.ST5)
    {
      this.dataPackageST5=data;
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

  }
});

this.hubConnectionPackageWip
.start()
.then(()=>console.log('Connection started PAckage'))
.catch(err=>console.log('Error while starting PAckage: ' + err))

}

// public addTransferMachineColorDataListener = () => {
// this.hubConnectionMachineColor.on('transfermachinecolordata', (data)=>{
// this.dataMachineColor=data;
// console.log(data);

// })
// }

constructor(private api: HttpService){}





}
