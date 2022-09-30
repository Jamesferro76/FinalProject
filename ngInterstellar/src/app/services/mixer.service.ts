import { Mixer } from './../models/mixer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MixerService {
  // private baseUrl = 'http://localhost:8090';
  private url = environment.baseUrl+"api/mixers";

  constructor(private http: HttpClient, private auth: AuthService) {}

  show(mixerId: any): Observable<Mixer> {
    return this.http.get<Mixer>(this.url + '/' + mixerId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error('MixerService.show(): error retrieving mixer');
        return throwError(
          () => new Error('MixerService.show(): error retrieving mixer: ' + err)
        );
      })
    );
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

  index() {
    return this.http.get<Mixer[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('MixerService.index(): error retrieving mixers: ' + err)
        );
      })
    );
  }

  create(mixer: Mixer) {
    return this.http.post<Mixer>(this.url, mixer, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('MixerService.create(): error creating mixer: ' + err)
        );
      })
    );
  }
  updateMixer(mixer: Mixer) {
    return this.http
      .put<Mixer>(this.url + '/' + mixer.id, mixer, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('MixerService.update(): error updating mixer: ' + err)
          );
        })
      );
  }
  delete(id: number) {
    return this.http
      .delete<void>(this.url + '/' + id, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('MixerService.delete(): error deleting mixer: ' + err)
          );
        })
      );
  }
}
