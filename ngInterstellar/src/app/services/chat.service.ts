import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  webSocket!: WebSocket;
  imessages: Message[] = [];

  private bUrl = environment.baseUrl;
  private url = environment.baseUrl + 'api/ichat';

  constructor(private http: HttpClient, private auth: AuthService) { }





  index() {
    return this.http.get<Message[]>(this.url).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'TodoService.create(): error creating Todo: ' + err )
        );
      })
    );
  }



create(imessage: Message):Observable<Message>{
  // this.webSocket.send(JSON.stringify(message));
  console.log(imessage.content);
  console.log(imessage.sender.username);
  return this.http.post<Message>(this.url, imessage).pipe(
    catchError((err: any)  => {
      console.error(err);

      return throwError(
        () => new Error( 'BandService.create(): error creating Artist: ' + err )
        );

    })
  )
}




  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8090/chat');
    this.webSocket.onopen = (event) => {
      console.log('Open: ' + event);
    };
    this.webSocket.onmessage = (event) => {
      const imessage = JSON.parse(event.data);
      this.imessages.push(imessage);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ' + event);
    };
  }



  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }



  public closeWebSocket() {
    this.webSocket.close();
  }
}
