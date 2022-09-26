import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  webSocket!: WebSocket;
  chatMessages: Message[] = [];

  private bUrl = environment.baseUrl;
  private url = environment.baseUrl + 'api/chat';

  constructor(private http: HttpClient, private auth: AuthService) {}

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8090/chat');
    this.webSocket.onopen = (event) => {
      console.log('Open: ' + event);
    };
    this.webSocket.onmessage = (event) => {
      const chatMessage = JSON.parse(event.data);
      this.chatMessages.push(chatMessage);
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

  public index() {
    console.log('in Index');

    return this.http.get<Message[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Error getting messages ' + err);
      })
    );
  }

  public create(message: Message) {
    console.log(message.recipient.username);
    this.webSocket.send(JSON.stringify(message));

    return this.http
      .post<Message>(
        this.url + '/' + message.recipient.username,
        message,
        this.getHttpOptions()
      )
      .pipe(
        catchError((err: any) => {
          console.log(message.content);
          console.log(err);

          return throwError(`Error creating message:` + err);
        })
      );
  }

  // public sendMessage(chatMessage: Message){

  //   return this.http.post<Message>(this.url+"/"+ "send" + this.getHttpOptions()).pipe(

  //      catchError((err: any) => {
  //     console.error(err);
  //     return throwError(
  //        () => new Error( 'MessageService.create(): error creating Profile: ' + err )
  //     );
  //   })
  // );

  public sendMessage(chatMessage: Message) {
    this.webSocket.send(JSON.stringify(chatMessage));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
