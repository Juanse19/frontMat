import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../../../environments/environment';
import { catchError, tap, switchAll, delayWhen, retryWhen, delay, take, retry } from 'rxjs/operators';
import { EMPTY, Observable, Subject, timer } from 'rxjs';
// const subject = webSocket("ws://localhost:8081");
export const WS_ENDPOINT =  environment.production == true ? environment.urlWebSocket02 : environment.urlWebSocket02;
// export const RECONNECT_INTERVAL = environment.urlWebSocket;
 
@Injectable({
  providedIn: 'root'
})
export class WebSocketV2Service {

  private socket$: WebSocketSubject<any>;

  connect() {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(WS_ENDPOINT);
      
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));

        console.log(messages);
        
    }
  }

  getSocket() {
    return this.socket$.asObservable();
  }

  sendMessage(msg: any) {
     this.socket$.next(msg);
    //  if (this.connect) {
    //   this.socket$.next(msg);
    // } else {
    //   console.error('WebSocket is not connected');
    // }
     
  }

  restoreSocket() {
    const serializedSocket = localStorage.getItem('socket');
    if (!serializedSocket) {
      console.log('resV1');
      
      this.socket$ = JSON.parse(serializedSocket);
    } else {
      console.log('resV2');
      
    }
  }

  saveSocket() {
    const serializedSocket = JSON.stringify(true);
    localStorage.setItem('socket', serializedSocket);
  }

  close() {
    this.socket$.complete(); 
  }

}
