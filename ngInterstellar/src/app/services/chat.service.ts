import { User } from 'src/app/models/user';
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
  imessage = new Message();

  private bUrl = environment.baseUrl;
  private url = environment.baseUrl + 'api/ichat';

  constructor(private http: HttpClient, private auth: AuthService) { }





  index(user: User) {
    console.log(this.imessages);
    console.log(user.username);

    return this.http.get<Message[]>(this.url + '/history/' + user.username,  this.getHttpOptions() ).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'ChatService.index(): error retrieving chat log: ' + err )
        );
      })
    );
  }


  profile(id: number){
    return this.http.get<User>(this.url + '/profile/' + id,  this.getHttpOptions() ).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'ChatService.index(): error retrieving chat log: ' + err )
        );
      })
    );
  }



create(imessage: Message):Observable<Message>{
  // this.webSocket.send(JSON.stringify(message));
  // console.log(imessage.content);
  // console.log(imessage.sender.username);
  return this.http.post<Message>(this.url + '/' + imessage.recipient.username, imessage,  this.getHttpOptions()).pipe(
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
