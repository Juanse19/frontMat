import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import {MachineColor} from '../_interfaces/machine-color.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data:MachineColor;
  
  private hubConnection: signalR.HubConnection;
  
  public startConnection = () => {

    
        let accessToken = "some token";
        var options = {
            transport: signalR.HttpTransportType.ServerSentEvents,
            logging: signalR.LogLevel.Trace,
            accessTokenFactory: () => accessToken
        };

  this.hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(this.api.apiUrlMatSignalR + '/machinecolor',options)
  .build();
  this.hubConnection.serverTimeoutInMilliseconds = 9999999999999;
  
  this.hubConnection.on('transfermachinecolordata', (data)=>{
    this.data=data;
    console.log(data);
    
  });

  this.hubConnection
  .start()
  .then(()=>console.log('Connection started GetMachineColor'))
  .catch(err=>console.log('Error while starting connection: ' + err))
}

public addTransferMachineColorDataListener = () => {
  this.hubConnection.on('transfermachinecolordata', (data)=>{
    this.data=data;
    console.log(data);
    
  })
}
constructor(private api: HttpService){}
}
