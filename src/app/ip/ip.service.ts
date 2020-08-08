import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../app.settings';
import {Ip} from './ip';
import {Injectable} from '@angular/core';

@Injectable()
export class IpService {

  constructor(private http: HttpClient) {
  }

  getUserIp(): Observable<Ip> {
    return this.http.get<Ip>('https://api.ipify.org/?format=json', AppSettings.HTTP_OPTIONS);
  }
}
